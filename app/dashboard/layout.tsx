import Headers from "@/components/ui/headers";
import Sidebar from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);
    const role = session?.user.roleId;

    console.log(role)

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 bg-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
            <Headers />

            <div className="flex">
                <Sidebar role={role}/>

                <main className="flex-1 ml-64 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
