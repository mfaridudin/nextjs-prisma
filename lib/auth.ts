import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    debug: true,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                verifyToken: { label: "verify Token", type: "hidden" },
            },

            async authorize(credentials) {
                if (!credentials) return null

                if (credentials.verifyToken) {
                    const token = await prisma.emailVerificationToken.findUnique({
                        where: { token: credentials.verifyToken },
                        include: { user: true },
                    })

                    if (!token || token.expiresAt < new Date()) return null

                    await prisma.emailVerificationToken.delete({
                        where: { token: credentials.verifyToken },
                    })

                    return {
                        id: token.user.id.toString(),
                        email: token.user.email,
                        roleId: token.user.roleId,
                        schoolId: token.user.schoolId ?? null,
                        classroomId: token.user.classroomId ?? null,
                    }

                }

                if (!credentials.email || !credentials.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user || !user.emailVerified) return null

                const valid = await bcrypt.compare(credentials.password, user.password)
                if (!valid) return null

                return {
                    id: user.id.toString(),
                    email: user.email,
                    roleId: user.roleId,
                    schoolId: user.schoolId ?? null,
                    classroomId: user.classroomId ?? null,
                }

            }

        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.roleId = user.roleId;
            }

            if (token.id) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: Number(token.id) },
                    select: {
                        schoolId: true,
                        classroomId: true,
                    },
                });

                token.schoolId = dbUser?.schoolId ?? null;
                token.classroomId = dbUser?.classroomId ?? null;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.roleId = token.roleId as number;
                session.user.schoolId = token.schoolId as number | null;
                session.user.classroomId = token.classroomId as number | null;
            }
            return session;
        }

    },

    secret: process.env.NEXTAUTH_SECRET,
}
