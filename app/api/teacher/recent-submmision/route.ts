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

        const submissions = await prisma.lessonSubmission.findMany({
            where: {
                lesson: {
                    teacherId: teacherId,
                },
            },
            include: {
                student: true,
                lesson: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        const result = submissions.map((item) => ({
            id: item.id,
            student: item.student.fullName || item.student.username || "Unknown",
            lesson: item.lesson.title,
            score: item.score,
            date: item.createdAt.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }),
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to fetch submissions" },
            { status: 500 }
        );
    }
}
