import { supabase } from "@/lib/supabase"; // atau prisma kalau masih pakai Prisma
import { NextResponse } from "next/server";

// GET /api/users/[id]
export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const teacherId = parseInt(idString || "")

    if (isNaN(teacherId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data: teacher, error } = await supabase
            .from("User")
            .select(`
                *,
                Role(name)
            `)
            .eq("id", Number(teacherId))
            .single();

        if (error) throw error;
        if (!teacher) return NextResponse.json({ error: "teacher not found" }, { status: 404 });

        return NextResponse.json(teacher, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch teacher" }, { status: 500 });
    }
}

// PUT /api/users/[id]
export async function PUT(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const teacherId = parseInt(idString || "")

    if (isNaN(teacherId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const body = await request.json();
        const { fullName, username, email, address, dateOfBirth, age, profile } = body;

        const { data: updatedteacher, error } = await supabase
            .from("User")
            .update({
                fullName,
                username,
                email,
                address,
                profile,
                dateOfBirth,
                age,
                updatedAt: new Date().toISOString(),
            })
            .eq("id", Number(teacherId))
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(updatedteacher, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update teacher" }, { status: 500 });
    }
}

// DELETE /api/users/[id]
export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const teacherId = parseInt(idString || "")

    if (isNaN(teacherId)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data, error } = await supabase
            .from("User")
            .delete()
            .eq("id", Number(teacherId));

        if (error) throw error;

        return NextResponse.json({ message: "teacher has been successfully deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete teacher" }, { status: 500 });
    }
}
