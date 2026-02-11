"use client";

import { Grid, Typography, Avatar } from '@mui/material';
import { IconNotebook } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useEffect, useState } from 'react';


const TotalLessonCard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;

    const [totalLesson, setTotalLesson] = useState<number | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/admin/total-lesson");
            const data = await res.json();
            setTotalLesson(data.totalLesson);
        } catch (error) {
            console.error("Error fetch summary:", error);
        }
    }

    useEffect(() => {
        fetchSummary();
    }, []);


    return (
        <DashboardCard>
            <Grid container spacing={2} alignItems="center">
                {/* ICON */}
                <Grid xs={4}>
                    <Avatar
                        sx={{
                            bgcolor: primaryLight,
                            width: 56,
                            height: 56,
                        }}
                    >
                        <IconNotebook size={28} color={primary} />
                    </Avatar>
                </Grid>

                {/* CONTENT */}
                <Grid xs={8}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Total Lesson
                    </Typography>

                    <Typography variant="h3" fontWeight={700}>
                        {totalLesson}
                    </Typography>
                </Grid>
            </Grid>

        </DashboardCard>
    );
};

export default TotalLessonCard;
