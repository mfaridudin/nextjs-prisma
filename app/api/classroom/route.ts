import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createClassroomSchema } from "@/lib/validators/classroom"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const schoolId = Number(session.user.schoolId)

    try {
        const { data: classrooms, error } = await supabase
            .from("Classroom")
            .select(`
                id,
                name,
                slug,
                schoolId,
                teacherId,
                User!teacherId(fullName),
                School(name),
                createdAt,
                updatedAt
            `)
            .eq("schoolId", schoolId);

        if (error) throw error;

        return NextResponse.json(classrooms, { status: 200 })
    } catch (error: any) {
        console.error("CLASSROOM ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch classrooms" },
            { status: 500 }
        );
    }

}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const schoolId = Number(session.user.schoolId)

    const body = await req.json()
    const result = createClassroomSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    try {
        const { name, slug, teacherId } = result.data

        const now = new Date().toISOString();

        const { data: classroom, error } = await supabase
            .from("Classroom")
            .insert([
                {
                    name,
                    slug,
                    teacherId,
                    schoolId,
                    createdAt: now,
                    updatedAt: now,
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ classroom }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.message || "Failed to create classroom" },
            { status: 500 }
        )
    }
}

