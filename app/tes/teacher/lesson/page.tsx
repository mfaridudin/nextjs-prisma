"use client"

import LessonTable from "../../components/lesson/tableLesson"
import { Box, Typography } from "@mui/material"

export default function page() {
    return (
        <>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700}>
                    Lesson Management
                </Typography>
                <Typography color="text.secondary">
                    Manage Lesson data efficiently and keep everything organized in one place.
                </Typography>
            </Box>
            <LessonTable />
        </>
    )
}
