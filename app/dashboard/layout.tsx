import Headers from "@/component/ui/headers";
import Sidebar from "@/component/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-white">


            <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 overflow-y-auto h-screen">
                    <Headers />
                    <div className="p-6">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}
