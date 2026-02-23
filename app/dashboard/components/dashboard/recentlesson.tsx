import {
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import Link from "next/link";

const RecentLessons = () => {

    interface recentLesson {
        id: number;
        title: string;
        course: string;
        classroom: string;
        date: string;
    }

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

    return (
        <DashboardCard title="Recent Lessons">
            <Stack spacing={2}
                sx={{
                    height: 335,
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
                {lessons.map((lesson, index) => (
                    <Link href={`teacher/lesson/${lesson.id}/detail`}>
                        <div key={lesson.id}>
                            <Typography fontWeight="600">{lesson.title}</Typography>

                            <Typography variant="body2" color="textSecondary">
                                {lesson.course} • {lesson.classroom}
                            </Typography>

                            <Typography variant="caption" color="textSecondary">
                                {lesson.date}
                            </Typography>

                            {index !== lessons.length - 1 && <Divider sx={{ mt: 2 }} />}
                        </div>
                    </Link>
                ))}

                {lessons.length === 0 && (
                    <Typography color="text.secondary">
                        No lessons yet.
                    </Typography>
                )}
            </Stack>
        </DashboardCard>
    );
};

export default RecentLessons;
