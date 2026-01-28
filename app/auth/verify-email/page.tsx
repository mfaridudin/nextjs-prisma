import VerifyEmail from "@/components/auth/verifyEmail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify-Email Page | Muhammad Farid Islamudin",
    description: "Verify-Email Page  for My App",
};

export default function page() {
    return <VerifyEmail />
}
