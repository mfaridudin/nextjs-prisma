import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
        const classroom = await prisma.classroom.findUnique({
            where: { id: classroomId },
            select: {
                id: true,
                name: true,
                slug: true,
                schoolId: true,
                teacherId: true,
                teacher: {
                    select: { fullName: true },
                },
                students: {
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        address: true,
                        email: true,
                        createdAt: true,
                    },
                },
                _count: {
                    select: { students: true },
                },
                school: {
                    select: { name: true },
                },
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!classroom) {
            return NextResponse.json(
                { error: "Classroom not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(classroom, { status: 200 })
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
        const updatedClassroom = await prisma.classroom.update({
            where: { id: classroomId },
            data: {
                name: body.name,
                slug: body.slug,
                teacherId: body.teacherId,
            },
        })

        return NextResponse.json(updatedClassroom, { status: 200 })
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
        await prisma.classroom.delete({
            where: { id: classroomId },
        })

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
