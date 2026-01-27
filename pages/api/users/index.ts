import type { NextApiRequest, NextApiResponse } from "next";
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

            try {
                let { fullName, username, address, email, dateOfBirth, password, age, roleId } = req.body;

                const userRoleId = roleId || 1;

                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await prisma.user.create({
                    data: {
                        fullName,
                        username,
                        email,
                        password: hashedPassword,
                        address,
                        dateOfBirth,
                        age,
                        roleId: userRoleId,
                    },
                });

                res.status(201).json(newUser);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to create user" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
