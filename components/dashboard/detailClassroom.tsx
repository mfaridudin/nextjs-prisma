"use client"
import { useEffect, useState } from "react";
import { useOpenModal } from "@/store/useOpenModal";
import Button from "../ui/button";
import Modal from "../ui/modal";
import Link from "next/link";
import { useParams } from "next/navigation";


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
    const [students, setStudents] = useState<Student[]>([])
    const [selected, setSelected] = useState<number[]>([])

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


    const [classroom, setClassroom] = useState<Classroom | null>(null)

    const { open, mode, openAddModal, closeModal } = useOpenModal()

    const params = useParams()
    const id = params?.id


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
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Classroom Detail
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Header gradien untuk highlight nama dan slug */}
                <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{classroom?.name}</h2>
                            <p className="text-indigo-100">@{classroom?.slug}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* Ubah ke 1 kolom karena hanya 1 field; sesuaikan jika menambah */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Teacher</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {classroom?.teacher?.fullName || "Not Assigned"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Number of Students</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{classroom?._count?.students || 0}</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* add student */}
            <div className="mt-8">
                <div className="flex items-center justify-between my-6">
                    <h1 className="text-2xl font-bold text-white">
                        List of Students
                    </h1>
                    <button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                        Add Student
                    </button>
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
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date of entry</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {classroom?.students?.map((item: any, index: number) => (
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
                                    {/* <td className="py-4 px-6 text-sm">
                                        <div className="flex space-x-2">
                                            <Link href={`${urls}/${item.id}/detail`}
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
                                    </td> */}
                                </tr>
                            ))}
                            {classroom?.students.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 px-6 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            No data yet
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={open && mode === "add"}
                onClose={closeModal}
                title="Add Students"
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {students.length === 0 && (
                        <p className="text-gray-500">No available students to add.</p>
                    )}
                    {students.length > 0 && (
                        <select
                            multiple
                            className="w-full h-48 border rounded p-2"
                            onChange={handleChange}
                        >
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.fullName} ({student.email})
                                </option>
                            ))}
                        </select>
                    )}

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
                            disabled={selected.length === 0}
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
