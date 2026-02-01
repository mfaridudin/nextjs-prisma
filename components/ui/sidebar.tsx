"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore"

const menuAdmin = [
    {
        label: "Dashboard",
        href: "/dashboard/admin",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />

        ),
    },
    {
        label: "Students",
        href: "/dashboard/admin/students",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        ),
    },
    {
        label: "Teachers",
        href: "/dashboard/admin/teachers",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />


        ),
    }
];

const menuTeacher = [
    {
        label: "Dashboard",
        href: "/dashboard/teacher",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />

        ),
    },
    {
        label: "Students",
        href: "/dashboard/teacher/students",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        ),
    },
];

const menuStudent = [
    {
        label: "Dashboard",
        href: "/dashboard/student",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />

        ),
    },
    {
        label: "All Teachers",
        href: "/dashboard/student/teachers",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />


        ),
    }
];

const menusByRole: Record<number, any[]> = {
    1: menuAdmin,
    2: menuTeacher,
    3: menuStudent,
};

export default function Sidebar() {
    const pathname = usePathname() ?? "";
    // const menus = menusByRole[role] || [];

    const { user } = useUserStore()

    const role = user?.roleId

    const menus = menusByRole[role ?? 0] || []

    return (
        <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl fixed h-screen p-4 border-r">
            <nav>
                <ul className="space-y-2">
                    {menus.map((menu) => {
                        const isActive =
                            pathname === menu.href

                        return (
                            <li key={menu.href}>
                                <Link
                                    href={menu.href}
                                    className={`flex items-center py-3 px-4 rounded-lg transition-all group
                    ${isActive
                                            ? "bg-indigo-600 text-white"
                                            : "hover:bg-indigo-100 dark:hover:bg-gray-700"
                                        }
                  `}
                                >
                                    <svg
                                        className={`w-5 h-5 mr-3 transition-colors
                      ${isActive
                                                ? "text-white"
                                                : "text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800"
                                            }
                    `}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {menu.icon}
                                    </svg>
                                    {menu.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
