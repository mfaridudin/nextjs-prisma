"use client"

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Input,
    Stack,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useOpenModal } from "@/store/useOpenModal";
import Modal from "../ui/modal";
import { IconEye } from "@tabler/icons-react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

const LessonTable = () => {
    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()

    const { user } = useUserStore()

    const teacherId = user?.id
    const role = user?.role?.name

    const buttonDisabled = role !== "Student"
    const pageTitle = role === "Student" ? "Lesson List" : "Lessons Management";

    const initialForm = {
        title: "",
        description: "",
        courseId: null,
        classroomId: null
    }

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])
    const [validation, setValidation] = useState<any>({});
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [courses, setCourses] = useState<any[]>([])
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(null);
    const [classrooms, setClassrooms] = useState<any[]>([])

    async function fetchLesson() {
        try {
            const res = await fetch("/api/teacher/lesson")
            const data = await res.json()

            setLessons(Array.isArray(data) ? data : [])

        } catch (err) {
            console.error(err)
            setLessons([])
        }
    }

    async function fetchCourse() {
        try {
            const res = await fetch('/api/course')
            const data = await res.json()
            setCourses(Array.isArray(data) ? data : [])
        } catch {
            setCourses([])
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
        fetchLesson()
        fetchClassrooms()
        fetchCourse()
    }, []);

    async function handleAddLesson(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        if (!selectedCourse || !selectedClassroom) {
            alert("Course and Classroom must be selected    !");
            return;
        }

        const payload = {
            title: form.title,
            description: form.description,
            courseId: selectedCourse,
            classroomId: selectedClassroom,
            teacherId: teacherId
        };


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

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/teacher/lesson/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });

            console.log("erooorrrr darii siniii")
            return;
        }
        fetchLesson()
        closeModal()
    }

    return (
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
                        {lessons.map((lesson: any, index: number) => (
                            <TableRow key={lesson.id}>
                                <TableCell>
                                    <Typography fontWeight={500}>
                                        {index + 1}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600}>
                                        {lesson.title}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600} color="textSecondary">
                                        {lesson.description}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600} color="textSecondary">
                                        {lesson.classroom.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} color="textSecondary">
                                        {lesson.course.name}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600} color="textSecondary">
                                        {new Date(lesson.createdAt).toLocaleDateString('en-US', {
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
                                        <Link href={`lesson/${lesson.id}/detail`}>    {/* /tes/admin/students */}
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
                                            onClick={() => openDeleteModal(lesson.id)}
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
                            {courses.length === 0 && (
                                <option disabled>No course available</option>
                            )}

                            {courses.length > 0 && (
                                <select
                                    className={`w-full appearance-none focus-none py-3 text-sm ${!form.courseId ? "text-gray-400" : "text-gray-800"
                                        }`}
                                    name="courseId"
                                    id="courseId"
                                    value={selectedCourse ?? ""}
                                    onChange={(e) => setSelectedCourse(Number(e.target.value))}
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((course: any) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
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
                            size="small" onClick={() => selectedId && handleDelete(selectedId)}>
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardCard>
    );
};

export default LessonTable;
