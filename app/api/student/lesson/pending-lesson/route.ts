import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Select } from "@mui/material"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = session.user

        const student = user

        const studentId = Number(student.id)

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

        const pendingLessons = await prisma.lesson.findMany({
            where: {
                classroomId: classroomId,
                submissions: {
                    none: {
                        studentId: studentId,
                    },
                },
            },
            include: {
                course: {
                    select: {
                        name: true,
                    },
                },
                classroom: {
                    select: {
                        name: true,
                    },
                },
            },
        });




        return NextResponse.json(pendingLessons)

    } catch (error: any) {
        console.error("ERROR LESSON API:", error)

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
