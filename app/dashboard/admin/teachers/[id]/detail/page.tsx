import PageContainer from "@/app/dashboard/components/container/PageContainer";
import TeacherDetailPage from "@/app/dashboard/components/teacher/detailTeacher";

export default function page() {
    return (
        <PageContainer title="Detail Teacher Page | Muhammad Farid" description="this is Dashboard">
            <TeacherDetailPage />
        </PageContainer>
    )
}
