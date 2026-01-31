"use client"
import { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import DetailPage from "../ui/detailPage";

export default function DetailTeacher({ item, title, role }: any) {

    const roles = role

    const [loading, setLoading] = useState(false)
    const [teacherId, setTeacherId] = useState("")
    const [validation, setValidation] = useState("")
    const [formEdit, setFormEdit] = useState({
        fullName: item.fullName ?? "",
        username: item.username ?? "",
        address: item.address ?? "",
        email: item.email ?? "",
        age: item.age ? String(item.age) : "",
        dateOfBirth: item.dateOfBirth
            ? new Date(item.dateOfBirth).toISOString().split("T")[0]
            : "",
    });
    const [modalEdit, setModalEdit] = useState(false)

    async function fetchTeacher() {
        try {
            const res = await fetch('/api/teacher')
            const data = await res.json()
            // setStudents(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function hadleEditTeacher(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            ...formEdit,
            dateOfBirth: formEdit.dateOfBirth ? new Date(formEdit.dateOfBirth).toISOString() : undefined,
            age: formEdit.age ? Number(formEdit.age) : undefined,
            roleId: 3,
            emailVerified: true,
        };

        const response = await fetch(`/api/teacher/${teacherId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const data = await response.json();
            setValidation(data.errors || { error: data.error });
            console.log(data.errors || { error: data.error })
            return;
        }
        fetchTeacher()
        setModalEdit(false)
    }


    return (
        <>
            <DetailPage
                title={title}
                data={item}
                editLabel="Edit Teacher"
                role={roles}
                onEdit={() => {
                    setModalEdit(true)
                    setTeacherId(item.id)
                }} />

            {modalEdit && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl transform transition-all duration-300 scale-100">
                        {/* header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add Student</h2>
                            <button
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
                                onClick={() => { setModalEdit(false) }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* form */}
                        <form onSubmit={hadleEditTeacher} className="p-6 space-y-4">

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={formEdit.fullName}
                                    onChange={(e) => setFormEdit({ ...formEdit, fullName: e.target.value, })}
                                    label="Full Name"
                                    type="text"
                                    placeholder="Enter full name"
                                />
                                <Input
                                    value={formEdit.username}
                                    onChange={(e) => setFormEdit({ ...formEdit, username: e.target.value, })}
                                    label="Username"
                                    type="text"
                                    placeholder="Enter username"
                                />
                            </div>

                            <Input
                                value={formEdit.email}
                                onChange={(e) => setFormEdit({ ...formEdit, email: e.target.value })}
                                label="Email"
                                type="email"
                                placeholder="Enter email"
                            />

                            <Input
                                value={formEdit.address}
                                onChange={(e) => setFormEdit({ ...formEdit, address: e.target.value })}
                                label="Address"
                                type="text"
                                placeholder="Enter address"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={formEdit.dateOfBirth}
                                    onChange={(e) => setFormEdit({ ...formEdit, dateOfBirth: e.target.value })}
                                    label="Date of Birth"
                                    type="date"
                                    placeholder="Enter age"
                                />
                                <Input
                                    value={formEdit.age}
                                    onChange={(e) => setFormEdit({ ...formEdit, age: e.target.value })}
                                    label="Age"
                                    type="number"
                                    placeholder="Enter age"
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
                                    onClick={() => { setModalEdit(false) }}
                                >
                                    Cancel
                                </Button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
