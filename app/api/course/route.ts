import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = session.user

    if (Number(user.roleId) === 1) {
        const courses = await prisma.course.findMany()
        return NextResponse.json(courses)
    }

    if (Number(user.roleId) === 2) {
        const courses = await prisma.course.findMany({
            where: {
                teachers: {
                    some: {
                        id: Number(user.id),
                    },
                },
            },
        })
        return NextResponse.json(courses)
    }

    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
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