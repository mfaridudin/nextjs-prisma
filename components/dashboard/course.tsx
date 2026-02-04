"use client"
import Link from "next/link"
import Input from "../ui/input"
import Button from "../ui/button"
import Modal from "../ui/modal"
import { useEffect, useState } from "react"
import { useOpenModal } from "@/store/useOpenModal"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useUserStore"

export default function Course({ courses }: any) {

    const [name, setName] = useState("")
    const { open, mode, selectedId, openAddModal, openDeleteModal, closeModal } = useOpenModal()
    const { user } = useUserStore()
    const router = useRouter()
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null)
    const [teachers, setTeachers] = useState<any[]>([])

    const role = user?.role?.name

    const buttonDisabled = role !== "Teacher" && role !== "Student"

    async function fetchTeacher() {
        try {
            const res = await fetch('/api/teacher/available')
            const data = await res.json()
            setTeachers(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchTeacher()
    }, [])

    const handleAddCourse = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await fetch('/api/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, teacherId: selectedTeacher }),
        })

        if (response.ok) {
            closeModal()
        } else {
            console.error('Failed to add course')
        }
        setName("")
        router.refresh()
    }

    console.log(courses);

    async function handleDelete(id: string | number) {
        const response = await fetch(`/api/course/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.errors || { error: data.error });
            return;
        }
        router.refresh()
        closeModal()
    }
    console.log(courses);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">
                    Courses Management
                </h1>
                {buttonDisabled && (
                    <button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                        Add Course
                    </button>
                )}
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Create</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {courses.map((item: any, index: number) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.name}</td>
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
                                        <Link href={`course/${item.id}/detail`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                        >
                                            View
                                        </Link>
                                        {buttonDisabled && (
                                            <button onClick={() => openDeleteModal(item.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>

                        ))}
                        {courses.length === 0 && (
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
                title="Add Student"
                maxWidth="max-w-xl">

                <form onSubmit={handleAddCourse} className="p-6 space-y-4">


                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Course Name"
                        type="text"
                        placeholder="Enter course name"
                    />

                    {/* <select
                        className="w-full border rounded p-2"
                        value={selectedTeacher ?? ""}
                        onChange={(e) => setSelectedTeacher(Number(e.target.value))}
                    >
                        <option value="" disabled>
                            -- Select Teacher --
                        </option>

                        {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.fullName} ({teacher.email})
                            </option>
                        ))}
                    </select> */}

                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Teacher </label>
                        <div className="relative">
                            {teachers.length === 0 && (
                                <option disabled>No teacher available</option>
                            )}

                            {teachers.length > 0 && (
                                <select
                                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
                                    name="teacherId"
                                    id="teacherId"
                                    value={selectedTeacher ?? ""}
                                    onChange={(e) => setSelectedTeacher(Number(e.target.value))}
                                >
                                    <option value="">Select Teacher</option>
                                    {teachers.map((teacher: any) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.fullName}
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


                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            type="button"
                            variant="cancel"
                            onClick={() => {
                                closeModal()
                                setName("")
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            Add Course
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
