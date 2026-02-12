"use client"

import Link from "next/link"
import {
    Box,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation"
// import Button from "../ui/button"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useUserStore } from "@/store/useUserStore"

export default function SignInForm() {

    const { setUser } = useUserStore()

    const [showPassword, setShowPassword] = useState(false)
    // const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<string | null>(null);
    const router = useRouter()


    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setFormError(null)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            let message = "Email or password is incorrect"

            if (res.error === "email-not-verified") {
                message = "Email not verified. Please check your inbox."
            }

            setFormError(message)
            return
        }

        const meRes = await fetch("/api/me")

        if (meRes.ok) {
            const userData = await meRes.json()
            setUser(userData)
        }

        if (!meRes.ok) {
            setFormError("Failed to load user data")
            return
        }

        const channel = new BroadcastChannel("auth-status")
        channel.postMessage("login-succes")
        channel.close()

        router.push("/");
    }

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
                }}
            >
                <Typography variant="h5" fontWeight={600} mb={1}>
                    Sign In
                </Typography>

                <Typography color="text.secondary" mb={3}>
                    Enter your email and password
                </Typography>

                <form onSubmit={handleLogin}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mt: 1.5, py: 1.3 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </form>

                <Typography mt={3} fontSize={14} textAlign="center">
                    Don't have an account?{" "}
                    <Link href="/auth/register">Sign Up</Link>
                </Typography>
            </Paper>
        </Box>
    )
}
