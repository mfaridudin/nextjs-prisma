import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClassroomSchema } from "@/lib/validators/classroom"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    const session = await getServerSession(authOptions)
    // const session = await getServerSession(authOptions)
    console.log(session)


    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const schoolId = session.user.schoolId

    // if (!schoolId) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    // }

    try {
        const classrooms = await prisma.classroom.findMany({
            where: { schoolId },
            select: {
                id: true,
                name: true,
                slug: true,
                schoolId: true,
                teacherId: true,
                teacher: {
                    select: { fullName: true },
                },
                school: {
                    select: { name: true },
                },
                createdAt: true,
                updatedAt: true,
            },
        })

        return NextResponse.json(classrooms, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch classrooms" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const result = createClassroomSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    try {
        const { name, slug, teacherId } = result.data

        const classroom = await prisma.classroom.create({
            data: {
                name,
                slug,
                teacherId,
                schoolId: session.user.schoolId,
            },
        })

        return NextResponse.json({ classroom }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.message || "Failed to create classroom" },
            { status: 500 }
        )
    }
}

