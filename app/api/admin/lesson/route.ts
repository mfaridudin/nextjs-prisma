import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"


export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = Number(searchParams.get("courseId"))

    if (!courseId) {
        return NextResponse.json(
            { message: "courseId is required" },
            { status: 400 }
        )
    }

    const { data: lessons, error } = await supabase
        .from("Lesson")
        .select(`
    id,
    title,
    course:Course (
      id,
      name
    ),
    classroom:Classroom (
      id,
      name
    )
  `)
        .eq("courseId", courseId);


    return NextResponse.json(lessons)
}

export async function POST(req: Request) {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //     return new Response(
    //         JSON.stringify({ message: "Unauthorized" }),
    //         { status: 401 }
    //     )
    // }

    const body = await req.json()

    try {
        const { data: lesson, error } = await supabase
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

        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }


        return Response.json(lesson)

    } catch (error) {
        return Response.json({ message: "Failed to create lesson" }, { status: 500 })
    }
}
