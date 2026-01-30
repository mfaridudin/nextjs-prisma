import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    switch (method) {
        case "GET":
            try {
                const teacher = await prisma.user.findUnique({
                    where: { id: Number(id) },
                    include: { role: true },
                });
                if (!teacher) return res.status(404).json({ error: "Teacher not found" });
                res.status(200).json(teacher);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch teacher" });
            }
            break;

        case "PUT":
            try {
                const { fullName, username, email, address, dateOfBirth, age } = req.body;

                const updatedTeacher = await prisma.user.update({
                    where: { id: Number(id) },
                    data: {
                        fullName,
                        username,
                        email,
                        address,
                        dateOfBirth,
                        age,
                    },
                });

                res.status(200).json(updatedTeacher);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to updated teacher" });
            }
            break;

        case "DELETE":
            try {
                await prisma.user.delete({
                    where: { id: Number(id) },
                });
                res.status(200).json({ message: "Teacher has been successfully deleted" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to delete teacher" });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
