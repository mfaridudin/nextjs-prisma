import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClassroomSchema } from "@/lib/validators/classroom"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
        const scorelist = await prisma.lessonSubmission.findMany({
            where: { lessonId: id },
            include: {
                student: {  
                    select: {
                        fullName: true,
                        username: true,
                        classroom: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })


        return NextResponse.json(scorelist, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch scorelist" },
            { status: 500 }
        )
    }
}
