"use client"

import { useState } from "react"
import Button from "@/components/ui/button"
import { useEffect } from "react"
import Input from "../ui/input"
import Link from "next/link"
import Modal from "../ui/modal"
import slugify from "slugify"
import { useOpenModal } from "@/store/useOpenModal"
import { useUserStore } from "@/store/useUserStore"


export default function Classroom() {

    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()
    const { user } = useUserStore()

    const role = user?.role?.name

    const schoolId = user?.schoolId

    const initialForm = {
        name: "",
        teacherId: "",
    }

    const button = role !== "Student"
    const title = role !== "Student"
    const titleStudent = role === "Student"

    const [form, setForm] = useState(initialForm)

    const [loading, setLoading] = useState(false)
    const [classroom, setClassroom] = useState([])
    const [teachers, setTeachers] = useState([])

    const [validation, setValidation] = useState<any>({});

    async function fetchClassroom() {
        try {
            const res = await fetch('/api/classroom')
            const data = await res.json()
            setClassroom(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function fetchTeacher() {
        try {
            const res = await fetch('/api/teacher')
            const data = await res.json()
            setTeachers(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchClassroom()
        fetchTeacher()
    }, []);

    async function handleAddClassroom(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const generateSlug = slugify(form.name, {
            lower: true,
            strict: true,
        })

        const payload = {
            ...form,
            slug: generateSlug,
            schoolId: schoolId,
            teacherId: Number(form.teacherId),
        };

        console.log(payload)

        const response = await fetch("/api/classroom", {
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

        await fetchClassroom()
        setForm(initialForm)
        closeModal()
        setLoading(false)
    }

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/classroom/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });
            return;
        }
        await fetchClassroom()
        // 
        closeModal()
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">


                <h1 className="text-3xl font-bold text-white">
                    Classrooms Management
                </h1>


                {/* {titleStudent && (
                    <h1 className="text-3xl font-bold text-white">
                        All Teachers
                    </h1>
                )} */}


                <button onClick={() => openAddModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                    Add Classroom
                </button>

            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Slug</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Homeroom Teacher</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Create Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {classroom.map((item: any, index: number) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.slug}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.teacher.fullName}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="py-4 px-6 text-sm">
                                    <div className="flex space-x-2">
                                        <Link href={`classrooms/${item.id}/detail`}
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
                        {classroom.length === 0 && (
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
                title="Add Classroom"
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleAddClassroom} className="p-6 space-y-4">

                    <Input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        label="Classroom Name"
                        type="text"
                        placeholder="Enter clasroom name"
                    />

                    {/* <Input
                        value={form.teacherName}
                        onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                        label="Homeroom Teacher"
                        type="text"
                        placeholder="Enter homeroom teacher name"
                    /> */}



                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Teacher </label>
                        <div className="relative">
                            <select
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                name="teacherId"
                                id="teacherId"
                                value={form.teacherId}
                                onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map((teacher: any) => (
                                    <option key={teacher.id} value={teacher.id}>{teacher.fullName}</option>
                                ))}
                            </select>
                            <span
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </div>
                        {validation && (validation?.age?.[0])}
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

        </>
    )
}
