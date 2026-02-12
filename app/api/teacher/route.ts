import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createUserSchema } from "@/lib/validators/user"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const schoolId = Number(session.user.schoolId)
    if (!schoolId) {
        return NextResponse.json({ message: "User has no school assigned" }, { status: 400 })
    }

    const teachers = await prisma.user.findMany({
        where: {
            schoolId: schoolId,
            roleId: 2
        },
        include: {
            course: {
                select: {
                    name: true
                }
            }
        },
    })

    return NextResponse.json({ teachers }, { status: 200 })
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.schoolId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const schoolId = Number(session.user.schoolId)

    const body = await request.json()
    const result = createUserSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    const data = result.data

    if (data.password !== data.password_confirmation) {
        return NextResponse.json(
            { errors: { password_confirmation: ["Password confirmation does not match"] } },
            { status: 400 }
        )
    }

    try {
        const { password_confirmation, age, dateOfBirth, ...userData } = data

        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newTeacher = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
                emailVerified: userData.emailVerified ?? false,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                age: age !== undefined ? Number(age) : null,
                roleId: userData.roleId || 2,
                schoolId: schoolId,
            },
        })

        return NextResponse.json({ teacher: newTeacher }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.message || "Failed to create new teacher" },
            { status: 500 }
        )
    }
}

