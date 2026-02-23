"use client"

import PageContainer from '../../components/container/PageContainer'
import { Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogContent, DialogTitle, Grid, IconButton, Input, Paper, Stack, Typography } from '@mui/material'
import { IconArrowLeft } from '@tabler/icons-react'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOpenModal } from '@/store/useOpenModal'
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";

type Student = {
    Role: any;
    id: number;
    fullName: string;
    username: string;
    profile: string;
    email: string;
    address: string | null;
    age: number | null;
    emailVerified: boolean;
    dateOfBirth?: string;
    createdAt: string;
    Classroom: {
        name: string;
    },
    role: {
        name: string;
    };
};

interface recentSubmission {
    id: number;
    lesson: string;
    score: number;
    date: string;
}


export default function Page() {

    const { user } = useUserStore()
    const studentId = user?.id
    const schoolId = user?.schoolId

    const { open, mode, selectedId, openEditModal, closeModal } = useOpenModal()

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [submissions, setSubmissions] = useState<recentSubmission[]>([]);
    const [scores, setScores] = useState<any[]>([]);
    const [student, setStudent] = useState<Student | null>(null);
    const [formEdit, setFormEdit] = useState({
        fullName: "",
        username: "",
        address: "",
        email: "",
        age: "",
        dateOfBirth: "",
    });

    async function fetchScore() {
        try {
            const res = await fetch("/api/student/score");
            const data = await res.json();

            console.log("scores:", data);

            setScores(Array.isArray(data) ? data : []);
        } catch {
            setScores([]);
        }
    }

    async function fetchStudents() {
        try {
            const res = await fetch(`/api/student/${studentId}`);
            const data = await res.json();

            setStudent(data);

            setFormEdit({
                fullName: data.fullName ?? "",
                username: data.username ?? "",
                address: data.address ?? "",
                email: data.email ?? "",
                age: data.age ? String(data.age) : "",
                dateOfBirth: data.dateOfBirth
                    ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                    : "",
            });
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchSubmissions() {
        try {
            const res = await fetch("/api/student/recent-activity");
            const data = await res.json();
            setSubmissions(data);
        } catch (error) {
            console.error("Error fetch sumbission:", error);
        }
    }

    useEffect(() => {
        if (!studentId) return;

        fetchScore()
        fetchStudents()
        fetchSubmissions();
    }, [studentId]);

    console.log(submissions)

    const avg = Math.round(scores.reduce((a, b) => a + b.score, 0) / scores.length || 0)
    const bestScore = Math.max(...scores.map(s => s.score), 0)

    const totalLessons = submissions.length


    // 
    async function uploadProfile(file: File, schoolId: number) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `school-${schoolId}/students/${fileName}`;

        const { data, error } = await supabase.storage
            .from("profile")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) throw error;

        const { data: publicUrl } = supabase.storage
            .from("profile")
            .getPublicUrl(filePath);

        return publicUrl.publicUrl;
    }

    async function handleEditProfil(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        let profileUrl = student?.profile;

        if (selectedFile && schoolId) {
            profileUrl = await uploadProfile(selectedFile, schoolId);
        }

        const payload = {
            ...formEdit,
            profile: profileUrl,
            dateOfBirth: formEdit.dateOfBirth ? new Date(formEdit.dateOfBirth).toISOString() : undefined,
            age: formEdit.age ? Number(formEdit.age) : undefined,
            roleId: 3,
            emailVerified: true,
        };

        const response = await fetch(`/api/student/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.errors || { error: data.error })
            return;
        }
        fetchStudents()
        closeModal()
    }

    return (
        <PageContainer>
            <Box sx={{ p: 3 }}>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Profile
                        </h1>
                        <p className="text-sm text-gray-500">
                            Detail information
                        </p>
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<IconArrowLeft />}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </div>
                <Stack spacing={4}>

                    {/* HERO PROFILE */}
                    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems={{ md: "center" }}
                            spacing={3}
                        >
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                    src={student?.profile ?? "/images/profile/profile-default.png"}
                                    sx={{ width: 96, height: 96 }}
                                />

                                <Box>
                                    <Typography variant="h5" fontWeight={600}>
                                        {student?.fullName ?? "-"}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        @{student?.username ?? "-"}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Chip label="Student" color="primary" size="small" />

                                        <Chip
                                            label={
                                                student?.emailVerified ? "Verified" : "Not Verified"
                                            }
                                            color={student?.emailVerified ? "success" : "error"}
                                            size="small"
                                        />
                                    </Stack>
                                </Box>
                            </Stack>

                            <Button onClick={() => {
                                if (studentId !== undefined) {
                                    openEditModal(studentId)
                                }
                            }} variant="contained">
                                Edit Profile
                            </Button>
                        </Stack>
                    </Paper>

                    {/* STATISTICS */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard title="Total Lessons" value={totalLessons} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard title="Average Score" value={avg} />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                            <StatCard title="Highest Score" value={bestScore} />
                        </Grid>
                    </Grid>

                    {/* INFORMATION + ACTIVITY */}
                    <Grid container spacing={3}>
                        {/* Academic Info */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
                                <Typography variant="h6" fontWeight={600} mb={3}>
                                    Academic Information
                                </Typography>

                                <Stack spacing={3}>
                                    <Info label="School" value={user?.school?.name} />
                                    <Info label="Classroom" value={student?.Classroom?.name} />
                                    <Info
                                        label="Joined"
                                        value={
                                            student?.createdAt
                                                ? new Date(student.createdAt).toLocaleDateString()
                                                : "-"
                                        }
                                    />
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Recent Activity */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{
                                    maxHeight: 270, minHeight: 270, overflowY: "auto", pr: 1,
                                    /* scrollbar styling */
                                    "&::-webkit-scrollbar": {
                                        width: 5,
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        background: "transparent",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#cbd5e1",
                                        borderRadius: 10,
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "#94a3b8",
                                    }
                                }}>
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        Recent Activity
                                    </Typography>

                                    <Stack spacing={2}>
                                        {submissions.slice(0, 5).map((s: any) => (
                                            <Paper
                                                key={s.id}
                                                variant="outlined"
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box>
                                                    <Typography fontWeight={600}>
                                                        {s.lesson?.title ?? "Lesson"}
                                                    </Typography>

                                                    <Typography variant="caption" color="text.secondary">
                                                        {new Date(s.createdAt).toLocaleDateString()}
                                                    </Typography>
                                                </Box>

                                                <Typography fontWeight={700} color="primary">
                                                    {s.score}
                                                </Typography>
                                            </Paper>
                                        ))}

                                        {totalLessons === 0 && (
                                            <Typography color="text.secondary">
                                                No submissions yet.
                                            </Typography>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Stack>
            </Box>
            <Dialog open={open && mode === "edit"} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Edit Profil
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <form onSubmit={handleEditProfil} className="p-6 space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                value={formEdit.fullName}
                                onChange={(e) => setFormEdit({ ...formEdit, fullName: e.target.value, })}
                                // label="Full Name"
                                type="text"
                                placeholder="Enter full name"
                            />
                            <Input
                                value={formEdit.username}
                                onChange={(e) => setFormEdit({ ...formEdit, username: e.target.value, })}
                                // label="Username"
                                type="text"
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                value={formEdit.email}
                                onChange={(e) => setFormEdit({ ...formEdit, email: e.target.value })}
                                // label="Email"
                                type="email"
                                placeholder="Enter email"
                            />

                            <Input
                                value={formEdit.address}
                                onChange={(e) => setFormEdit({ ...formEdit, address: e.target.value })}
                                // label="Address"
                                type="text"
                                placeholder="Enter address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                value={formEdit.dateOfBirth}
                                onChange={(e) => setFormEdit({ ...formEdit, dateOfBirth: e.target.value })}
                                // label="Date of Birth"
                                type="date"
                                placeholder="Enter age"
                            />
                            <Input
                                value={formEdit.age}
                                onChange={(e) => setFormEdit({ ...formEdit, age: e.target.value })}
                                // label="Age"
                                type="number"
                                placeholder="Enter age"
                            />
                        </div>

                        <div>
                            <Input
                                type="file"
                                inputProps={{ accept: "image/*" }}
                                onChange={(e: any) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    if (!file.type.startsWith("image/")) {
                                        alert("file not suportd");
                                        return;
                                    }

                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("Max 2MB");
                                        return;
                                    }

                                    setSelectedFile(file);

                                    const objectUrl = URL.createObjectURL(file);
                                    setPreviewUrl(objectUrl);
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-4  pt-6  border-gray-200">
                            <Button
                                onClick={closeModal}
                                sx={{
                                    backgroundColor: "#F3F4F6",
                                    color: "#374151",
                                    px: 2,
                                    '&:hover': {
                                        backgroundColor: "#E5E7EB",
                                    },
                                }}
                            >
                                Cancelled
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Edit Profil
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </PageContainer>
    )
}


function StatCard({ title, value }: any) {
    return (
        <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>

            <Typography variant="h5" fontWeight={700} mt={1}>
                {value ?? 0}
            </Typography>
        </Paper>
    );
}

function Info({ label, value }: any) {
    return (
        <Box>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
            >
                {label}
            </Typography>

            <Typography fontWeight={600}>
                {value ?? "-"}
            </Typography>
        </Box>
    );
}