import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth/next"


export async function GET(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return new Response(
            JSON.stringify({ message: "Unauthorized" }),
            { status: 401 }
        )
    }

    const { data: lessons, error } = await supabase
        .from("Lesson")
        .select(`
            *,
            course:Course (*),
            classroom:Classroom (*)
        `)
        .eq("teacherId", Number(session.user.id));

    if (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }


    return Response.json(lessons)


}


export async function POST(req: Request) {
    const body = await req.json()

    try {
        const { data: lesson, error: lessonError } = await supabase
            .from("Lesson")
            .insert({
                title: body.title,
                description: body.description,
                teacherId: body.teacherId,
                courseId: body.courseId,
                classroomId: body.classroomId,
            })
            .select()
            .single();

        if (lessonError) {
            return Response.json(
                { message: lessonError.message },
                { status: 500 }
            );
        }

        return Response.json(lesson)

    } catch (error) {
        return Response.json({ message: "Failed to create lesson" }, { status: 500 })
    }
}
