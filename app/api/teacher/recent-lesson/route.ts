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

        const lessons = await prisma.lesson.findMany({
            where: {
                teacherId: teacherId,
            },
            include: {
                course: true,
                classroom: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        const result = lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            course: lesson.course.name,
            classroom: lesson.classroom.name,
            date: lesson.createdAt.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch lessons" },
            { status: 500 }
        );
    }
}
