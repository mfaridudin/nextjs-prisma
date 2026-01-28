import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSchoolSchema } from "@/lib/validators/school";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const schools = await prisma.school.findMany({
                    include: {
                        user: {
                            select: {
                                username: true,
                                role: {
                                    select: {
                                        name: true
                                    }
                                }
                            },
                        },
                    },
                });
                res.status(200).json(schools);
                return;
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch schools" });
            }
            break;


        case "POST":
            const result = createSchoolSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors,
                });
            }

            const body = result.data;

            try {
                const { name, address, slug, educationLevel, } = body

                const newSchool = await prisma.school.create({
                    data: {
                        name,
                        address,
                        slug,
                        educationLevel,
                    },
                });

                res.status(201).json(newSchool);
                return;
            } catch (error: any) {
                console.error(error);
                res.status(500).json({ error: error.message || "Failed to create user" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
