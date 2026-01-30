// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/prisma";
// import { number } from "zod";

// const handler = NextAuth({
//     debug: true, providers: [CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//             email: { label: "Email", type: "email" },
//             password: { label: "Password", type: "password" },
//             magicToken: { label: "Magic Token", type: "hidden" },
//         },

//         async authorize(credentials) {
//             if (!credentials) return null;

//             if (credentials.magicToken) {
//                 const token = await prisma.magicLoginToken.findUnique({
//                     where: { token: credentials.magicToken },
//                     include: { user: true },
//                 });

//                 if (!token || token.expiresAt < new Date()) return null;

//                 await prisma.magicLoginToken.delete({ where: { token: credentials.magicToken } });

//                 return {
//                     id: Number(token.user.id),
//                     email: token.user.email,
//                     roleId: token.user.roleId,
//                     schoolId: token.user.schoolId ?? null,
//                 }
//             }

//             if (!credentials.email || !credentials.password) return null;

//             const user = await prisma.user.findUnique({ where: { email: credentials.email } });
//             if (!user || !user.emailVerified) return null;

//             const valid = await bcrypt.compare(credentials.password, user.password);
//             if (!valid) return null;

//             return {
//                 id: Number(user.id),
//                 email: user.email,
//                 roleId: user.roleId,
//                 schoolId: user.schoolId ?? null,
//             }
//         }
//     }),],

//     session: { strategy: "jwt", },

//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = Number(user.id);
//                 token.roleId = user.roleId;
//                 token.schoolId = user.schoolId ?? null;
//             }
//             return token;
//         },

//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = Number(token.id);
//                 session.user.roleId = token.roleId;
//                 session.user.schoolId = token.schoolId ?? null;
//             }
//             return session;
//         },
//     },

//     secret: process.env.NEXTAUTH_SECRET,
// }); export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
