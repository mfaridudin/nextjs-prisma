"use client"

import PageContainer from "../../components/container/PageContainer"
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import { useUserStore } from "@/store/useUserStore"
import { useEffect, useState } from "react"
import { IconArrowLeft } from "@tabler/icons-react"

type Teacher = {
    id: number
    fullName: string
    username: string
    profile: string
    emailVerified: boolean
    createdAt: string
    School?: { name: string }
    Course?: { name: string }
}

interface recentLesson {
    id: number;
    title: string;
    course: string;
    classroom: string;
    date: string;
}

export default function Page() {
    const { user } = useUserStore()
    const teacherId = user?.id

    console.log(teacherId)

    const [teacher, setTeacher] = useState<Teacher | null>(null)
    const [lessons, setLesson] = useState<recentLesson[]>([]);


    async function fetchLesson() {
        try {
            const res = await fetch("/api/teacher/recent-lesson");
            const data = await res.json();
            setLesson(data);
        } catch (error) {
            console.error("Error fetch lesson:", error);
        }
    }

    useEffect(() => {
        fetchLesson();
    }, []);


    useEffect(() => {
        if (!teacherId) return

        fetch(`/api/teacher/${teacherId}`)
            .then(res => res.json())
            .then(setTeacher)
    }, [teacherId])

    console.log(lessons)

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

                    {/* HERO */}
                    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems={{ md: "center" }}
                            spacing={3}
                        >
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                    src={teacher?.profile ?? "/images/profile/profile-default.png"}
                                    sx={{ width: 96, height: 96 }}
                                />

                                <Box>
                                    <Typography variant="h5" fontWeight={600}>
                                        {teacher?.fullName ?? "-"}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        @{teacher?.username ?? "-"}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Chip label="Teacher" color="secondary" size="small" />

                                        <Chip
                                            label={
                                                teacher?.emailVerified ? "Verified" : "Not Verified"
                                            }
                                            color={teacher?.emailVerified ? "success" : "error"}
                                            size="small"
                                        />
                                    </Stack>
                                </Box>
                            </Stack>

                            <Button variant="contained">
                                Edit Profile
                            </Button>
                        </Stack>
                    </Paper>

                    {/* INFO + LESSONS */}
                    <Grid container spacing={3}>

                        {/* Academic Info */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
                                <Typography variant="h6" fontWeight={600} mb={3}>
                                    Academic Information
                                </Typography>

                                <Stack spacing={3}>
                                    <Info label="School" value={user?.school?.name} />
                                    <Info label="Course" value={teacher?.Course?.name} />
                                    <Info
                                        label="Joined"
                                        value={
                                            teacher?.createdAt
                                                ? new Date(teacher.createdAt).toLocaleDateString()
                                                : "-"
                                        }
                                    />
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* Recent Lessons */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent sx={{
                                    maxHeight: 300, minHeight: 270, overflowY: "auto", pr: 1,
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
                                        Recent Lessons
                                    </Typography>

                                    <Stack spacing={2}>
                                        {lessons.map((lesson: any) => (
                                            <Paper
                                                key={lesson.id}
                                                variant="outlined"
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Box>
                                                    <Typography fontWeight={600}>
                                                        {lesson.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {new Date(
                                                            lesson.createdAt
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        ))}

                                        {lessons.length === 0 && (
                                            <Typography color="text.secondary">
                                                No lessons yet.
                                            </Typography>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                </Stack>
            </Box>
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
    )
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
    )
}