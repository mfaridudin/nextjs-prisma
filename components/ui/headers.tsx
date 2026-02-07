"use client"

import { useEffect, useState } from "react"
import { Mail, Bell, Search } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"

export default function Headers() {
    const [isScrolled, setIsScrolled] = useState(false)

    const { user } = useUserStore()

    useEffect(() => {
        const container = document.querySelector("main")

        if (!container) return

        const handleScroll = () => {
            setIsScrolled(container.scrollTop > 10)
        }

        container.addEventListener("scroll", handleScroll)
        return () => container.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <header
                className={`
          sticky top-0 z-40
          bg-white
          px-6 py-4
          flex items-center justify-between
          transition-shadow duration-300
          ${isScrolled ? "shadow-md" : "shadow-none"}
        `}
            >
                <h1 className="text-2xl font-semibold">
                    Welcome Back 👋
                </h1>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            className="pl-10 pr-4 py-2 rounded-lg border outline-none"
                            placeholder="Search..."
                        />
                    </div>

                    <Mail className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />

                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="https://i.pravatar.cc/40"
                            className="rounded-full w-9 h-9"
                        />
                        <div>
                            <p className="text-sm font-semibold">
                                {user?.name ?? "Admin"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.role?.name ?? "Admin"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}