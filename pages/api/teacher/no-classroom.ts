import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const teachers = await prisma.user.findMany({
            where: {
                roleId: 2,
                teachingClass: null
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                username: true
            }
        });

        return res.status(200).json(teachers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to fetch available teachers"
        });
    }
}
