import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import teacher from "../teacher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid classroom ID" });
    }

    switch (method) {
        case "GET":
            try {
                const classroom = await prisma.classroom.findUnique({
                    where: { id: Number(id) },
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
                        students: {
                            select: {
                                id: true,
                                fullName: true,
                                username: true,
                                address: true,
                                email: true,
                                createdAt: true,
                            },
                        },
                        _count: {
                            select: {
                                students: true,
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

                if (!classroom) return res.status(404).json({ error: "Classroom not found" });

                res.status(200).json(classroom);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Failed to fetch classroom" });
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
