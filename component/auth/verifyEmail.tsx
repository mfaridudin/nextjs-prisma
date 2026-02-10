"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useUserStore } from "@/store/useUserStore"

export default function EmailVerify() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams?.get("token")

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!token) {
            setError("Token missing")
            setLoading(false)
            return
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/verify-email?token=${token}`)
                if (!res.ok) throw new Error("Verification failed")

                const loginRes = await signIn("credentials", {
                    verifyToken: token,
                    redirect: false,
                })

                if (!loginRes?.ok) throw new Error("Login failed")

                const channel = new BroadcastChannel("auth-status")
                channel.postMessage("login-success")
                channel.close()

                await new Promise(r => setTimeout(r, 300))
                router.replace("/auth/add-school")

            } catch (err: any) { 
                setError(err.message || "Something went wrong")
            } finally {
                setLoading(false)
            }
        }

        verify()
    }, [token])


    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
            <div className="flex flex-col items-center justify-center gap-4 max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">

                {loading && (
                    <>
                        <svg
                            className="h-10 w-10 animate-spin text-gray-800 dark:text-white"
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
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
                        <span className="text-2xl text-gray-800 dark:text-white">
                            Verifying your email...
                        </span>
                    </>
                )}

                {!loading && error && (
                    <span className="text-red-500 text-lg">{error}</span>
                )}
            </div>
        </div>
    )
}
