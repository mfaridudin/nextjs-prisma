"use client"

import { useState } from "react"
import Button from "../ui/button"
import Input from "../ui/input"

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

    // nanti state di sini?

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Email Verification</h1>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>

                    <Button
                        onClick={handleResend}
                        disabled={loading}
                        className="flex items-center justify-center mt-4 gap-2" size="lg" fullWidth
                    >
                        {loading && (
                            <svg
                                className="h-5 w-5 animate-spin text-white"
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
                        {loading ? "Send..." : "Resend Verification Email"}
                    </Button>

                    <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                        Didn't receive the email? Check your spam folder or wait a few minutes.
                    </p>
                </div>
            </div>
        </>
    )
}
