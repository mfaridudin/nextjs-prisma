import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

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

        const { data: teachers, error } = await supabase
            .from("User")
            .select(`
                id,
                fullName,
                username,
                email,
                schoolId
            `)
            .eq("roleId", 3)
            .eq("schoolId", schoolId)
            .is("classroomId", null);

        if (error) {
            throw new Error(error.message);
        }


        return NextResponse.json(teachers, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to fetch available teachers" },
            { status: 500 }
        )
    }
}
