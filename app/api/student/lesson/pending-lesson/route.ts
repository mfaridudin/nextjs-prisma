import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Select } from "@mui/material"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const user = session.user

        const student = user

        const studentId = Number(student.id)

        if (Number(user.roleId) !== 3) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const classroomId = Number(user.classroomId)

        console.log("CLASSROOM ID:", classroomId)

        if (!classroomId) {
            return NextResponse.json(
                { error: "Student belum memiliki classroomId di session" },
                { status: 400 }
            )
        }

        const { data: lessons, error: lessonError } = await supabase
            .from("Lesson")
            .select("id, title, courseId, classroomId")
            .eq("classroomId", classroomId);

        if (lessonError) throw lessonError;

        if (!lessons || lessons.length === 0) {
            return [];
        }

        const { data: submissions, error: submissionError } = await supabase
            .from("LessonSubmission")
            .select("lessonId")
            .eq("studentId", Number(studentId));

        if (submissionError) throw submissionError;

        const submittedLessonIds = submissions?.map(s => s.lessonId) || [];

        const pendingLessonsRaw = lessons.filter(
            lesson => !submittedLessonIds.includes(lesson.id)
        );

        const courseIds = [...new Set(pendingLessonsRaw.map(l => l.courseId))];

        const { data: courses } = await supabase
            .from("Course")
            .select("id, name")
            .in("id", courseIds);

        const { data: classroom } = await supabase
            .from("Classroom")
            .select("id, name")
            .eq("id", classroomId)
            .single();

        const pendingLessons = pendingLessonsRaw.map(lesson => ({
            ...lesson,
            course: {
                name: courses?.find(c => c.id === lesson.courseId)?.name || "-"
            },
            classroom: {
                name: classroom?.name || "-"
            }
        }));

        return NextResponse.json(pendingLessons)

    } catch (error: any) {
        console.error("ERROR LESSON API:", error)

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}
