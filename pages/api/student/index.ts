import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { createUserSchema } from "@/lib/validators/user"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const currentUser = session.user

    switch (req.method) {
        case "GET":
            try {
                const users = await prisma.user.findMany({
                    where: { schoolId: currentUser.schoolId },
                })
                return res.status(200).json(users)
            } catch (error) {
                console.error(error)
                return res.status(500).json({ error: "Failed to fetch users" })
            }

        case "POST":
            const result = createUserSchema.safeParse(req.body)

            if (!result.success) {
                return res.status(400).json({
                    errors: result.error.flatten().fieldErrors,
                })
            }

            const body = result.data

            if (body.password !== body.password_confirmation) {
                return res.status(400).json({
                    errors: {
                        password_confirmation: ["Password confirmation does not match"],
                    },
                })
            }

            try {
                const { password_confirmation, age, dateOfBirth, ...userData } = body

                const hashedPassword = await bcrypt.hash(userData.password, 10)

                const newUser = await prisma.user.create({
                    data: {
                        ...userData,
                        password: hashedPassword,
                        emailVerified: userData.emailVerified ?? false,
                        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                        age: age !== undefined ? Number(age) : null,
                        roleId: userData.roleId,
                        schoolId: currentUser.schoolId,
                    },
                })

                return res.status(201).json(newUser)
            } catch (error: any) {
                console.error(error)
                return res
                    .status(500)
                    .json({ error: error.message || "Failed to create user" })
            }

        default:
            res.setHeader("Allow", ["GET", "POST"])
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
