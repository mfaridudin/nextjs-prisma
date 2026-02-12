import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const schoolId = Number(session.user.schoolId);

        // Query Supabase
        const { data: teachers, error } = await supabase
            .from("User")
            .select("id, Role!inner(name)")
            .eq("schoolId", schoolId)
            .eq("Role.name", "Teacher");

        if (error) throw error;

        const totalTeacher = teachers?.length || 0;

        return NextResponse.json({ totalTeacher }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch", error: error.message },
            { status: 500 }
        );
    }
}
