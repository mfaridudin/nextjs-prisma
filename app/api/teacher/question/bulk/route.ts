import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const questionsPayload = body.questions.map((q: any) => ({
            lessonId: Number(body.lessonId),
            question: q.question,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correct: q.correct,
        }));

        const { error } = await supabase
            .from("Question")
            .insert(questionsPayload);

        if (error) {
            return Response.json(
                { message: error.message },
                { status: 500 }
            );
        }


        return Response.json({ message: "Success" })
    } catch (err) {
        return Response.json(
            { message: "Failed" },
            { status: 500 }
        )
    }
}
