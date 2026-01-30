"use client"
import { useState } from "react"
import Button from "@/components/ui/button"
import { useEffect } from "react"

export default function Dashboard() {
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        address: "",
        dateOfBirth: "",
        age: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [editForm, setEditForm] = useState({
        fullName: "",
        username: "",
        address: "",
        dateOfBirth: "",
        age: "",
        email: "",
    });
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const [modal, setModal] = useState(false)
    const [validation, setValidation] = useState<any>({});
    const [studentId, setStudentId] = useState("")
    const [editFullName, setEditFullName] = useState("")



    useEffect(() => {
        fetch('/api/teacher')
            .then((res) => res.json())
            .then((data) => setStudents(data));

    }, []);

    async function handleAddStudent(e: React.FormEvent) {
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
        setLoading(false)
    }

    async function hadleEditStudent(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true)

        const payload = {
            ...editForm,
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : undefined,
            age: form.age ? Number(form.age) : undefined,
            roleId: 2,
            emailVerified: true,
        };

        const response = await fetch(`/api/teacher/${studentId}`, {
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
    }


    return (
        <div>
            <div>
                <h1>buat student</h1>
                <form onSubmit={handleAddStudent}>
                    <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} type="text" placeholder="nama" />
                    <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" placeholder="userName" />
                    <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} type="text" placeholder="alamat" />
                    <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} type="number" placeholder="umur" />
                    <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} placeholder="tanggal lahir" />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tanggal lahir" />
                    <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="email" />
                    <input type="password" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} placeholder="password" />
                    <button type="submit">
                        submit
                    </button>
                </form>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">Full Name</th>
                        <th className="py-2 px-4 border-b">Useraame</th>
                        <th className="py-2 px-4 border-b">alamat</th>
                        <th className="py-2 px-4 border-b">tanggal buat</th>
                        <th className="py-2 px-4 border-b">Aksi</th>
                    </tr>
                </thead>
                <tbody>

                    {students.map((item: any, index: any) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                            <td className="py-2 px-4 border-b text-center">{item.fullName}</td>
                            <td className="py-2 px-4 border-b text-center">{item.username}</td>
                            <td className="py-2 px-4 border-b text-center">{item.addres}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <Button onClick={() => {
                                    setStudentId(item.id)
                                    setEditForm({
                                        fullName: item.fullName,
                                        username: item.username,
                                        address: item.address,
                                        dateOfBirth: item.dateOfBirth ? new Date(item.dateOfBirth).toISOString().slice(0, 10) : "",
                                        age: item.age ? item.age.toString() : "",
                                        email: item.email
                                    })
                                    setModal(true)
                                }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    {"Edit"}
                                </Button>

                                <Button onClick={() => {
                                    // setStudentId(item.id)
                                    handleDelete(item.id)
                                }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    {"Hapus"}
                                </Button>
                            </td>
                        </tr>
                    ))}

                    {students.length === 0 && (
                        <tr className="hover:bg-gray-50">
                            <td colSpan={4} className="py-2 px-4 border-b text-center">Belum ada data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {modal && (
                <form onSubmit={hadleEditStudent}>
                    <input value={editForm.fullName} onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })} type="text" placeholder="nama" />
                    <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} type="text" placeholder="userName" />
                    <input value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} type="text" placeholder="alamat" />
                    <input value={editForm.age} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} type="number" placeholder="umur" />
                    <input type="date" value={editForm.dateOfBirth} onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })} placeholder="tanggal lahir" />
                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="tanggal lahir" />
                    <button type="submit">
                        submit
                    </button>
                    <button type="button" className="ml-10" onClick={() => setModal(false)}>kil</button>
                </form>
            )}

        </div>
    )
}
