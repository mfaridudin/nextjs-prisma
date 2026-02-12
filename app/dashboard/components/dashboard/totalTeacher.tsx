"use client";

import { Grid, Typography, Avatar } from '@mui/material';
import { IconSchool } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useEffect, useState } from 'react';

const TotalTeacherCard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;


    const [totalTeacher, setTotalTeacher] = useState<number | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/admin/total-teacher");
            const data = await res.json();
            setTotalTeacher(data.totalTeacher);
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
                <Grid size={{ xs: 4, }}>
                    <Avatar
                        sx={{
                            bgcolor: primaryLight,
                            width: 56,
                            height: 56,
                        }}
                    >
                        <IconSchool size={28} color={primary} />
                    </Avatar>
                </Grid>

                {/* CONTENT */}
                <Grid size={{ xs: 8, }}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Total Teachers
                    </Typography>

                    <Typography variant="h3" fontWeight={700}>
                        {totalTeacher}
                    </Typography>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default TotalTeacherCard;
