import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
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
        const course = await prisma.course.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                createdAt: true,
                teachers: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        username: true,
                    }
                },
            },
        })

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