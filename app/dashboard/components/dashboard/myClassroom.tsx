import { Stack, Typography, Grid } from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import { useEffect, useState } from "react";

const MyClassroom = () => {

    interface teacherClass {
        name: string;
        school: string;
        course: string;
        studentsCount: number;
    }

    const [teacherClass, setTeacherClass] = useState<teacherClass | null>(null);

    async function fetchSummary() {
        try {
            const res = await fetch("/api/teacher/classroom");
            const data = await res.json();
            setTeacherClass(data);
        } catch (error) {
            console.error("Error fetch summary:", error);
        }
    }

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <DashboardCard title="My Classroom">
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight="600">
                    {teacherClass?.name}
                </Typography>

                <Typography color="textSecondary">
                    School: {teacherClass?.school}
                </Typography>

                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Students
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                            {teacherClass?.studentsCount}
                        </Typography>
                    </Grid>

                    <Grid xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Course
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                            {teacherClass?.course}
                        </Typography>
                    </Grid>
                </Grid>
            </Stack>
        </DashboardCard>
    );
};

export default MyClassroom;
