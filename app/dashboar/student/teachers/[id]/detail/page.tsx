import Teacher from '@/component/dashboard/teacher';
import { notFound } from 'next/navigation';
import UserNotFound from '@/component/ui/userNotFound';
// import DetaiPage from '@/components/dashboard/detaiPage';
import DetailTeacher from '@/component/dashboard/detailTeacher';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detail Teachers Page | Muhammad Farid Islamudin",
    description: "Detail Teachers for My App",
};

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const data = await fetch(`http://127.0.0.1:3000/api/teacher/${id}`, {
        cache: "no-store",
    })
    const teacher = await data.json()

    const roleTeacher = teacher.roleId

    if (roleTeacher !== 2) {
        return (<UserNotFound />)
    }

    console.log("Role ID:", roleTeacher)

    return <DetailTeacher item={teacher} title="Teachers Detail" />
}