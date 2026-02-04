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
                        id: Number(token.user.id),
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
                    id: Number(user.id),
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
                token.id = Number(user.id)
                token.roleId = user.roleId
                token.schoolId = user.schoolId ?? null
                token.classroomId = user.classroomId ?? null
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = Number(token.id)
                session.user.roleId = token.roleId
                session.user.schoolId = token.schoolId ?? null
                session.user.classroomId = token.classroomId ?? null
            }
            return session
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
}
