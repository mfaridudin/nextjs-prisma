import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createUserSchema } from "@/lib/validators/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const users = await prisma.user.findMany({
                    include: {
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                });
                res.status(200).json(users);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch users" });
            }
            break;

        case "POST":
            const result = createUserSchema.safeParse(req.body);

            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors,
                });
            }

            const body = result.data;

            if (body.password !== body.password_confirmation) {
                return res.status(400).json({ error: "Password confirmation does not match" });
            }

            try {
                const { password_confirmation, age, dateOfBirth, ...userData } = body;

                const hashedPassword = await bcrypt.hash(userData.password, 10);

                const newUser = await prisma.user.create({
                    data: {
                        ...userData,
                        password: hashedPassword,
                        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                        age: age !== undefined ? Number(age) : null,
                        roleId: userData.roleId || 1,
                    },
                });

                res.status(201).json(newUser);
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
