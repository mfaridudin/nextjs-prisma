"use client";

import ClassroomTable from "../../components/classroom/tableClassroom";
import { Box, Typography } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";

export default function Page() {
    return (
        <>
            <PageContainer title="Teacher Page" description="this is Teacher page">
                <Box>
                    <Box mb={3}>
                        <Typography variant="h4" fontWeight={700}>
                            Class Management
                        </Typography>
                        <Typography color="text.secondary">
                            Manage Class data efficiently and keep everything organized in one place.
                        </Typography>
                    </Box>
                    <ClassroomTable />
                </Box>
            </PageContainer>
        </>
    );
}
