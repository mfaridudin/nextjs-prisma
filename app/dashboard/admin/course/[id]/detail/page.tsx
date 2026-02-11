"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Button, Input, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { useOpenModal } from "@/store/useOpenModal";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import AddIcon from "@mui/icons-material/Add";
import { useUserStore } from "@/store/useUserStore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@/app/dashboard/components/ui/modal";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    const { user } = useUserStore()

    const courseId = Number(id)

    const role = user?.role?.name

    const addLesson = role === "Admin"

    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()

    const initialForm = {
        title: "",
        description: "",
    }

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState<any[]>([])
    const [lessons, setLessons] = useState<any[]>([])
    const [teacher, setTeacher] = useState<any[]>([])
    const [validation, setValidation] = useState<any>({});
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(null);
    const [classrooms, setClassrooms] = useState<any[]>([])



    const teacherId = course?.teachers?.[0]?.id

    async function fetchCourse() {
        try {
            const res = await fetch(`/api/course/${courseId}`)
            const data = await res.json()

            // setCourse(Array.isArray(data) ? data : [])
            setCourse(data)

        } catch (err) {
            console.error(err)
            setCourse([])
        }
    }

    async function fetchLesson() {
        try {
            const res = await fetch(`/api/admin/lesson?courseId=${courseId}`)
            const data = await res.json()

            setLessons(Array.isArray(data) ? data : [])

        } catch (err) {
            console.error(err)
            setLessons([])
        }
    }

    async function fetchClassrooms() {
        try {
            const res = await fetch('/api/classroom')
            const data = await res.json()
            setClassrooms(Array.isArray(data) ? data : [])
        } catch {
            setClassrooms([])
        }
    }
    useEffect(() => {
        fetchCourse()
        fetchLesson()
        fetchClassrooms()
    }, []);

    async function handleAddLesson(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        if (!selectedClassroom) {
            alert("Classroom must be selected !");
            return;
        }

        const payload = {
            title: form.title,
            description: form.description,
            courseId: courseId,
            classroomId: selectedClassroom,
            teacherId: teacherId
        };

        if (!teacherId) {
            alert("Teacher not assigned to this course")
            return
        }

        if (!courseId) {
            alert("Invalid course")
            return
        }

        console.log(payload)

        const response = await fetch("/api/teacher/lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            setLoading(false)
            return;
        }

        await fetchLesson()

        setLoading(false)
        setForm(initialForm)
        closeModal()
    }

    async function handleDeleteLesson(id: string | number) {
        const response = await fetch(`/api/teacher/lesson/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });
            return;
        }
        await fetchLesson()
        closeModal()
    }


    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Course Detail
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

            {/* Card */}
            <div className="rounded-2xl mb-8 border border-gray-200 bg-white shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div style={{ backgroundColor: "#5D87FF" }} className="p-6 bg-[#5D87FF]">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {course?.name}
                            </h2>
                            {/* <p className="text-sm text-white/80">@{lessons?.slug}</p> */}
                        </div>
                    </div>
                </div>

                {/* Detail */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Teacher</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {course?.teachers?.[0].fullName}
                            </p>
                        </div>
                        {/* <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Number of Students</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {course?._count?.students || 0}
                            </p>
                        </div> */}
                    </div>


                    <div className="mt-8 flex justify-end">
                        <Button
                            variant="contained"
                            // onClick={onEdit}
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white
                       hover:bg-indigo-700 transition"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            <DashboardCard title="Lesson" action={
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={openAddModal}
                >
                    Add Lesson
                </Button>
            }>
                <Box sx={{ overflow: "auto" }}>
                    <Table sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Title</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Description</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Classroom</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Course</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Create Date</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {lessons?.map((item: any, index: number) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Typography fontWeight={500}>
                                            {index + 1}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            {item.title}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.description}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.classroom.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.course.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                minute: '2-digit',
                                                hour: '2-digit',
                                            })}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Link href={`/tes/admin/lesson/${item.id}/detail`}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => openDeleteModal(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>

            <Modal open={open && mode === "add"}
                onClose={closeModal}
                title="Add Lesson"
                maxWidth="max-w-xl">
                {/* form */}
                <form onSubmit={handleAddLesson} className="p-6 space-y-5">

                    <Input
                        className="w-full"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        type="text"
                        placeholder="Enter Lesson Title"
                    />


                    <Input
                        className="w-full"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        type="text"
                        placeholder="Enter Lesson Description"
                    />

                    <div>
                        <div className="relative">
                            {classrooms.length === 0 && (
                                <option disabled>No classroom available</option>
                            )}

                            {classrooms.length > 0 && (
                                <select
                                    className={`w-full appearance-none focus-none py-3 text-sm ${!form.classroomId ? "text-gray-400" : "text-gray-800"
                                        }`}
                                    name="classroomId"
                                    id="classroomId"
                                    value={selectedClassroom ?? ""}
                                    onChange={(e) => setSelectedClassroom(Number(e.target.value))}
                                >
                                    <option value="">Select Classroom</option>
                                    {classrooms.map((classroom: any) => (
                                        <option key={classroom.id} value={classroom.id}>
                                            {classroom.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <span
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-4 pt-6 border-gray-200">
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
                            color="info"
                            variant="contained"
                            type="submit"
                        >
                            Add Class
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal open={open && mode === "delete"}
                onClose={closeModal}
                title="Delete Data"
                maxWidth="max-w-md">
                <div className="p-6">
                    <p className="mb-6 text-gray-700">Are you sure you want to delete this data?</p>
                    <div className="flex justify-end gap-3">
                        <Button
                            size="small"
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
                            variant="contained"
                            color="error"
                            size="small" onClick={() => selectedId && handleDeleteLesson(selectedId)}>
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
