import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconBook, IconUsers, IconChecklist, IconSchool } from "@tabler/icons-react";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import { useEffect, useState } from "react";

const TeacherSummary = () => {

    interface SummaryTeacher {
        lessons: number;
        courses: number;
        students: number;
        submissions: number;
    }

    const [summaryTeacher, setSummaryTeacher] = useState<SummaryTeacher | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/teacher/summary");
            const data = await res.json();
            setSummaryTeacher(data);
        } catch (error) {
            console.error("Error fetch summary:", error);
        }
    }

    useEffect(() => {
        fetchSummary();
    }, []);


    const summary = [
        {
            title: "Lessons",
            value: summaryTeacher?.lessons,
            icon: <IconBook size={20} />,
            color: "#E3F2FD",
        },
        {
            title: "Students",
            value: summaryTeacher?.students,
            icon: <IconUsers size={20} />,
            color: "#E8F5E9",
        },
        {
            title: "Submissions",
            value: summaryTeacher?.submissions,
            icon: <IconChecklist size={20} />,
            color: "#FFF3E0",
        },
        {
            title: "Courses",
            value: summaryTeacher?.courses,
            icon: <IconSchool size={20} />,
            color: "#F3E5F5",
        },
    ];

    return (
        <DashboardCard title="Summary">
            <Grid container spacing={10}>
                {summary.map((item, index) => (
                    <Grid key={index} size={{ xs: 6, sm: 3 }}>
                        <Stack spacing={2}>
                            <Avatar sx={{ bgcolor: item.color, width: 40, height: 40 }}>
                                {item.icon}
                            </Avatar>

                            <div>
                                <Typography variant="h4" fontWeight="700">
                                    {item.value}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {item.title}
                                </Typography>
                            </div>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </DashboardCard>
    );
};

export default TeacherSummary;
