import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //     return new Response(
    //         JSON.stringify({ message: "Unauthorized" }),
    //         { status: 401 }
    //     )
    // }

    const course = await prisma.course.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
        },
    })

    if (!course) {
        return new Response(
            JSON.stringify({ message: "Course not found" }),
            { status: 404 }
        )
    }

    return NextResponse.json(course)
}

export async function POST(request: Request) {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //     return new Response(
    //         JSON.stringify({ message: "Unauthorized" }),
    //         { status: 401 }
    //     )
    // }

    const body = await request.json()

    const newCourse = await prisma.course.create({
        data: {
            name: body.name,
        },
    })

    await prisma.user.update({
        where: { id: body.teacherId },
        data: {
            courseId: newCourse.id,
        },
    })



    return NextResponse.json({ course: newCourse, }, { status: 201 })
}