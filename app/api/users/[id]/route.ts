import { supabase } from "@/lib/supabase"; // atau prisma, tergantung mau pakai Supabase
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
}

export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()
    const id = idString;

    if (!id) return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    try {
        const { data: user, error } = await supabase
            .from("User")
            .select("*")
            .eq("id", Number(id))
            .single();

        if (error) throw error;

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch user" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()
    const id = idString;
    if (!id) return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    try {
        const body = await request.json();
        const { fullName, username, email, password, address, dateOfBirth, age, roleId } = body;

        let hashedPassword: string | undefined;
        if (password) hashedPassword = await bcrypt.hash(password, 10);

        const { data: updatedUser, error } = await supabase
            .from("User")
            .update({
                fullName,
                username,
                email,
                password: hashedPassword,
                address,
                dateOfBirth,
                age,
                roleId,
                updatedAt: new Date().toISOString(),
            })
            .eq("id", Number(id))
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update user" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()
    const id = idString;
    if (!id) return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });

    try {
        const { data, error } = await supabase.from("User").delete().eq("id", Number(id));

        if (error) throw error;

        return NextResponse.json({ message: "User has been successfully deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to delete user" }, { status: 500 });
    }
}
