import { supabase } from "@/lib/supabase"; // atau prisma kalau masih pakai Prisma
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data: admin, error } = await supabase
            .from("User")
            .select(`
                *,
                Role(name),
                Course(name)
            `)
            .eq("id", Number(id))
            .single();

        if (error) throw error;
        if (!admin) return NextResponse.json({ error: "admin not found" }, { status: 404 });

        return NextResponse.json(admin, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch admin" }, { status: 500 });
    }
}

export async function PUT(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const body = await request.json();
        const { fullName, username, email, address, dateOfBirth, age, profile } = body;

        const { data: updatedadmin, error } = await supabase
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
            .eq("id", Number(id))
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(updatedadmin, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update admin" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")

    if (isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid lesson ID" },
            { status: 400 }
        )
    }

    try {
        const { data, error } = await supabase
            .from("User")
            .delete()
            .eq("id", Number(id));

        if (error) throw error;

        return NextResponse.json({ message: "admin has been successfully deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete admin" }, { status: 500 });
    }
}
