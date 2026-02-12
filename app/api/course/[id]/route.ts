import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth"

import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")


    if (isNaN(id)) {
        return new Response(
            JSON.stringify({ message: "Invalid ID" }),
            { status: 400 }
        )
    }

    try {
        const { data: course, error } = await supabase
            .from("Course")
            .select(`
                id,
                name,
                createdAt,
                teachers:User (
                id,
                fullName,
                email,
                username
                )
            `)
            .eq("id", id)
            .single();


        if (!course) {
            return new Response(
                JSON.stringify({ message: "Course not found" }),
                { status: 404 }
            )
        }

        return NextResponse.json(course)
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request
) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")

    if (isNaN(id)) {
        return new Response(
            JSON.stringify({ message: "Invalid ID" }),
            { status: 400 }
        )
    }
    try {
        const { error } = await supabase
            .from("Course")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Course deleted successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to delete Course" },
            { status: 500 }
        )
    }
}