import SignInForm from "@/components/auth/signInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignIn Page | Muhammad Farid Islamudin",
    description: "SignIn Form for My App",
};

export default function Login() {
    return <SignInForm />
}