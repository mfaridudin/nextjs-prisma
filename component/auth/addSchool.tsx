"use client"

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Stack,
} from "@mui/material";

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import slugify from "slugify"
import { useUserStore } from "@/store/useUserStore"

export default function AddSchool() {
    const { setUser } = useUserStore()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [educationLevel, setEducationLevel] = useState("")
    const [validation, setValidation] = useState("")
    const router = useRouter()


    useEffect(() => {
        const channel = new BroadcastChannel("auth-status")

        channel.onmessage = (event) => {
            if (event.data === "school-complete") {
                window.location.href = "/dashboard"
            }
        }

        return () => channel.close()
    }, [])

    async function handleAddSchool(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const generateSlug = slugify(name, {
            lower: true,
            strict: true,
        })

        const payload = {
            name,
            address,
            slug: generateSlug,
            educationLevel,
        };

        const response = await fetch("/api/add-school", {
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

        const meRes = await fetch("/api/me")

        if (meRes.ok) {
            const userData = await meRes.json()
            setUser(userData)
        }

        const channel = new BroadcastChannel("auth-status")
        channel.postMessage("school-complete")
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
                bgcolor: "grey.100",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 420,
                    width: "100%",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
                    Add School
                </Typography>

                <form onSubmit={handleAddSchool}>
                    <Stack spacing={2}>
                        <TextField
                            label="Name"
                            placeholder="Name School"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Address"
                            placeholder="Address School"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            select
                            label="School Level"
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Select School Level</MenuItem>
                            <MenuItem value="PRIMARY_SCHOOL">Primary School</MenuItem>
                            <MenuItem value="JUNIOR_HIGH_SCHOOL">
                                Junior High School
                            </MenuItem>
                            <MenuItem value="SENIOR_HIGH_SCHOOL">
                                Senior High School
                            </MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            sx={{ mt: 1 }}
                        >
                            {loading ? <CircularProgress size={22} /> : "Submit"}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    )
}
