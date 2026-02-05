import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

        const updateResult = await prisma.user.updateMany({
            where: {
                id: { in: studentIds },
                roleId: 3,
                classroomId: null,
            },
            data: {
                classroomId,
            },
        });

        return NextResponse.json({
            message: "Student successfully added to classroom",
            count: updateResult.count,
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}