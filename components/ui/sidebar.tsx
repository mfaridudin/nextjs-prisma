"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

const menus = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
        ),
    },
    {
        label: "Students",
        href: "/dashboard/students",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"
            />
        ),
    },
    {
        label: "Teachers",
        href: "/dashboard/teachers",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0M12 14a7 7 0 00-7 7h14"
            />
        ),
    },
    {
        label: "Classes",
        href: "/dashboard/classes",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
            />
        ),
    },
    {
        label: "Reports",
        href: "/dashboard/reports",
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17v-6a2 2 0 00-2-2H5"
            />
        ),
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </>
        ),
    },
];


export default function Sidebar() {
    const pathname = usePathname() ?? "";

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
