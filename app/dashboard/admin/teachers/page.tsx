"use client"

import PageContainer from "../../components/container/PageContainer"
import TeacherTable from "../../components/teacher/tableTeacher"
import { Box, Typography } from "@mui/material"

export default function page() {
    return (
        <>
            <PageContainer>
                <Box
                    sx={{
                        width: "100%",
                        px: { xs: 1, sm: 2, md: 0 },
                    }}
                >
                    <Box mb={{ xs: 2, sm: 3 }}>
                        <Typography
                            fontWeight={700}
                            fontSize={{ xs: "1.4rem", sm: "1.75rem", md: "2rem" }}
                        >
                            Teachers Management
                        </Typography>

                        <Typography
                            color="text.secondary"
                            fontSize={{ xs: "0.85rem", sm: "0.95rem" }}
                        >
                            Manage Teachers data efficiently and keep everything organized in one place.
                        </Typography>
                    </Box>

                    <TeacherTable />
                </Box>
            </PageContainer>
        </>
    )
}
