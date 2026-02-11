'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';

// components
import TotalTeacherCard from '../components/dashboard/totalTeacher';
import TotalStudentCard from '../components/dashboard/totalStudent';
import TotalClassroomCard from '../components/dashboard/totalClassrooms';
import TotalCourseCard from '../components/dashboard/totalCourse';
import TotalLessonCard from '../components/dashboard/totalLessons';
import ActivityOverview from '../components/dashboard/activityOverview';

export default function page() {
    return (
        <PageContainer title="Dashboard Page" description="this is Dashboard">
            <Box>
                <Box mb={3}>
                    <Typography variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>
                    <Typography color="text.secondary">
                        Welcome back — here’s your system overview.
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}>
                        <TotalTeacherCard totalTeacher={12} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}>
                        <TotalStudentCard totalStudent={12} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 4
                        }}>
                        <TotalClassroomCard totalClassroom={12} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 4
                        }}>
                        <TotalCourseCard totalCourse={12} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 4
                        }}>
                        <TotalLessonCard totalLesson={12} />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 12
                        }}>
                        <ActivityOverview />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    )
}
