import { prisma } from "@/lib/prisma"

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
        const lesson = await prisma.lesson.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                course: true,
                classroom: true,
                teacher: true,
                questions: true
            },
        })

        if (!lesson) {
            return new Response(
                JSON.stringify({ message: "Lesson not found" }),
                { status: 404 }
            )
        }

        return NextResponse.json(lesson)
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        )
    }
}


export async function DELETE(request: Request) {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //     return new Response(
    //         JSON.stringify({ message: "Unauthorized" }),
    //         { status: 401 }
    //     )
    // }

    const body = await request.json()

    const deletedCourse = await prisma.course.delete({
        where: {
            id: body.id,
        }
    })

    return NextResponse.json(deletedCourse, { status: 201 })
}