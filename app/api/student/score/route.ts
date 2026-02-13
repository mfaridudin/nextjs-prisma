import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = session.user
    const studentId = Number(user.id)

    const { data: scores } = await supabase
        .from("LessonSubmission")
        .select("score")    
        .eq("studentId", studentId)

    return NextResponse.json(scores, { status: 200 })
}
