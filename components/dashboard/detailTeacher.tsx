"use client"
import { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import DetailPage from "../ui/detailPage";
import Modal from "../ui/modal";
import { useOpenModal } from "@/store/useOpenModal";

export default function DetailTeacher({ item, title, id }: any) {

    const { open, mode, selectedId, openEditModal, closeModal } = useOpenModal()

    const [teacher, setTeacher] = useState(item)
    const [loading, setLoading] = useState(false)
    const [validation, setValidation] = useState("")
    const [formEdit, setFormEdit] = useState({
        fullName: teacher.fullName ?? "",
        username: teacher.username ?? "",
        address: teacher.address ?? "",
        email: teacher.email ?? "",
        age: teacher.age ? String(teacher.age) : "",
        dateOfBirth: teacher.dateOfBirth
            ? new Date(teacher.dateOfBirth).toISOString().split("T")[0]
            : "",
    });

    async function fetchTeacher() {
        try {
            const res = await fetch(`/api/teacher/${id}`)
            const data = await res.json()
            setTeacher(data)
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

        const response = await fetch(`/api/teacher/${selectedId}`, {
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
        await fetchTeacher()
        closeModal()
    }

    return (
        <>
            <DetailPage
                title={title}
                data={teacher}
                editLabel="Edit Teacher"
                onEdit={() =>
                    openEditModal(teacher.id)
                } />

            <Modal title="Edit Teacher" open={open && mode === "edit"} onClose={() => closeModal()} maxWidth="max-w-xl">
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
                            variant="cancel"
                            onClick={() => closeModal()}
                        >
                            Cancelled
                        </Button>
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal >
        </>
    )
}
