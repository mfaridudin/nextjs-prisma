"use client"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VerifyEmailClient() {
    const searchParams = useSearchParams()
    const token = searchParams?.get("token") ?? null

    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (token) {
            console.log("Verify token:", token)
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
        }
    }, [token])

    return <div>Verifying email...</div>
}
