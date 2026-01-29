"use client"

import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import slugify from "slugify"
import { signIn } from "next-auth/react"

export default function AddSchool() {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [educationLevel, setEducationLevel] = useState("")
    const [validation, setValidation] = useState("")
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const t = searchParams.get("token")
        setToken(t)
        console.log("JWT token:", t)
    }, [])


    async function handleAddSchool(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const generateSlug = slugify(name, {
            lower: true,
            strict: true,
        })

        const payload = {
            token,
            name,
            address,
            slug: generateSlug,
            educationLevel,
        };

        const response = await fetch("/api/school", {
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

        const { magicToken } = await response.json();

        await signIn("credentials", {
            magicToken,
            redirect: false,
        });

        router.push("/");
    }

    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add School</h1>

                    <form onSubmit={handleAddSchool} className="flex flex-col gap-4">
                        <Input label="Name"
                            required
                            placeholder="Name School"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        // error={validation?.name?.[0]}
                        />

                        <Input label="Address"
                            required
                            placeholder="Addree School"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        // error={validation?.age?.[0]}
                        />

                        <div className="flex flex-col gap-1 w-full text-start">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                School Level
                            </label>
                            <div className="relative">
                                <select
                                    value={educationLevel}
                                    onChange={(e) => setEducationLevel(e.target.value)}
                                    className="appearance-none w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                >
                                    <option value="">Select School Level</option>
                                    <option value="PRIMARY_SCHOOL">Primary School</option>
                                    <option value="JUNIOR_HIGH_SCHOOL">Junior High School</option>
                                    <option value="SENIOR_HIGH_SCHOOL">Senior High School</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="dark:text-white text-gray-900 size-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </div>
                        </div>


                        <Button
                            className="flex items-center justify-center mt-4 gap-2" fullWidth
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
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
