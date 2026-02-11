"import"

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Input,
    Stack,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useOpenModal } from "@/store/useOpenModal";
import { useUserStore } from "@/store/useUserStore";
import Modal from "../ui/modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const CourseTable = () => {

    const [name, setName] = useState("")
    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()
    const { user } = useUserStore()
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null)
    const [teachers, setTeachers] = useState<any[]>([])
    const [course, setCourse] = useState<any[]>([])

    const role = user?.role?.name
    const schoolId = user?.schoolId

    // console.log("school Id dari course :", schoolId)

    const buttonDisabled = role !== "Teacher" && role !== "Student"

    async function fetchCourse() {
        try {
            const res = await fetch('/api/course')
            const data = await res.json()
            setCourse(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function fetchTeacher() {
        try {
            const res = await fetch('/api/teacher/available')
            const data = await res.json()
            setTeachers(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTeacher()
        fetchCourse()
    }, [])

    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await fetch('/api/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, teacherId: selectedTeacher, schoolId: schoolId }),
        })

        if (!response.ok) {
            console.error('Failed to add course')
        }
        setName("")
        fetchCourse()
        fetchTeacher()
        closeModal()
    }

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/course/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.errors || { error: data.error });
            return;
        }
        await fetchCourse()
        fetchTeacher()
        closeModal()
    }

    return (
        <DashboardCard title="Students" action={
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={openAddModal}
            >
                Add Course
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
                                <Typography fontWeight={600}>Name</Typography>
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
                        {course.map((item: any, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Typography fontWeight={500}>
                                        {index + 1}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600}>
                                        {item.name}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography fontWeight={600}>
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
                                        <Link href={`/tes/admin/course/${item.id}/detail`}>
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
            <Modal open={open && mode === "add"}
                onClose={closeModal}
                title="Add Student"
                maxWidth="max-w-xl">
                {/* form */}
                <form onSubmit={handleAddCourse} className="p-6 space-y-4">

                    <Input
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter Course Name"
                    />

                    <div>
                        <div className="relative">
                            {teachers.length === 0 && (
                                <option disabled>No teacher available</option>
                            )}
                            {teachers.length > 0 && (
                                <select
                                    className={`w-full appearance-none py-3 text-sm ${!selectedTeacher ? "text-gray-400" : "text-gray-800"
                                        }`}
                                    name="teacherId"
                                    value={selectedTeacher ?? ""}
                                    onChange={(e) => setSelectedTeacher(Number(e.target.value))}
                                >
                                    <option value="">Select Teacher</option>

                                    {teachers.map((teacher: any) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.fullName}
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
                            Add Course
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

export default CourseTable;
