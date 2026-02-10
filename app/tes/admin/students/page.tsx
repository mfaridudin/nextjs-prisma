"use client"

import StudentTable from "../../components/students/tableStudent"
import { Box, Typography } from "@mui/material"

export default function page() {
    return (
        <>
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700}>
                    Students Management
                </Typography>
                <Typography color="text.secondary">
                    Manage student data efficiently and keep everything organized in one place.
                </Typography>
            </Box>
            <StudentTable />
        </>
    )
}
