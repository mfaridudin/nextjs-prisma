"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "../ui/button"
import Input from "../ui/input"

import { useState } from "react"

export default function SignUpForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState("")
    const [username, setUserName] = useState("")
    const [address, setAddress] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [loading, setLoading] = useState(false)

    const [validation, setValidation] = useState<any>({});

    const router = useRouter()
    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            fullName,
            email,
            username,
            address,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : undefined,
            age: age ? Number(age) : undefined,
            password,
            password_confirmation,
        };

        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error })
            return;
        }
        setLoading(false)

        router.push("/auth/verify-pending");
    }

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900">

                    <div className="hidden w-1/2 bg-brand-500 p-10 text-gray-800 dark:text-white  lg:flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">Welcome 👋</h2>
                            <p className="mt-2 text-gray-800/80 dark:text-white/80">
                                Create an account and start your journey with us
                            </p>
                        </div>
                        <p className="text-sm  text-gray-800/70 dark:text-white/70">
                            © 2026 Your Company
                        </p>
                    </div>

                    <div className="flex w-full flex-col justify-center px-6 py-10 lg:w-1/2 sm:px-10">

                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold  dark:text-white">
                                Sign Up
                            </h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Enter your details to create an account
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Input label="Full Name"
                                    // required
                                    placeholder="Your Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    error={validation?.fullName?.[0]}
                                />

                                <Input label="Username"
                                    // required
                                    placeholder="Input your username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    error={validation?.username?.[0]}
                                />
                            </div>

                            <Input label="Email"
                                // required
                                type="email"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={validation?.email?.[0]}
                            />

                            <Input label="Address"
                                // required
                                placeholder="Your Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                error={validation?.address?.[0]}
                            />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Input label="Date of Birth"
                                    type="date"
                                    // required
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    error={validation?.dateOfBirth?.[0]}
                                />

                                <Input label="Age"
                                    // required
                                    placeholder="Your Age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    error={validation?.age?.[0]}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                <div className="relative">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
                                                        text-gray-800 placeholder-gray-400
                                                        focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white
                                                    dark:placeholder-gray-500"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    </span>
                                </div>
                                {validation && (validation?.age?.[0])}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                <div className="relative">
                                    <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
                                                        text-gray-800 placeholder-gray-400
                                                        focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
                                                    dark:border-gray-700 dark:bg-gray-900 dark:text-white
                                                    dark:placeholder-gray-500"
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    </span>
                                </div>
                            </div>

                            {/* Terms */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                By creating an account, you agree to our{" "}
                                <span className="font-medium text-gray-800 dark:text-white">
                                    Terms & Conditions
                                </span>{" "}
                                and{" "}
                                <span className="font-medium text-gray-800 dark:text-white">
                                    Privacy Policy
                                </span>
                            </p>

                            <Button variant="primary" size="md" fullWidth disabled={loading}
                                className="flex items-center justify-center gap-2"
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
                                {loading ? "Send..." : "Create Account"}
                            </Button>
                        </form>

                        {/* footer */}
                        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?
                            <Link
                                href="/auth/login"
                                className="ml-1 font-medium text-brand-500 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
