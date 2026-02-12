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
     
        const { data: courses, error } = await supabase
            .from("Course")
            .select("*")
            .eq("schoolId", schoolId);

        if (error) throw error;

        const totalCourse = courses?.length || 0;

        return NextResponse.json({ totalCourse });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch" },
            { status: 500 }
        );
    }
}
