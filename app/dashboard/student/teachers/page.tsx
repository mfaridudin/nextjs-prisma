import { Metadata } from "next"
import Teacher from "@/components/dashboard/teacher";

export const metadata: Metadata = {
    title: "Teachers Page | Muhammad Farid Islamudin",
    description: "Teachers Form for My App",
};

export default function Teachers() {
    return (
        <Teacher url={"/dashboard/student/teachers"} />
    )
}
