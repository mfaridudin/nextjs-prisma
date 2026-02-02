import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";


export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const students = await prisma.user.findMany({
                    where: {
                        roleId: 3,
                        classroomId: null,
                    },
                    select: {
                        id: true,
                        fullName: true,
                        username: true,
                        email: true,
                    },
                });

                if (!students || students.length === 0)
                    return res.status(404).json({
                        error: "No available students found"
                    });
                res.status(200).json(students);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch available students" });
            }
            break;
    }
}
