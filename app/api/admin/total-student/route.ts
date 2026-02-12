import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";


export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const schoolId = Number(session.user.schoolId)

        const { data: students, error } = await supabase
            .from("User")
            .select("id, Role!inner(name)")
            .eq("schoolId", schoolId)
            .eq("Role.name", "Student");

        if (error) throw error;

        const totalStudent = students?.length || 0;

        return NextResponse.json({ totalStudent });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch" },
            { status: 500 }
        );
    }
}
