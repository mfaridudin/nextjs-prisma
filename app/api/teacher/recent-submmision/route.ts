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

        const teacherId = Number(session.user.id);

        const { data: submissions, error } = await supabase
            .from("LessonSubmission")
            .select(`
                *,
                student:User(*),
                lesson:Lesson!inner(*)
            `)
            .eq("lesson.teacherId", teacherId)
            .order("createdAt", { ascending: false })
            .limit(10);

        if (error) {
            console.error("SUPABASE ERROR:", error);
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }


        const result = submissions?.map((item) => ({
            id: item.id,
            student:
                item.student?.fullName ??
                item.student?.username ??
                "Unknown",
            lesson: item.lesson?.title ?? "-",
            score: item.score ?? 0,
            date: new Date(item.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        })) ?? [];

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch submissions" },
            { status: 500 }
        );
    }
}
