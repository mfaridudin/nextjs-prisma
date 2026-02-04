import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    const body = await req.json()

    try {
        await prisma.question.createMany({
            data: body.questions.map((q: any) => ({
                lessonId: Number(body.lessonId),
                question: q.question,
                optionA: q.optionA,
                optionB: q.optionB,
                optionC: q.optionC,
                optionD: q.optionD,
                correct: q.correct
            }))
        })

        return Response.json({ message: "Success" })
    } catch (err) {
        return Response.json(
            { message: "Failed" },
            { status: 500 }
        )
    }
}
