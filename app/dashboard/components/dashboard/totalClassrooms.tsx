"use client";

import { Grid, Typography, Avatar } from '@mui/material';
import { IconChalkboard } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';
import { useEffect, useState } from 'react';


const TotalClassroomCard = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;

    const [totalClassroom, setTotalClassroom] = useState<number | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/admin/total-classroom");
            const data = await res.json();
            setTotalClassroom(data.totalClassroom);
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
                        <IconChalkboard size={28} color={primary} />
                    </Avatar>
                </Grid>

                {/* CONTENT */}
                <Grid size={{ xs: 8, }}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Total Class
                    </Typography>

                    <Typography variant="h3" fontWeight={700}>
                        {totalClassroom}
                    </Typography>
                </Grid>
            </Grid>

        </DashboardCard>
    );
};

export default TotalClassroomCard;
