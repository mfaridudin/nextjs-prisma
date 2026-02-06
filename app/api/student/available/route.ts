import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        const schoolId = Number(session?.user?.schoolId)

        if (!schoolId) {
            return NextResponse.json(
                { error: "schoolId is required" },
                { status: 400 }
            )
        }

        const teachers = await prisma.user.findMany({
            where: {
                roleId: 3,
                schoolId: schoolId,
                classroomId: null,
            },
            select: {
                id: true,
                fullName: true,
                username: true,
                email: true,
                schoolId: true,
            },

        })

        return NextResponse.json(teachers, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch available teachers" },
            { status: 500 }
        )
    }
}
