import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClassroomSchema } from "@/lib/validators/classroom"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")

    if (isNaN(id)) {
        return new Response(
            JSON.stringify({ message: "Invalid ID" }),
            { status: 400 }
        )
    }

    try {
        const { data: scorelist, error } = await supabase
            .from("LessonSubmission")
            .select(`
                id,
                lessonId,
                score,
                student:User (
                fullName,
                username,
                classroom:Classroom!User_classroomId_fkey (
                    name
                )
                ),
                createdAt
            `)
            .eq("lessonId", id);


        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }



        return NextResponse.json(scorelist, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch scorelist" },
            { status: 500 }
        )
    }
}
