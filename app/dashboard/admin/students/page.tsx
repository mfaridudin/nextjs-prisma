import Students from "@/components/dashboard/student"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Students Page | Muhammad Farid Islamudin",
    description: "Students Form for My App",
};

export default async function page() {
    return (
        <div>
            <Students url={"/dashboard/admin/students"} />
        </div>
    )
}
