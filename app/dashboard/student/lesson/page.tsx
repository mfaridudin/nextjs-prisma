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
import { useEffect, useState } from "react";
import { useOpenModal } from "@/store/useOpenModal";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";

const LessonTable = () => {
    useOpenModal()

    const { user } = useUserStore()

    console.log("apa", user?.id)

    const teacherId = user?.id
    const role = user?.role?.name

    const initialForm = {
        title: "",
        description: "",
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
            const res = await fetch("/api/student/lesson")
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


    return (
        <DashboardCard title="Lesson">
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
                                <Typography fontWeight={600}>Status</Typography>
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
                                    <Box
                                        sx={{
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            display: "inline-block",
                                            bgcolor:
                                                lesson.submissions?.length > 0
                                                    ? "success.light"
                                                    : "warning.light",
                                            color:
                                                lesson.submissions?.length > 0
                                                    ? "success.main"
                                                    : "warning.main",
                                            fontWeight: 600,
                                            fontSize: 12,
                                        }}
                                    >
                                        {lesson.submissions?.length > 0 ? "Completed" : "Pending"}
                                    </Box>
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
                                    </Stack>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default LessonTable;
