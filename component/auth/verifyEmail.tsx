"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useUserStore } from "@/store/useUserStore"
import { Box, Paper, Typography, CircularProgress } from "@mui/material";

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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
                p: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    p: 4,
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                {loading && (
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <CircularProgress />
                        <Typography variant="h6">
                            Verifying your email...
                        </Typography>
                    </Box>
                )}

                {!loading && error && (
                    <Typography color="error" fontWeight={500}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Box>
    )
}
