import { Card, CardContent, Typography, Stack, Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function PendingLessons() {

    const [lessons, setLesson] = useState([])

    async function fetchPendingLesson() {
        try {
            const res = await fetch('/api/student/lesson/pending-lesson')
            const data = await res.json()
            setLesson(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPendingLesson()
    }, []);

    return (
        <Card>
            <CardContent
                sx={{
                    height: 540,
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
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Pending Lessons
                </Typography>

                <Stack
                    spacing={2}
                >
                    {lessons.map((lesson: any) => (
                        <Card key={lesson.id} variant="outlined">
                            <CardContent>
                                <Typography fontWeight={600}>
                                    {lesson.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Course: {lesson.course?.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    Classroom: {lesson.classroom?.name}
                                </Typography>

                                <Chip label="Not submitted" color="warning" size="small" sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </CardContent>
        </Card>

    );
}
