import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const schoolId = session.user.roleId === 1 ? Number(session.user.schoolId) : null;
    if (!schoolId) {
      return NextResponse.json({ message: "No school associated with this user" }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const month = Number(searchParams.get("month") || new Date().getMonth() + 1); 

    const year = new Date().getFullYear();
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 1).toISOString();

    const { data: courses, error: courseError } = await supabase
      .from("Course")
      .select("id")
      .eq("schoolId", schoolId);

    if (courseError) throw courseError;
    const courseIds = courses.map(c => c.id);
    if (courseIds.length === 0) {
      return NextResponse.json({ lessons: [0, 0, 0, 0], submissions: [0, 0, 0, 0] });
    }

    const { data: lessons, error: lessonError } = await supabase
      .from("Lesson")
      .select("*")
      .in("courseId", courseIds)
      .gte("createdAt", startDate)
      .lt("createdAt", endDate);

    if (lessonError) throw lessonError;
    if (!lessons || lessons.length === 0) {
      return NextResponse.json({ lessons: [0, 0, 0, 0], submissions: [0, 0, 0, 0] });
    }

    const lessonIds = lessons.map(l => l.id);

    const { data: submissions, error: submissionError } = await supabase
      .from("LessonSubmission")
      .select("*")
      .in("lessonId", lessonIds);

    if (submissionError) throw submissionError;

    const lessonsCount = [0, 0, 0, 0];
    const submissionsCount = [0, 0, 0, 0];

    lessons.forEach((lesson: any) => {
      const day = new Date(lesson.createdAt).getDate();
      const week = Math.min(3, Math.floor((day - 1) / 7));
      lessonsCount[week] += 1;

      const lessonSubs = submissions?.filter((s: any) => s.lessonId === lesson.id).length || 0;
      submissionsCount[week] += lessonSubs;
    });

    return NextResponse.json({ lessons: lessonsCount, submissions: submissionsCount }, { status: 200 });
  } catch (error: any) {
    console.error("Error activity overview:", error);
    return NextResponse.json({ message: "Failed to load activity overview", error: error.message }, { status: 500 });
  }
}
