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

        const studentId = Number(session.user.id);

        const { data: submissions, error } = await supabase
            .from("LessonSubmission")
            .select(`
                id,
                score,
                lesson:Lesson!inner(title),
                createdAt
            `)
            .eq("studentId", studentId)
            .order("createdAt", { ascending: false })

        if (error) {
            console.error("SUPABASE ERROR:", error);
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(submissions);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch submissions" },
            { status: 500 }
        );
    }
}
