import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const question = await prisma.question.create({
            data: {
                question: body.question,
                optionA: body.optionA,
                optionB: body.optionB,
                optionC: body.optionC,
                optionD: body.optionD,
                correct: body.correct,
                lessonId: Number(body.lessonId)
            }
        })

        return Response.json(question)

    } catch (error) {
        return Response.json(
            { message: "Failed to create question" },
            { status: 500 }
        )
    }
}