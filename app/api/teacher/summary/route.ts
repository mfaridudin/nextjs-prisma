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

        const { data: lessonData, error: lessonError } = await supabase
            .from("Lesson")
            .select("id")
            .eq("teacherId", teacherId);

        if (lessonError) throw lessonError;

        const lessons = lessonData?.length || 0;

        let courses = 0;

        if (lessonData && lessonData.length > 0) {
            const courseIds = [
                ...new Set(lessonData.map((l: any) => l.courseId))
            ];

            courses = courseIds.length;
        }

        const { data: classroomData, error: classroomError } = await supabase
            .from("Classroom")
            .select("id")
            .eq("teacherId", teacherId);

        if (classroomError) throw classroomError;

        const classroomIds = classroomData?.map(c => c.id) || [];

        let students = 0;

        if (classroomIds.length > 0) {
            const { data: studentData, error: studentError } = await supabase
                .from("User")
                .select("id")
                .in("classroomId", classroomIds);

            if (studentError) throw studentError;

            students = studentData?.length || 0;
        }

        const lessonIds = lessonData?.map(l => l.id) || [];

        let submissions = 0;

        if (lessonIds.length > 0) {
            const { data: submissionData, error: submissionError } = await supabase
                .from("LessonSubmission")
                .select("id")
                .in("lessonId", lessonIds);

            if (submissionError) throw submissionError;

            submissions = submissionData?.length || 0;
        }

        return NextResponse.json({
            lessons,
            courses,
            students,
            submissions,
        });

    } catch (error: any) {
        console.error("ERROR DETAIL:", error);

        return NextResponse.json(
            { message: error.message || "Unknown error" },
            { status: 500 }
        );
    }
}
