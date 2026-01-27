import { access } from "fs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    debug: true,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
                accessToken: { type: "text" },
            },

            async authorize(credentials) {

                if (credentials?.accessToken) {
                    return {
                        id: "google-user",
                        name: "Google User",
                        email: "google@user",
                        accessToken: credentials.accessToken,
                    }
                }

                if (!credentials?.email || !credentials?.password) return null

                const formData = new FormData()
                formData.append("email", credentials.email)
                formData.append("password", credentials.password)

                const res = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    body: formData,
                })

                const data = await res.json()
                if (!res.ok || !data.token) return null

                return {
                    id: credentials.email,
                    email: credentials.email,
                    name: credentials.email,
                    accessToken: data.token,
                }
            },
        })

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as any;
            }
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
