import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";


export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const teacher = await prisma.user.findMany({
                    where: {
                        roleId: 2,
                        courseId: null,
                    },
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        email: true,
                    },
                });

                if (!teacher || teacher.length === 0)
                    return res.status(200).json([]);

                res.status(200).json(teacher);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch available teachers" });
            }
            break;
    }
}
