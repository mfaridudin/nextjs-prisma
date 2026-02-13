import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { studentId, lessonId, answers } = body

        const { data: existing, error } = await supabase
            .from("LessonSubmission")
            .select("*")
            .eq("studentId", studentId)
            .eq("lessonId", lessonId)
            .maybeSingle()

        if (error) throw error


        if (existing) {
            return NextResponse.json(
                { message: "You already submitted this lesson" },
                { status: 400 }
            )
        }

        const { data: questions, error: erorQuestion } = await supabase
            .from("Question")
            .select("*")
            .eq("lessonId", lessonId)

        if (erorQuestion) throw erorQuestion


        let correctCount = 0

        const answerData = answers.map((a: any) => {
            const question = questions.find(q => q.id === a.questionId)

            const isCorrect = question?.correct === a.answer

            if (isCorrect) correctCount++

            return {
                questionId: a.questionId,
                answer: a.answer,
                isCorrect
            }
        })

        const score = Math.round(
            (correctCount / questions.length) * 100
        )

        const { data: submission, error: erorSubmission } = await supabase
            .from("LessonSubmission")
            .insert([
                {
                    studentId,
                    lessonId,
                    score,
                    answers: answerData
                }
            ])
            .select()
            .single()

        if (erorSubmission) throw erorSubmission


        return NextResponse.json(submission)

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit" },
            { status: 500 }
        )
    }
}
