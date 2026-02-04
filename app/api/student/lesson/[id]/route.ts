import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = session.user

        const studentId = Number(user.id)

        const url = new URL(request.url)
        const idString = url.pathname.split("/").pop()

        const lessonId = parseInt(idString || "")

        if (isNaN(lessonId)) {
            return NextResponse.json(
                { error: "Invalid lesson ID" },
                { status: 400 }
            )
        }

        const lesson = await prisma.lesson.findUnique({
            where: {
                id: lessonId
            },
            include: {
                questions: {
                    select: {
                        id: true,
                        question: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true
                    }
                },
                submissions: {
                    where: {
                        studentId: studentId
                    },
                    select: {
                        id: true,
                        score: true
                    }
                }
            }
        })

        if (!lesson) {
            return NextResponse.json(
                { error: "Lesson not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(lesson)

    } catch (error: any) {
        console.error("ERROR DETAIL:", error)

        return NextResponse.json(
            {
                error: error.message,
                detail: error.toString()
            },
            { status: 500 }
        )
    }
}
