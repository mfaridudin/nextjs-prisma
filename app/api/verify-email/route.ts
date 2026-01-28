import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const token = url.searchParams.get("token")

    if (!token) return new Response(JSON.stringify({
        success: false,
        message: "Token missing"
    }), { status: 400 })

    const tokenData = await prisma.emailVerificationToken.findUnique({
        where: { token },
        include: { user: true },
    })

    if (!tokenData) {
        return new Response(JSON.stringify({
            success: false,
            message: "Token invalid"
        }), { status: 400 })
    }

    if (tokenData.expiresAt < new Date()) {
        return new Response(JSON.stringify({
            success: false,
            message: "Token expired"
        }), { status: 400 })
    }

    await prisma.user.update({
        where: { id: tokenData.userId },
        data: { emailVerified: true },
    })

    await prisma.emailVerificationToken.delete({ where: { id: tokenData.id } })

    try {
        await fetch("http://127.0.0.1:3000/auth/verify-pending", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: tokenData.userId,
                email: tokenData.user.email,
                verifiedAt: new Date(),
            }),
        })
    } catch (err) {
        console.error("Webhook failed:", err)
    }


    return new Response(JSON.stringify({ success: true }))
}
