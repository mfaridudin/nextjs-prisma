import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = session.user

        console.log("SESSION USER:", user)

        const student = user


        if (Number(user.roleId) !== 3) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const classroomId = Number(user.classroomId)

        if (!classroomId) {
            return NextResponse.json(
                { error: "Student belum memiliki classroomId di session" },
                { status: 400 }
            )
        }

        const { data: lessons, error } = await supabase
            .from("Lesson")
            .select(`
                *,
                course:Course(*),
                classroom:Classroom(*),
                submissions:LessonSubmission!left(
                *
                )
            `)
            .eq("classroomId", classroomId)

        return NextResponse.json(lessons)

    } catch (error: any) {
        console.error("ERROR LESSON API:", error)

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
