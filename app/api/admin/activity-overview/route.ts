import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const month = Number(searchParams.get("month") || 1);

    try {
        const lessons = [0, 0, 0, 0];
        const submissions = [0, 0, 0, 0];

        const allLessons = await prisma.lesson.findMany({
            where: {
                createdAt: {
                    gte: new Date(2026, month - 1, 1),
                    lt: new Date(2026, month, 1),
                },
            },
            include: {
                submissions: true,
            },
        });

        allLessons.forEach((lesson) => {
            const week = Math.min(
                3,
                Math.floor(new Date(lesson.createdAt).getDate() / 7)
            );

            lessons[week] += 1;
            submissions[week] += lesson.submissions.length;
        });

        return NextResponse.json({
            lessons,
            submissions,
        });
    } catch (error) {
        console.error("Error activity overview:", error);

        return NextResponse.json(
            { message: "Failed to load activity overview" },
            { status: 500 }
        );
    }
}
