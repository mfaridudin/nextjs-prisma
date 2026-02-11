"use client";

import { Box, Typography } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import CourseTable from "../../components/course/course";

export default function Page() {
    return (
        <>
            <PageContainer title="Course Page | Muhammad Farid" description="this is Teacher page">
                <Box>
                    <Box mb={3}>
                        <Typography variant="h4" fontWeight={700}>
                            Teachers Management
                        </Typography>
                        <Typography color="text.secondary">
                            Manage Teachers data efficiently and keep everything organized in one place.
                        </Typography>
                    </Box>
                    <CourseTable />
                </Box>
            </PageContainer>
        </>
    );
}
