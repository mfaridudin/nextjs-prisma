"use client"

import PageContainer from "../../components/container/PageContainer"
import TeacherTable from "../../components/teacher/tableTeacher"
import { Box, Typography } from "@mui/material"

export default function page() {
    return (
        <>
            <PageContainer title="Teacher Page | Muhammad Farid" description="this is Teacher page">
                <Box>
                    <Box mb={3}>
                        <Typography variant="h4" fontWeight={700}>
                            Teachers Management
                        </Typography>
                        <Typography color="text.secondary">
                            Manage Teachers data efficiently and keep everything organized in one place.
                        </Typography>
                    </Box>
                    <TeacherTable />
                </Box>
            </PageContainer>
        </>
    )
}
