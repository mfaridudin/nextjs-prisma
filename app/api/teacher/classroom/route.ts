import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Select } from "@mui/material";

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

        const classroom = await prisma.classroom.findFirst({
            where: {
                teacherId: teacherId,
            },
            include: {
                school: true,
                students: true,
            },
        });

        const course = await prisma.user.findFirst({
            where: {
                id: teacherId,
            },
            select: {
                course: {
                    select: {
                        name: true,
                    },
                },
            },
        });


        if (!classroom) {
            return NextResponse.json(null);
        }

        return NextResponse.json({
            name: classroom.name,
            school: classroom.school?.name,
            studentsCount: classroom.students.length,
            course: course?.course?.name || "-"
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch classroom" },
            { status: 500 }
        );
    }
}
