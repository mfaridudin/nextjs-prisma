import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createSchoolSchema } from "@/lib/validators/school"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user?.id) {
        return res.status(401).json({ error: "Unauthorized" })
    }

    const userId = session.user.id

    if (req.method === "POST") {
        const result = createSchoolSchema.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.flatten().fieldErrors,
            })
        }

        try {
            const { name, address, slug, educationLevel } = result.data

            const newSchool = await prisma.school.create({
                data: {
                    name,
                    address,
                    slug,
                    educationLevel,
                },
            })

            await prisma.user.update({
                where: { id: userId },
                data: { schoolId: newSchool.id },
            })

            return res.status(201).json({ school: newSchool })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Failed to create school" })
        }
    }

    return res.status(405).end()
}
