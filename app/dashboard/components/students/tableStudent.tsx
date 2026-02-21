"use client"

import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Input,
    Stack,
    TableContainer,
    Paper,
    Divider,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContent,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useOpenModal } from "@/store/useOpenModal";
import { IconEye } from "@tabler/icons-react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PageContainer from "../container/PageContainer";

const StudentTable = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // tutuup modal
    useEffect(() => {
        if (!open) {
            setForm(initialForm)
            setShowPassword(false)
            setShowConfirmPassword(false)
        }
    }, [open])

    const initialForm = {
        fullName: "",
        username: "",
        address: "",
        dateOfBirth: "",
        age: "",
        email: "",
        password: "",
        password_confirmation: "",
    }

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [validation, setValidation] = useState<any>({});


    async function fetchStudent() {
        try {
            const res = await fetch('/api/student')
            const data = await res.json()
            setStudents(data.students)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchStudent()
    }, []);

    async function handleAddStudent(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            ...form,
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : undefined,
            age: form.age ? Number(form.age) : undefined,
            roleId: 3,
            emailVerified: true,
        };

        console.log(payload)

        const response = await fetch("/api/student", {
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
        fetchStudent()
        setLoading(false)
        setForm(initialForm)
        closeModal()
    }

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/student/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });
            return;
        }
        fetchStudent()
        closeModal()
    }

    return (
        <PageContainer>
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
                                    <Typography fontWeight={600} noWrap>No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Full Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Username</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Address</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Email</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Create Date</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600} noWrap>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {students.map((student: any, index: number) => (
                                <TableRow key={student.id} hover>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={500}>{index + 1}</Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600} noWrap>
                                            {student.fullName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" noWrap>
                                            {student.username}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" sx={{ minWidth: 150 }}>
                                            {student.address}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" noWrap>
                                            {student.email}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="subtitle2" noWrap>
                                            {new Date(student.createdAt).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            <Link href={`students/${student.id}/detail`} style={{ textDecoration: 'none' }}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={<VisibilityIcon />}
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => openDeleteModal(student.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

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
                        <form onSubmit={handleAddStudent} className="p-6 space-y-4">

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={form.fullName}
                                    onChange={(e) => setForm({ ...form, fullName: e.target.value, })}
                                    // label="Full Name"
                                    type="text"
                                    placeholder="Enter full name"
                                />
                                <Input
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value, })}
                                    // label="Username"
                                    type="text"
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    // label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                />

                                <Input
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    // label="Address"
                                    type="text"
                                    placeholder="Enter address"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={form.dateOfBirth}
                                    onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                                    // label="Date of Birth"
                                    type="date"
                                    placeholder="Enter age"
                                />
                                <Input
                                    value={form.age}
                                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                                    // label="Age"
                                    type="number"
                                    placeholder="Enter age"
                                />
                            </div>

                            <div className="relative w-full">
                                <Input
                                    className="w-full pr-12"
                                    value={form.password}
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                >
                                    <IconEye />
                                </span>
                            </div>


                            <div className="relative w-full">
                                <Input
                                    className="w-full pr-12"
                                    value={form.password_confirmation}
                                    onChange={(e) =>
                                        setForm({ ...form, password_confirmation: e.target.value })
                                    }
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer
               text-gray-400 hover:text-gray-600"
                                >
                                    <IconEye />
                                </span>
                            </div>


                            <div className="flex items-center justify-end gap-4  pt-6  border-gray-200">
                                <Button
                                    onClick={closeModal}
                                    sx={{
                                        backgroundColor: "#F3F4F6",
                                        color: "#374151",
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: "#E5E7EB",
                                        },
                                    }}
                                >
                                    Cancelled
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Add Student
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={open && mode === "delete"} onClose={closeModal} maxWidth="sm" fullWidth>
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        Delete Student

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
                        <div className="p-6">
                            <p className="mb-6 text-gray-700">Are you sure you want to delete this data?</p>
                            <div className="flex justify-end gap-3">
                                <Button
                                    size="small"
                                    onClick={closeModal}
                                    sx={{
                                        backgroundColor: "#F3F4F6",
                                        color: "#374151",
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: "#E5E7EB",
                                        },
                                    }}
                                >
                                    Cancelled
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small" onClick={() => selectedId && handleDelete(selectedId)}>
                                    Yes, Delete
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </DashboardCard>
        </PageContainer>
    );
};

export default StudentTable;
