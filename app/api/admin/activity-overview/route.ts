import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = Number(searchParams.get("month") || 1);

  try {
    const startDate = new Date(2026, month - 1, 1).toISOString();
    const endDate = new Date(2026, month, 1).toISOString();


    const { data: lessons, error: lessonError } = await supabase
      .from("Lesson")
      .select("*")
      .gte("createdAt", startDate)
      .lt("createdAt", endDate);

    if (lessonError) throw lessonError;
    if (!lessons) return NextResponse.json({ lessons: [], submissions: [] });


    const { data: submissions, error: submissionError } = await supabase
      .from("LessonSubmission")
      .select("*");

    if (submissionError) throw submissionError;

    const lessonsCount = [0, 0, 0, 0];
    const submissionsCount = [0, 0, 0, 0];

    lessons.forEach((lesson: any) => {
      const week = Math.min(3, Math.floor(new Date(lesson.createdAt).getDate() / 7));
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
