import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const isAuth = !!req.nextauth.token;
        const pathname = req.nextUrl.pathname;


        const token = req.nextauth.token;
        const role = token?.roleId;

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
            if (
                pathname.startsWith("/auth/add-school") ||
                pathname.startsWith("/auth/verify-email")
            ) {
                return NextResponse.next();
            }

            return NextResponse.redirect(
                new URL("/dashboard/admin", req.url)
            );
        }

        if (pathname.startsWith("/dashboard/admin") && role !== 1) {
            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            );
        }

        if (pathname.startsWith("/dashboard/teacher") && role !== 2) {
            return NextResponse.redirect(
                new URL("/dashboard/admin", req.url)
            );
        }

        if (pathname.startsWith("/dashboard/student") && role !== 3) {
            return NextResponse.redirect(
                new URL("/dashboard/admin", req.url)
            );
        }

        if (
            (pathname.startsWith("/dashboard/teachers") ||
                pathname.startsWith("/dashboard/students")) &&
            role !== 1
        ) {
            return NextResponse.redirect(
                new URL("/dashboard/admin", req.url)
            );
        }

        if (pathname === "/dashboard") {
            if (role === 1)
                return NextResponse.redirect(
                    new URL("/dashboard/admin", req.url)
                );

            if (role === 2)
                return NextResponse.redirect(
                    new URL("/dashboard/teacher", req.url)
                );

            if (role === 3)
                return NextResponse.redirect(
                    new URL("/dashboard/student", req.url)
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
