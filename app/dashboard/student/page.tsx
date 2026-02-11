'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '@/app/dashboard/components/container/PageContainer';

// components

import TeacherSummary from '../components/dashboard/summary';
import MyClassroom from '../components/dashboard/myClassroom';
import RecentLessons from '../components/dashboard/recentlesson';
import RecentSubmissions from '../components/dashboard/recentSubmission';
import PendingLessons from '../components/dashboard/pendingLesson';
import ScoreSummary from '../components/dashboard/score';
import AverageScoreCard from '../components/dashboard/average';
import TeachersList from '../components/dashboard/teacherList';

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
              lg: 2
            }}>
            <Grid size={{xs: 12}}>
              <ScoreSummary/>
            </Grid>
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 10
            }}>
            <PendingLessons />
          </Grid>

          <Grid
            size={{
              xs: 12,
              lg: 12
            }}>
            <TeachersList />
          </Grid>

        </Grid>
      </Box>
    </PageContainer>
  )
}
