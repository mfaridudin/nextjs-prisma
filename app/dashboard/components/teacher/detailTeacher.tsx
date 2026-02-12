"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Input } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import { useOpenModal } from "@/store/useOpenModal";
import Modal from "@/app/dashboard/components/ui/modal";

type Teacher = {
    Role: any;
    id: number;
    fullName: string;
    username: string;
    email: string;
    address: string | null;
    age: number | null;
    avatar?: string;
    emailVerified: boolean;
    dateOfBirth?: string;
    createdAt: string;
    role: {
        name: string;
    };
};

export default function TeacherDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { open, mode, selectedId, openEditModal, closeModal } = useOpenModal()
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [loading, setLoading] = useState(true);
    const [formEdit, setFormEdit] = useState({
        fullName: "",
        username: "",
        address: "",
        email: "",
        age: "",
        dateOfBirth: "",
    });


    async function fetchTeacher() {
        try {
            const res = await fetch(`/api/teacher/${id}`);
            const data = await res.json();
            setTeacher(data);

            setFormEdit({
                fullName: data.fullName ?? "",
                username: data.username ?? "",
                address: data.address ?? "",
                email: data.email ?? "",
                age: data.age ? String(data.age) : "",
                dateOfBirth: data.dateOfBirth
                    ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                    : "",
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleEditTeacher(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            ...formEdit,
            dateOfBirth: formEdit.dateOfBirth ? new Date(formEdit.dateOfBirth).toISOString() : undefined,
            age: formEdit.age ? Number(formEdit.age) : undefined,
            roleId: 3,
            emailVerified: true,
        };

        const response = await fetch(`/api/teacher/${selectedId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            // setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error })
            return;
        }
        fetchTeacher()
        closeModal()
    }

    useEffect(() => {
        fetchTeacher();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!teacher) return <p>Teacher not found</p>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Teacher Detail
                    </h1>
                    <p className="text-sm text-gray-500">Detail information</p>
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
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div className="p-6" style={{ backgroundColor: "#5D87FF" }}>
                    <div className="flex items-center gap-4">
                        <img
                            src={teacher.avatar ?? "/default-avatar.png"}
                            alt={teacher.fullName ?? "Avatar"}
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {teacher.fullName ?? "-"}
                            </h2>
                            <p className="text-sm text-white/80">@{teacher.username ?? "-"}</p>
                        </div>
                    </div>
                </div>

                {/* Detail Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Full Name
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.fullName ?? "-"}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Username
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.username ?? "-"}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Age
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.age ?? "-"} years
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Email
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.email ?? "-"}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Address
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.address ?? "-"}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Email Status
                            </span>
                            <p className={`text-sm font-semibold ${teacher.emailVerified ? "text-green-600" : "text-red-500"}`}>
                                {teacher.emailVerified ? "Verified" : "Not Verified"}
                            </p>
                        </div>

                        {teacher.dateOfBirth && (
                            <div>
                                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Date of Birth
                                </span>
                                <p className="text-sm font-semibold text-gray-900">
                                    {new Date(teacher.dateOfBirth).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Account Created
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {new Date(teacher.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Role
                            </span>
                            <p className="text-sm font-semibold text-gray-900">
                                {teacher.Role?.name ?? "-"}
                            </p>
                        </div>

                    </div>

                    {/* Edit Button */}
                    <div className="mt-8 flex justify-end">
                        <Button
                            variant="contained"
                            onClick={() => openEditModal(teacher.id)}
                        >
                            Edit
                        </Button>
                    </div>

                </div>
            </div>

            <Modal open={open && mode === "edit"}
                onClose={closeModal}
                title="Add Teacher"
                maxWidth="max-w-xl">
                {/* form */}
                <form onSubmit={handleEditTeacher} className="p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            value={formEdit.fullName}
                            onChange={(e) => setFormEdit({ ...formEdit, fullName: e.target.value, })}
                            // label="Full Name"
                            type="text"
                            placeholder="Enter full name"
                        />
                        <Input
                            value={formEdit.username}
                            onChange={(e) => setFormEdit({ ...formEdit, username: e.target.value, })}
                            // label="Username"
                            type="text"
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            value={formEdit.email}
                            onChange={(e) => setFormEdit({ ...formEdit, email: e.target.value })}
                            // label="Email"
                            type="email"
                            placeholder="Enter email"
                        />

                        <Input
                            value={formEdit.address}
                            onChange={(e) => setFormEdit({ ...formEdit, address: e.target.value })}
                            // label="Address"
                            type="text"
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            value={formEdit.dateOfBirth}
                            onChange={(e) => setFormEdit({ ...formEdit, dateOfBirth: e.target.value })}
                            // label="Date of Birth"
                            type="date"
                            placeholder="Enter age"
                        />
                        <Input
                            value={formEdit.age}
                            onChange={(e) => setFormEdit({ ...formEdit, age: e.target.value })}
                            // label="Age"
                            type="number"
                            placeholder="Enter age"
                        />
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
                            Edit Teacher
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
