import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSchoolSchema } from "@/lib/validators/school";
import jwt from "jsonwebtoken";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    let token: string | undefined;

    if (method === "GET") {
        token = req.query.token as string | undefined;
    } else if (method === "POST") {
        token = req.body.token as string | undefined;
    }

    if (!token) {
        return res.status(400).json({ error: "Token missing" });
    }

    let payload: any;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userId = payload.userId;

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

                await prisma.user.update({
                    where: { id: userId },
                    data: { schoolId: newSchool.id },
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
