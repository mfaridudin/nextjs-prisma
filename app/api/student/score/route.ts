import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = session.user
    const studentId = user.id


    const scores = await prisma.lessonSubmission.findMany({
        where: {
            studentId: Number(studentId)
        },
        select: {
            score: true
        }
    })


    return NextResponse.json( scores , { status: 200 })
}
