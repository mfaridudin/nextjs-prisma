"use client"

import { useEffect, useState } from "react"
// import Button from "../ui/button"
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material"
// import Input from "../ui/input"

export default function VerifyPending() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("Please check your email for verification.")
    const [modal, setModal] = useState(false)

    const handleResend = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/resend-verification", { method: "POST" })
            const data = await res.json()
            if (res.ok) setMessage("Verification email successfully resent!")
            else setMessage(data.error || "Failed to send email. Please try again.")
        } catch (err) {
            setMessage("An error occurred. Please try again.")
        }
        setLoading(false)
    }

    useEffect(() => {
        const channel = new BroadcastChannel("auth-status")

        channel.onmessage = (event) => {
            if (event.data === "login-success") {
                window.location.href = "/auth/add-school"
            }
        }

        return () => channel.close()
    }, [])


    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f3f4f6",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    Email Verification
                </Typography>

                <Typography color="text.secondary" mt={2}>
                    {message}
                </Typography>

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleResend}
                    disabled={loading}
                    sx={{ mt: 3, py: 1.3 }}
                >
                    {loading ? (
                        <>
                            <CircularProgress size={18} sx={{ mr: 1, color: "white" }} />
                            Sending...
                        </>
                    ) : (
                        "Resend Verification Email"
                    )}
                </Button>

                <Typography mt={3} fontSize={12} color="text.secondary">
                    Didn't receive the email? Check your spam folder or wait a few minutes.
                </Typography>
            </Paper>
        </Box>
    )
}
