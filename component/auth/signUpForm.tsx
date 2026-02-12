"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
// import Button from "../ui/button"
// import Input from "../ui/input"

import { useState } from "react"
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material"

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
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f3f4f6",
                p: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 3,
                }}
            >
                <Box sx={{ p: 4 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Sign Up
                    </Typography>

                    <Typography color="text.secondary" mb={3}>
                        Create your account to continue
                    </Typography>

                    <form onSubmit={handleRegister}>
                        <Stack spacing={2}>
                            <TextField label="Full Name" fullWidth
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)} />

                            <TextField
                                label="Username"
                                fullWidth
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                label="Address"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />

                            <TextField
                                label="Date of Birth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />

                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                value={password_confirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{ mt: 1, py: 1.3 }}
                            >
                                {loading ? "Loading..." : "Create Account"}
                            </Button>
                        </Stack>
                    </form>

                    <Typography mt={3} fontSize={14} textAlign="center">
                        Already have an account?{" "}
                        <Link href="/auth/login">Sign In</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>

    );
}
