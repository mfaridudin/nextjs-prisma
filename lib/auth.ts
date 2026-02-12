import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

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
                if (!credentials) return null;

                // ✅ Login via email verification token
                if (credentials.verifyToken) {
                    const { data: tokenData, error } = await supabase
                        .from("emailVerificationToken")
                        .select("*, User(*)")
                        .eq("token", credentials.verifyToken)
                        .single();

                    if (error || !tokenData) return null;
                    if (new Date(tokenData.expiresAt) < new Date()) return null;

                    // Delete token setelah dipakai
                    await supabase
                        .from("emailVerificationToken")
                        .delete()
                        .eq("token", credentials.verifyToken);

                    const user = tokenData.User;
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        roleId: user.roleId,
                        schoolId: user.schoolId ?? null,
                        classroomId: user.classroomId ?? null,
                    };
                }

                // ✅ Login via email & password
                if (!credentials.email || !credentials.password) return null;

                const { data: user, error } = await supabase
                    .from("User")
                    .select("*")
                    .eq("email", credentials.email)
                    .single();

                if (error || !user || !user.emailVerified) return null;

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) return null;

                return {
                    id: user.id.toString(),
                    email: user.email,
                    roleId: user.roleId,
                    schoolId: user.schoolId ?? null,
                    classroomId: user.classroomId ?? null,
                };
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        // ✅ JWT callback
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.roleId = user.roleId;
            }

            if (token.id) {
                const { data: dbUser } = await supabase
                    .from("User")
                    .select("schoolId, classroomId")
                    .eq("id", Number(token.id))
                    .single();

                token.schoolId = dbUser?.schoolId ?? null;
                token.classroomId = dbUser?.classroomId ?? null;
            }

            return token;
        },

        // ✅ Session callback
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.roleId = token.roleId as number;
                session.user.schoolId = token.schoolId as number | null;
                session.user.classroomId = token.classroomId as number | null;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
