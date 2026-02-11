'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';

// components
import TeacherSummary from '../components/dashboard/summary';
import MyClassroom from '../components/dashboard/myClassroom';
import RecentLessons from '../components/dashboard/recentlesson';
import RecentSubmissions from '../components/dashboard/recentSubmission';

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
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <MyClassroom />
                            </Grid>
                            <Grid size={12}>
                                <TeacherSummary />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}>
                       
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}>
                     
                    </Grid> */}
                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}>
                        <RecentLessons />
                    </Grid>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 12
                        }}>
                        <RecentSubmissions />
                    </Grid>

                </Grid>
            </Box>
        </PageContainer>
    )
}
