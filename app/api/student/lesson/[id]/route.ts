import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

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

        const { data: lesson, error } = await supabase
            .from("Lesson")
            .select(`
                id,
                title,
                description,
                questions:Question(
                id,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                correct
                ),
                submissions:LessonSubmission(
                id,
                studentId,
                answers,
                score
                )
            `)
            .eq("id", lessonId)
            .single()

        if (error) throw error

        const formattedLesson = {
            ...lesson,
            submissions: lesson.submissions.filter(
                (s) => s.studentId === studentId
            )
        }


        if (!lesson) {
            return NextResponse.json(
                { error: "Lesson not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(formattedLesson)

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
