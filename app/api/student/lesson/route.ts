import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = session.user

        console.log("SESSION USER:", user)


        if (Number(user.roleId) !== 3) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const classroomId = Number(user.classroomId)

        console.log("CLASSROOM ID:", classroomId)

        if (!classroomId) {
            return NextResponse.json(
                { error: "Student belum memiliki classroomId di session" },
                { status: 400 }
            )
        }

        const lessons = await prisma.lesson.findMany({
            where: {
                classroomId: classroomId
            },
            include: {
                course: true,
                classroom: true
            }
        })

        return NextResponse.json(lessons)

    } catch (error: any) {
        console.error("ERROR LESSON API:", error)

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
