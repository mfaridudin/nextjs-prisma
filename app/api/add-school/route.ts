import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createSchoolSchema } from "@/lib/validators/school"


export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = parseInt(session.user.id)

    const school = await prisma.school.findMany({
        where: {
            user: {
                some: { id: userId }
            }
        }
    })

    return NextResponse.json({ school }, { status: 200 })
}


export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = Number(session.user.id)

    const body = await request.json()
    const result = createSchoolSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    try {
        const { name, address, slug, educationLevel } = result.data

        const newSchool = await prisma.school.create({
            data: { name, address, slug, educationLevel }
        })

        await prisma.user.update({
            where: { id: userId },
            data: { schoolId: newSchool.id }
        })

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId }
        })

        return NextResponse.json({
            school: newSchool,
            redirect: "/dashboard",
            message: "School created successfully",
            user: {
                id: updatedUser?.id,
                email: updatedUser?.email,
                roleId: updatedUser?.roleId,
                schoolId: updatedUser?.schoolId,
                classroomId: updatedUser?.classroomId
            }
        }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.message || "Failed to create school" },
            { status: 500 }
        )
    }
}
