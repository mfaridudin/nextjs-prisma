"use client";

import { Grid, Typography, Avatar } from '@mui/material';
import { IconSchool } from "@tabler/icons-react";
import { useTheme } from "@mui/material/styles";

import DashboardCard from '@/app/tes/components/shared/DashboardCard';
type Props = {
    totalTeacher: number;
};

const TotalTeacherCard = ({ totalTeacher }: Props) => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;

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
                        <IconSchool size={28} color={primary} />
                    </Avatar>
                </Grid>

                {/* CONTENT */}
                <Grid xs={8}>
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
