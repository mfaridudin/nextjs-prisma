import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const token = url.searchParams.get("token")

    if (!token) {
        return NextResponse.json(
            { success: false, message: "Token missing" },
            { status: 400 }
        )
    }

    const tokenData = await prisma.emailVerificationToken.findUnique({
        where: { token },
        include: { user: true },
    })

    if (!tokenData || tokenData.expiresAt < new Date()) {
        return NextResponse.json(
            { success: false, message: "Invalid or expired token" },
            { status: 400 }
        )
    }

    await prisma.user.update({
        where: { id: tokenData.userId },
        data: { emailVerified: true },
    })

    // await prisma.emailVerificationToken.delete({
    //     where: { id: tokenData.id },
    // })

    return NextResponse.json({
        success: true,
        userId: tokenData.userId,
    })
}
