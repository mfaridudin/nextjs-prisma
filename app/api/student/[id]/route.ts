import { supabase } from "@/lib/supabase"; // atau prisma kalau masih pakai Prisma
import { NextResponse } from "next/server";

// GET /api/users/[id]
export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const studentId = parseInt(idString || "")

    if (isNaN(studentId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data: student, error } = await supabase
            .from("User")
            .select(`
                *,
                Role(name)
            `)
            .eq("id", Number(studentId))
            .single();

        if (error) throw error;
        if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

        return NextResponse.json(student, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch student" }, { status: 500 });
    }
}

// PUT /api/users/[id]
export async function PUT(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const studentId = parseInt(idString || "")

    if (isNaN(studentId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const body = await request.json();
        const { fullName, username, email, address, dateOfBirth, age } = body;

        const { data: updatedStudent, error } = await supabase
            .from("User")
            .update({
                fullName,
                username,
                email,
                address,
                dateOfBirth,
                age,
                updatedAt: new Date().toISOString(),
            })
            .eq("id", Number(studentId))
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update student" }, { status: 500 });
    }
}

// DELETE /api/users/[id]
export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const studentId = parseInt(idString || "")

    if (isNaN(studentId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data, error } = await supabase
            .from("User")
            .delete()
            .eq("id", Number(studentId));

        if (error) throw error;

        return NextResponse.json({ message: "Student has been successfully deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete student" }, { status: 500 });
    }
}
