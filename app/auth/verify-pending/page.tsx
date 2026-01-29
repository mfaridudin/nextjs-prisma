import PendingVerify from "@/components/auth/pendingVerify";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify-Pending Page | Muhammad Farid Islamudin",
    description: "Verify-Pending Page  for My App",
};

export default function VerifyPending() {
    return <PendingVerify />
}
