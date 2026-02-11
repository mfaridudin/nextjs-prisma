"use client";

import { Grid, Typography, Avatar } from '@mui/material';
import { IconUsers } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useEffect, useState } from 'react';

const TotalStudentCard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;

    const [totalStudent, setTotalStudent] = useState<number | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/admin/total-student");
            const data = await res.json();
            setTotalStudent(data.totalStudent);
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
                        <IconUsers size={28} color={primary} />
                    </Avatar>
                </Grid>

                {/* CONTENT */}
                <Grid xs={8}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Total Students
                    </Typography>

                    <Typography variant="h3" fontWeight={700}>
                        {totalStudent}
                    </Typography>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default TotalStudentCard;
