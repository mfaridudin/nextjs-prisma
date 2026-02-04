import DetailCourse from "@/components/dashboard/detailCourse";

export default async function page({ params }: any) {

    const { id } = await params;

    const data = await fetch(`http://127.0.0.1:3000/api/course/${id}`, {
        cache: "no-store",
    })

    const course = await data.json()

    return <DetailCourse data={course} />
}