import { Stack, Typography, Grid } from "@mui/material";
import DashboardCard from "@/app/tes/components/shared/DashboardCard";

const MyClassroom = () => {
    // dummy data dulu
    const classroom = {
        name: "XI RPL 1",
        school: "SMK Example",
        studentsCount: 32,
        course: "Programming Basics",
    };

    return (
        <DashboardCard title="My Classroom">
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight="600">
                    {classroom.name}
                </Typography>

                <Typography color="textSecondary">
                    School: {classroom.school}
                </Typography>

                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Students
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                            {classroom.studentsCount}
                        </Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Course
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                            {classroom.course}
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </DashboardCard>
    );
};

export default MyClassroom;
