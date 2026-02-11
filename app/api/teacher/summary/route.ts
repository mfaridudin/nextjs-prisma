import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

        const lessons = await prisma.lesson.count({
            where: {
                teacherId: teacherId,
            },
        });

        const courses = await prisma.course.count({
            where: {
                teachers: {
                    some: {
                        id: teacherId,
                    },
                },
            },
        });

        const students = await prisma.user.count({
            where: {
                classroom: {
                    teacherId: teacherId,
                },
            },
        });

        const submissions = await prisma.lessonSubmission.count({
            where: {
                lesson: {
                    teacherId: teacherId,
                },
            },
        });

        return NextResponse.json({
            lessons,
            courses,
            students,
            submissions,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch summary" },
            { status: 500 }
        );
    }
}
