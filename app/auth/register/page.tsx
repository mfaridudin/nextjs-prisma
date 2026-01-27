import SignUpForm from "@/components/auth/signUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignUp Page | Muhammad Farid Islamudin",
    description: "SignUp Form for My App",
};

export default function Register() {
    return <SignUpForm />
}