import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isAuth = !!req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        const authPages = [
            "/auth/login",
            "/auth/register",
            "/auth/add-school",
            "/auth/verify-email",
            "/auth/verify-pending",
        ];

        const isAuthPage = authPages.some((path) =>
            pathname.startsWith(path)
        );

        if (!isAuth && !isAuthPage) {
            return NextResponse.redirect(
                new URL("/auth/login", req.url)
            );
        }

        if (isAuth && isAuthPage) {
            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            );
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/((?!api|_next|favicon.ico).*)",
    ],
};
