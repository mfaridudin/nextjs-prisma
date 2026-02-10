"use client"

import { useOpenModal } from "@/store/useOpenModal"
import { useUserStore } from "@/store/useUserStore"
import Modal from "../ui/modal"
import { useEffect, useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import Link from "next/link"

export default function DetailCourse({ data, id }: any) {
    const { user } = useUserStore()

    const courseId = Number(id)


    const teacherId = data?.teachers[0]?.id

    const role = user?.role?.name

    const addLesson = role === "Admin"

    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()

    const initialForm = {
        title: "",
        description: "",
    }

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])
    const [teacher, setTeacher] = useState<any[]>([])
    const [validation, setValidation] = useState<any>({});
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(null);
    const [classrooms, setClassrooms] = useState<any[]>([])

    async function fetchLesson() {
        try {
            const res = await fetch(`/api/admin/lesson?courseId=${courseId}`)
            const data = await res.json()

            setLessons(Array.isArray(data) ? data : [])

        } catch (err) {
            console.error(err)
            setLessons([])
        }
    }

    async function fetchClassrooms() {
        try {
            const res = await fetch('/api/classroom')
            const data = await res.json()
            setClassrooms(Array.isArray(data) ? data : [])
        } catch {
            setClassrooms([])
        }
    }
    useEffect(() => {
        fetchLesson()
        fetchClassrooms()
    }, []);

    async function handleAddLesson(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        if (!selectedClassroom) {
            alert("Classroom must be selected !");
            return;
        }

        const payload = {
            title: form.title,
            description: form.description,
            courseId: courseId,
            classroomId: selectedClassroom,
            teacherId: teacherId
        };

        if (!teacherId) {
            alert("Teacher not assigned to this course")
            return
        }

        if (!courseId) {
            alert("Invalid course")
            return
        }

        console.log(payload)

        const response = await fetch("/api/teacher/lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            setLoading(false)
            return;
        }

        await fetchLesson()

        setLoading(false)
        setForm(initialForm)
        closeModal()
    }

    async function handleDeleteLesson(id: string | number) {
        const response = await fetch(`/api/teacher/lesson/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error });
            return;
        }
        await fetchLesson()
        closeModal()
    }


    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Detail Course
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{data?.name}</h2>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* Ubah ke 1 kolom karena hanya 1 field; sesuaikan jika menambah */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Teacher</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {data?.teachers[0]?.fullName || "Not Assigned"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Number of Students</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{data?._count?.students || 0}</p>
                        </div>

                    </div>
                </div>
            </div>

            {addLesson && (
                <>
                    <div className="flex items-center justify-between my-8">
                        <h1 className="text-3xl font-bold text-white">
                            Lesson
                        </h1>
                        <button onClick={() => openAddModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                            Add Lesson
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Classroom</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Create Date</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {lessons.map((item: any, index: number) => (
                                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.title}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.description}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.classroom?.name || "N/A"}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.course?.name || "N/A"}</td>
                                        <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                minute: '2-digit',
                                                hour: '2-digit',
                                            })}
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <div className="flex space-x-2">
                                                <Link href={`/dashboard/admin/lesson/${item.id}/detail`}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        openDeleteModal(item.id)
                                                    }}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {lessons.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="py-8 px-6 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                No lessons found.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Modal
                        open={open && mode === "add"}
                        onClose={closeModal}
                        title="Add Lesson"
                        maxWidth="max-w-xl"
                    >
                        <form onSubmit={handleAddLesson} className="p-6 space-y-4">

                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                label="Title"
                                type="text"
                                placeholder="Enter lesson title"
                            />

                            <Input
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                label="Description"
                                type="text"
                                placeholder="Enter description"
                            />

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Classroom </label>
                                <div className="relative">
                                    {classrooms.length === 0 && (
                                        <option disabled>No classroom available</option>
                                    )}

                                    {classrooms.length > 0 && (
                                        <select
                                            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                            name="classroomId"
                                            id="classroomId"
                                            value={selectedClassroom ?? ""}
                                            onChange={(e) => setSelectedClassroom(Number(e.target.value))}
                                        >
                                            <option value="">Select Classroom</option>
                                            {classrooms.map((classroom: any) => (
                                                <option key={classroom.id} value={classroom.id}>
                                                    {classroom.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    <span
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <Button type="button" variant="cancel" onClick={closeModal}>
                                    Cancel
                                </Button>

                                <Button type="submit">
                                    {loading ? "Saving..." : "Add Lesson"}
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
                                <Button onClick={() => selectedId && handleDeleteLesson(selectedId)} variant="danger">
                                    Yes, Delete
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </>
    )
}
