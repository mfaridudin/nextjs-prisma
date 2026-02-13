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

        if (!teacherId || isNaN(teacherId)) {
            return NextResponse.json(
                { message: "Invalid teacher ID" },
                { status: 400 }
            );
        }

        /* ===============================
           1️⃣ Ambil Classroom
        =============================== */
        const { data: classroom, error: classroomError } = await supabase
            .from("Classroom")
            .select("id, name, schoolId")
            .eq("teacherId", teacherId)
            .single();

        if (classroomError || !classroom) {
            return NextResponse.json(null);
        }

        let schoolName = "-";

        if (classroom.schoolId) {
            const { data: school } = await supabase
                .from("School")
                .select("name")
                .eq("id", classroom.schoolId)
                .single();

            schoolName = school?.name || "-";
        }

        const { data: students } = await supabase
            .from("User")
            .select("id")
            .eq("classroomId", classroom.id);

        const studentsCount = students?.length || 0;

        const { data: teacher } = await supabase
            .from("User")
            .select("courseId")
            .eq("id", teacherId)
            .single();

        let courseName = "-";

        if (teacher?.courseId) {
            const { data: course } = await supabase
                .from("Course")
                .select("name")
                .eq("id", teacher.courseId)
                .single();

            courseName = course?.name || "-";
        }

        return NextResponse.json({
            name: classroom.name,
            school: schoolName,
            studentsCount,
            course: courseName,
        });

    } catch (error: any) {
        console.error("ERROR:", error);

        return NextResponse.json(
            { message: error.message || "Failed to fetch classroom" },
            { status: 500 }
        );
    }
}
