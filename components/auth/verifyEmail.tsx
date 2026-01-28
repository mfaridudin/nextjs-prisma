"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/ui/button"

export default function VerifyEmail() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams?.get("token") || null
    const loading = useState(true)

    useEffect(() => {
        if (!token) return;
        window.location.href = `/api/verify-email?token=${token}`;
    }, [token]);

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
                <div className="flex items-center justify-center gap-4 max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
                    {loading && (
                        <svg
                            className="h-10 w-10 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    )}
                    <span className="text-gray-800 text-2xl dark:text-white">{loading ? "currently verifying..." : "success"}</span>
                </div>
            </div>
        </>
    )
}
