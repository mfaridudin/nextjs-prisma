import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { data: question, error } = await supabase
            .from("Question")
            .insert({
                question: body.question,
                optionA: body.optionA,
                optionB: body.optionB,
                optionC: body.optionC,
                optionD: body.optionD,
                correct: body.correct,
                lessonId: Number(body.lessonId),
            })
            .select()
            .single();

        if (error) {
            return Response.json(
                { message: error.message },
                { status: 500 }
            );
        }

        return Response.json(question, { status: 201 });


    } catch (error) {
        return Response.json(
            { message: "Failed to create question" },
            { status: 500 }
        )
    }
}