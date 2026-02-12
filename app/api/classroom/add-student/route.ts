import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { classroomId, studentIds } = body;

        if (!classroomId || !Array.isArray(studentIds) || studentIds.length === 0) {
            return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("User")
            .update({ classroomId })
            .in("id", studentIds)
            .eq("roleId", 3)
            .is("classroomId", null)
            .select();

        if (error) {
            console.error(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json({
            message: "Student successfully added to classroom",
            count: data?.length ?? 0,
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
