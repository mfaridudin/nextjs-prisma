"use client";

import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Avatar,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function TeachersList() {
    const [teachers, setTeachers] = useState<any[]>([]);

    async function fetchTeachers() {
        try {
            const res = await fetch("/api/teacher");
            const data = await res.json();

            console.log("TEACHERS:", data);

            setTeachers(Array.isArray(data.teachers) ? data.teachers : []);
        } catch {
            setTeachers([]);
        }
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <Card>
            <CardContent
                sx={{
                    height: 350,
                    overflowY: "auto",
                    // maxHeight: 320,
                    pr: 1,
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
                    Teachers
                </Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Course</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar>
                                            {teacher.fullName?.charAt(0)}
                                        </Avatar>
                                        <Typography fontWeight={600}>
                                            {teacher.fullName}
                                        </Typography>
                                    </Stack>
                                </TableCell>

                                <TableCell>{teacher.username}</TableCell>
                                <TableCell>{teacher.Course?.name ?? "- No Course -"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
