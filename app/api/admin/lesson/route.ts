import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
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

    const lessons = await prisma.lesson.findMany({
        where: { courseId },
        include: {
            course: true,
            classroom: true,
        },
    })

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
        const lesson = await prisma.lesson.create({
            data: {
                title: body.title,
                description: body.description,
                teacherId: body.teacherId,
                courseId: body.courseId,
                classroomId: body.classroomId,

                // questions: {
                //     create: body.questions.map((q: any) => ({
                //         question: q.question,
                //         optionA: q.optionA,
                //         optionB: q.optionB,
                //         optionC: q.optionC,
                //         optionD: q.optionD,
                //         correct: q.correct
                //     }))
                // }
            }
        })

        return Response.json(lesson)

    } catch (error) {
        return Response.json({ message: "Failed to create lesson" }, { status: 500 })
    }
}
