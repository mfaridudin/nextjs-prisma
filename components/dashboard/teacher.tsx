"use client"
import { useState } from "react"
import Button from "@/components/ui/button"
import { useEffect } from "react"
import Input from "../ui/input"
import Link from "next/link"
import Modal from "../ui/modal"
import { useOpenModal } from "@/store/useOpenModal"
import { useUserStore } from "@/store/useUserStore"

export default function Teacher({ url }: any) {
    const [showPassword, setShowPassword] = useState(false)
    const urls = url

    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()
    const { user } = useUserStore()

    const role = user?.role?.name

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

    const button = role !== "Student"
    const title = role !== "Student"
    const titleStudent = role === "Student"

    const [form, setForm] = useState(initialForm)

    const [loading, setLoading] = useState(false)
    const [teacher, setTeacher] = useState([])

    const [validation, setValidation] = useState<any>({});

    async function fetchTeacher() {
        try {
            const res = await fetch('/api/teacher')
            const data = await res.json()
            setTeacher(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTeacher()
    }, []);

    async function handleAddTeacher(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            ...form,
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : undefined,
            age: form.age ? Number(form.age) : undefined,
            roleId: 2,
            emailVerified: true,
        };

        console.log(payload)

        const response = await fetch("/api/teacher", {
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

        await fetchTeacher()
        setForm(initialForm)
        closeModal()
        setLoading(false)
    }

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/teacher/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });
            return;
        }
        await fetchTeacher()
        // 
        closeModal()
    }


    return (
        <>
            <div className="flex items-center justify-between mb-6">

                {title && (
                    <h1 className="text-3xl font-bold text-white">
                        Teachers Management
                    </h1>
                )}

                {titleStudent && (
                    <h1 className="text-3xl font-bold text-white">
                        All Teachers
                    </h1>)}

                {button && (
                    <button onClick={() => openAddModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                        Add Teacher
                    </button>
                )}
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Full Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Create Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {teacher.map((item: any, index: number) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.fullName}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.username}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.address}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.email}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <div className="flex space-x-2">
                                        <Link href={`${urls}/${item.id}/detail`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                        >
                                            View
                                        </Link>

                                        {button && (
                                            <button
                                                onClick={() => openDeleteModal(item.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {teacher.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-8 px-6 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Belum ada data
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal open={open && mode === "add"}
                onClose={closeModal}
                title="Add Teacher"
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleAddTeacher} className="p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value, })}
                            label="Full Name"
                            type="text"
                            placeholder="Enter full name"
                        />
                        <Input
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value, })}
                            label="Username"
                            type="text"
                            placeholder="Enter username"
                        />
                    </div>

                    <Input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                    />

                    <Input
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        label="Address"
                        type="text"
                        placeholder="Enter address"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            value={form.dateOfBirth}
                            onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                            label="Date of Birth"
                            type="date"
                            placeholder="Enter age"
                        />
                        <Input
                            value={form.age}
                            onChange={(e) => setForm({ ...form, age: e.target.value })}
                            label="Age"
                            type="number"
                            placeholder="Enter age"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                            <input
                                value={form.password_confirmation}
                                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
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

                    {/* Footer */}
                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            type="button"
                            variant="cancel"
                            onClick={() => closeModal()}
                        >
                            Cancelled
                        </Button>
                        <Button
                            type="submit"
                        >
                            Sumbit
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal open={open && mode === "delete"}
                onClose={closeModal}
                title="Delete Data"
                maxWidth="max-w-md">
                <div className="p-6">
                    <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this data?</p>
                    <div className="flex justify-end gap-3">
                        <Button onClick={() => closeModal()} variant="cancel" >
                            Cancelled
                        </Button>
                        <Button onClick={() => selectedId && handleDelete(selectedId)} variant="danger">
                            Yes, Delete
                        </Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}
