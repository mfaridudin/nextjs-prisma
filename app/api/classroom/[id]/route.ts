import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const classroomId = Number(id)

    if (isNaN(classroomId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    try {
        const { data, error } = await supabase
            .from("Classroom")
            .select(`
                id,
                name,
                slug,
                schoolId,
                teacherId,
                createdAt,
                updatedAt,

                teacher:User!Classroom_teacherId_fkey (
                fullName
                ),

                students:User!User_classroomId_fkey (
                id,
                fullName,
                username,
                address,
                email,
                createdAt
                ),

                school:School!Classroom_schoolId_fkey (
                name
                )
            `)
            .eq("id", classroomId)
            .single();


        if (!data) {
            return NextResponse.json(
                { error: "Classroom not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch classroom" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const classroomId = Number(id)

    if (isNaN(classroomId)) {
        return NextResponse.json(
            { error: "Invalid classroom ID" },
            { status: 400 }
        )
    }

    const body = await request.json()

    try {
        const { data, error } = await supabase
            .from("Classroom")
            .update({
                name: body.name,
                slug: body.slug,
                teacherId: body.teacherId,
            })
            .eq("id", classroomId)
            .select()
            .single();


        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to update classroom" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const classroomId = Number(id)

    if (isNaN(classroomId)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 })
    }

    try {
        const { error } = await supabase
            .from("Classroom")
            .delete()
            .eq("id", classroomId);

        if (error) {
            throw new Error(error.message);
        }


        return NextResponse.json(
            { message: "Classroom deleted successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to delete classroom" },
            { status: 500 }
        )
    }
}
