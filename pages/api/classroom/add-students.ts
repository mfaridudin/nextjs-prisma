import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"])
        return res.status(405).end("Method Not Allowed")
    }

    try {
        const { classroomId, studentIds } = req.body

        if (
            !classroomId ||
            !Array.isArray(studentIds) ||
            studentIds.length === 0
        ) {
            return res.status(400).json({ message: "Invalid payload" })
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
        })

        return res.status(200).json({
            message: "Student successfully added to classroom",
            count: updateResult.count,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
