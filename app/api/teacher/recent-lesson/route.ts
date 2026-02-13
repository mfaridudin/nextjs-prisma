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

        const { data: lessons, error } = await supabase
            .from("Lesson")
            .select(`
                *,
                course: Course(*),
                classroom: Classroom(*)
            `)
            .eq("teacherId", teacherId)
            .order("createdAt", { ascending: false })
            .limit(10);

        if (error) throw error;

        const result = lessons?.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            course: lesson.course?.name ?? "-",
            classroom: lesson.classroom?.name ?? "-",
            date: new Date(lesson.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        })) ?? [];


        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch lessons" },
            { status: 500 }
        );
    }
}
