import { Grid, Stack, Typography, Avatar } from "@mui/material";
import { IconBook, IconUsers, IconChecklist, IconSchool } from "@tabler/icons-react";
import DashboardCard from "@/app/tes/components/shared/DashboardCard";

const TeacherSummary = () => {
    const summary = [
        {
            title: "Lessons",
            value: 12,
            icon: <IconBook size={20} />,
            color: "#E3F2FD",
        },
        {
            title: "Students",
            value: 32,
            icon: <IconUsers size={20} />,
            color: "#E8F5E9",
        },
        {
            title: "Submissions",
            value: 54,
            icon: <IconChecklist size={20} />,
            color: "#FFF3E0",
        },
        {
            title: "Courses",
            value: 2,
            icon: <IconSchool size={20} />,
            color: "#F3E5F5",
        },
    ];

    return (
        <DashboardCard title="Summary">
            <Grid container spacing={10}>
                {summary.map((item, index) => (
                    <Grid key={index} xs={6} sm={3}>
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
