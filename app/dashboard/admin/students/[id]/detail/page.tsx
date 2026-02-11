import PageContainer from "@/app/dashboard/components/container/PageContainer";
import DetailStudent from "@/app/dashboard/components/students/detailStudent";
import { Typography } from "@mui/material";
import { Box } from "lucide-react";

export default function page() {
    return (
        <PageContainer title="Detail Students Page | Muhammad Farid" description="this is Dashboard">
            <DetailStudent />
        </PageContainer>
    )
}
