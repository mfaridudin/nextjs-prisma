import Teacher from '@/components/dashboard/teacher';
import { notFound } from 'next/navigation';
import UserNotFound from '@/components/ui/userNotFound';
import { Metadata } from 'next';
import DetaiStudent from '@/components/dashboard/detailStudent';


export const metadata: Metadata = {
    title: "Detail Students Page | Muhammad Farid Islamudin",
    description: "Detail Students for My App",
};

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;


    const data = await fetch(`http://127.0.0.1:3000/api/student/${id}`, {
        cache: "no-store",
    })
    const student = await data.json()

    const roleStudent = student.roleId

    if (roleStudent !== 3) {
        return (<UserNotFound />)
    }

    return <DetaiStudent item={student} title="Student Detail" />
}
