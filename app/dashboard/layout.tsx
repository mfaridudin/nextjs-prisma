import Headers from "@/components/ui/headers";
import Sidebar from "@/components/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 bg-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
            <Headers />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 ml-64 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
