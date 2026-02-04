import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { studentId, lessonId, answers } = body

        const existing = await prisma.lessonSubmission.findFirst({
            where: {
                studentId,
                lessonId
            }
        })

        if (existing) {
            return NextResponse.json(
                { message: "You already submitted this lesson" },
                { status: 400 }
            )
        }

        const questions = await prisma.question.findMany({
            where: { lessonId }
        })

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

        const submission = await prisma.lessonSubmission.create({
            data: {
                studentId,
                lessonId,
                score,
                answers: {
                    create: answerData
                }
            }
        })

        return NextResponse.json(submission)

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit" },
            { status: 500 }
        )
    }
}
