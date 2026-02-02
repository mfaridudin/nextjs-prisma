import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { createClassroomSchema } from "@/lib/validators/classroom";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const classrooms = await prisma.classroom.findMany({
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        schoolId: true,
                        teacherId: true,
                        teacher: {
                            select: {
                                fullName: true,
                            },
                        },
                        school: {
                            select: {
                                name: true,
                            },
                        },
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                res.status(200).json(classrooms);
                return;
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch classrooms" });
            }
            break;

        case "POST":
            const result = createClassroomSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors,
                });
            }

            const body = result.data;

            try {
                const { name, slug, schoolId, teacherId } = body

                const newClassroom = await prisma.classroom.create({
                    data: {
                        name,
                        slug,
                        schoolId,
                        teacherId
                    },
                });

                return res.status(201).json({
                    classroom: newClassroom,
                });
            } catch (error: any) {
                console.error(error);
                res.status(500).json({ error: error.message || "Failed to create classroom" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
