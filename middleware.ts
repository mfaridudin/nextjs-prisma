import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuth = !!token;
    const role = token?.roleId;
    const pathname = req.nextUrl.pathname;

    const authPages = [
        "/auth/login",
        "/auth/register",
        "/auth/add-school",
        "/auth/verify-email",
        "/auth/verify-pending",
    ];

    const publicPages = [
        "/landingpage",
        "/",
    ];

    const isAuthPage = authPages.some(path => pathname.startsWith(path));
    const isPublicPage = publicPages.some(path => pathname === path || pathname.startsWith(path + "/"));

    if (pathname === "/") {
        if (!isAuth) {
            return NextResponse.redirect(new URL("/landingpage", req.url));
        } else {
            if (role === 1) return NextResponse.redirect(new URL("/dashboard/admin", req.url));
            if (role === 2) return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
            if (role === 3) return NextResponse.redirect(new URL("/dashboard/student", req.url));
        }
    }

    if (isAuth && isAuthPage) {
        if (role === 1) return NextResponse.redirect(new URL("/dashboard/admin", req.url));
        if (role === 2) return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
        if (role === 3) return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    if (pathname.startsWith("/dashboard/admin") && role !== 1) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (pathname.startsWith("/dashboard/teacher") && role !== 2) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    if (pathname.startsWith("/dashboard/student") && role !== 3) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    if (
        (pathname.startsWith("/dashboard/teachers") || pathname.startsWith("/dashboard/students")) &&
        role !== 1
    ) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    if (pathname === "/dashboard") {
        if (role === 1) return NextResponse.redirect(new URL("/dashboard/admin", req.url));
        if (role === 2) return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
        if (role === 3) return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    if (!isAuth && !isAuthPage && !isPublicPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|favicon.ico|assets|images|js).*)"],
};