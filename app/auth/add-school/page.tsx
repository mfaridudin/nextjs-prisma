import AddSchool from "@/components/auth/addSchool";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add-School Page | Muhammad Farid Islamudin",
    description: "Add-School Form for My App",
};

export default function Register() {
    return <AddSchool />
}