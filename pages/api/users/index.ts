import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createUserSchema } from "@/lib/validators/user";
import crypto from "crypto"
import { sendMail } from "@/lib/mail";

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
                return Response.json({
                    errors: {
                        password_confirmation: ["Password confirmation does not match"]
                    }
                }, { status: 400 })
            }

            try {
                const { password_confirmation, age, dateOfBirth, ...userData } = body

                const hashedPassword = await bcrypt.hash(userData.password, 10);

                const newUser = await prisma.user.create({
                    data: {
                        ...userData,
                        emailVerified: userData.emailVerified ?? false,
                        password: hashedPassword,
                        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                        age: age !== undefined ? Number(age) : null,
                        roleId: userData.roleId || 1,
                    },
                });

                const token = crypto.randomUUID()
                const expiresAt = new Date(
                    Date.now() + 1000 * 60 * 60 * 24
                )

                await prisma.emailVerificationToken.create({
                    data: {
                        token,
                        expiresAt,
                        userId: newUser.id,
                    },
                });

                await sendMail({
                    to: newUser.email,
                    subject: "Verifikasi Email Akun Anda",
                    html: `
                            <div style="max-width:600px;margin:auto;font-family:sans-serif;">
                            <h2>Halo ${newUser.fullName ?? "User"} 👋</h2>

                            <p>
                                Terima kasih telah mendaftar.  
                                Silakan klik tombol di bawah ini untuk memverifikasi email Anda.
                            </p>

                            <a
                                href="http://127.0.0.1:3000/auth/verify-email?token=${token}"
                                style="
                                display:inline-block;
                                padding:12px 20px;
                                background:#2563eb;
                                color:#fff;
                                text-decoration:none;
                                border-radius:6px;
                                margin-top:16px;
                                "
                            >
                                Verifikasi Email
                            </a>

                            <p style="margin-top:24px;font-size:12px;color:#666;">
                                Link ini akan kedaluwarsa dalam 24 jam.
                            </p>
                            </div>
                        `,
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
