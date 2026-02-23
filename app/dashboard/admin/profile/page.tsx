"use client"

import PageContainer from "../../components/container/PageContainer"
import {
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import { useUserStore } from "@/store/useUserStore"
import { useEffect, useState } from "react"
import { IconArrowLeft } from "@tabler/icons-react"

type Admin = {
    id: number
    fullName: string
    username: string
    profile: string
    email: string
    emailVerified: boolean
    createdAt: string
    School?: { name: string }
    Course?: { name: string }
}

export default function Page() {
    const { user } = useUserStore()
    const id = user?.id
    const [admin, setAdmin] = useState<Admin | null>(null)
    useEffect(() => {
        if (!id) return

        fetch(`/api/admin/${id}`)
            .then(res => res.json())
            .then(setAdmin)
    }, [id])

    return (
        <PageContainer>
            <Box sx={{ p: 3 }}>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Profile
                        </h1>
                        <p className="text-sm text-gray-500">
                            Detail information
                        </p>
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<IconArrowLeft />}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </div>
                <Stack spacing={4}>

                    {/* HERO PROFILE */}
                    <Paper sx={{ p: 4, borderRadius: 3 }} elevation={1}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={4}
                            alignItems={{ md: "center" }}
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                    src={admin?.profile ?? "/images/profile/profile-default.png"}
                                    sx={{ width: 110, height: 110 }}
                                />

                                <Box>
                                    <Typography variant="h5" fontWeight={700}>
                                        {admin?.fullName ?? "-"}
                                    </Typography>

                                    <Typography color="text.secondary">
                                        @{admin?.username ?? "-"}
                                    </Typography>

                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Chip label="Admin" color="error" size="small" />

                                        <Chip
                                            label={
                                                admin?.emailVerified
                                                    ? "Verified"
                                                    : "Not Verified"
                                            }
                                            color={
                                                admin?.emailVerified
                                                    ? "success"
                                                    : "warning"
                                            }
                                            size="small"
                                        />
                                    </Stack>
                                </Box>
                            </Stack>

                            <Button variant="contained">
                                Edit Profile
                            </Button>
                        </Stack>
                    </Paper>

                    {/* DETAIL INFORMATION */}
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
                                <Typography variant="h6" fontWeight={600} mb={3}>
                                    Account Information
                                </Typography>

                                <Stack spacing={3}>
                                    <Info label="Full Name" value={admin?.fullName} />
                                    <Info label="Email" value={admin?.email} />
                                    <Info label="Username" value={admin?.username} />
                                    <Info
                                        label="Joined"
                                        value={
                                            admin?.createdAt
                                                ? new Date(admin.createdAt).toLocaleDateString()
                                                : "-"
                                        }
                                    />
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6, }}>
                            <Paper sx={{ p: 3, borderRadius: 3, minHeight: 336, }} elevation={1}>
                                <Typography variant="h6" fontWeight={600} mb={3}>
                                    Role & Access
                                </Typography>

                                <Stack spacing={3}>
                                    <Info label="Role" value="Administrator" />
                                    <Info label="Access Level" value="Full System Access" />
                                    <Info label="Status" value="Active" />
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>

                </Stack>
            </Box>
        </PageContainer>
    )
}

function Info({ label, value }: any) {
    return (
        <Box>
            <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase" }}
            >
                {label}
            </Typography>

            <Typography fontWeight={600}>
                {value ?? "-"}
            </Typography>
        </Box>
    )
}