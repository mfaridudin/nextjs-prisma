"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Autocomplete, Box, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, Link, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { useOpenModal } from "@/store/useOpenModal";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface Student {
    id: number
    fullName: string
    email: string
}

interface Classroom {
    id: number
    name: string
    slug: string
    teacher?: {
        fullName: string
    }
    students: Student[]
    _count?: {
        students: number
    }
}


export default function DetailClassroom() {
    const params = useParams();
    const id = params?.id as string;

    const [students, setStudents] = useState<Student[]>([])
    const [selected, setSelected] = useState<number[]>([])
    const [classroom, setClassroom] = useState<Classroom | null>(null)

    const { open, mode, openAddModal, closeModal } = useOpenModal()

    useEffect(() => {
        if (!open) {
            setSelected([])
        }
    }, [open])

    async function fetchStudents() {
        try {
            const res = await fetch('/api/student/available')
            const data = await res.json()
            setStudents(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchClassroom()
        fetchStudents()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(e.target.selectedOptions, option =>
            Number(option.value)
        )
        setSelected(values)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!classroom) return

        const res = await fetch("/api/classroom/add-student", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                classroomId: classroom.id,
                studentIds: selected,
            }),
        })

        if (res.ok) {
            closeModal()
            setSelected([])
            fetchClassroom()
            fetchStudents()
        }
    }

    async function fetchClassroom() {
        if (!id) return

        try {
            const res = await fetch(`/api/classroom/${id}`)
            const data = await res.json()
            setClassroom(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (id) {
            fetchClassroom()
            fetchStudents()
        }
    }, [id])


    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Class Detail
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

            {/* Card */}
            <div className="rounded-2xl mb-8 border border-gray-200 bg-white shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div style={{ backgroundColor: "#5D87FF" }} className="p-6 bg-[#5D87FF]">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {classroom?.name}
                            </h2>
                            <p className="text-sm text-white/80">@{classroom?.slug}</p>
                        </div>
                    </div>
                </div>

                {/* Detail */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Teacher</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {classroom?.teacher?.fullName}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Number of Students</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {classroom?.students?.length || 0}
                            </p>
                        </div>

                    </div>


                    {/* <div className="mt-8 flex justify-end">
                        <Button
                            variant="contained"
                            // onClick={onEdit}
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white
                       hover:bg-indigo-700 transition"
                        >
                            Edit
                        </Button>
                    </div> */}

                </div>
            </div>

            <DashboardCard title="Students" action={
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={openAddModal}
                >
                    Add Student
                </Button>
            }>
                <Box sx={{ overflow: "auto" }}>
                    <Table sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Full Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Username</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Address</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Email</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Date of entry</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {classroom?.students?.map((item: any, index: number) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Typography fontWeight={500}>
                                            {index + 1}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            {item.fullName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.username}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.address}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.email}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                minute: '2-digit',
                                                hour: '2-digit',
                                            })}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>

            <Dialog open={open && mode === "add"} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Add Student
                    <IconButton
                        aria-label="close"
                        onClick={closeModal}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Students</p>

                            <Autocomplete
                                multiple
                                options={students}
                                getOptionLabel={(option) => option.fullName}
                                value={students.filter(s => selected.includes(s.id))}
                                onChange={(event, newValue) => {
                                    setSelected(newValue.map(s => s.id));
                                }}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            label={option.fullName}
                                            {...getTagProps({ index })}
                                            key={option.id}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Select students..." />
                                )}
                            />
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-6 border-gray-200">
                            <Button
                                onClick={closeModal}
                                sx={{
                                    backgroundColor: "#F3F4F6",
                                    color: "#374151",
                                    px: 2,
                                    "&:hover": {
                                        backgroundColor: "#E5E7EB",
                                    },
                                }}
                            >
                                Cancelled
                            </Button>

                            <Button type="submit" variant="contained" >
                                Add Student
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
