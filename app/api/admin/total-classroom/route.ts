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

         const { data: classrooms, error } = await supabase
                    .from("Classroom")
                    .select("*")
                    .eq("schoolId", schoolId);
        
                if (error) throw error;
        
                const totalClassroom = classrooms?.length || 0;

        return NextResponse.json({ totalClassroom });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch" },
            { status: 500 }
        );
    }
}
