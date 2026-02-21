"use client"

import PageContainer from "../../components/container/PageContainer"
import LessonTable from "../../components/lesson/tableLesson"
import { Box, Typography } from "@mui/material"

export default function page() {
    return (
        <PageContainer>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700}>
                    Lesson Management
                </Typography>
                <Typography color="text.secondary">
                    Manage Lesson data efficiently and keep everything organized in one place.
                </Typography>
            </Box>
            <LessonTable />
            </PageContainer>
    )
}
