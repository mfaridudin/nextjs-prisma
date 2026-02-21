"use client"

import Link from "next/link"

export default function Navbar() {
    return (
        <div>
            <nav
                id="navbar"
                className="flex items-center justify-between fixed z-50 top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-slate-200 bg-white/40 backdrop-blur"
            >
                <div className="flex items-center gap-2">
                    <img
                        src="/images/logos/logo.svg"
                        alt="Logo"
                        className="h-8 w-auto"
                    />

                </div>

                <div className="hidden items-center md:gap-8 lg:gap-12 md:flex">
                    <Link href="#home" className="hover:text-indigo-600">Home</Link>
                    <Link href="#features" className="hover:text-indigo-600">Features</Link>
                </div>

                <div
                    id="mobileMenu"
                    className="fixed inset-0 flex flex-col items-center justify-center gap-6 text-lg font-medium bg-white/40 backdrop-blur-md md:hidden transition duration-300 -translate-x-full"
                >
                    <Link href="#home">Home</Link>
                    <Link href="#features">Features</Link>
                    {/* <Link href="#!">Pricing</Link> */}
                    {/* <button>Sign in</button> */}
                    <button
                        id="closeMenu"
                        className="aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-x-icon lucide-x"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/auth/login"
                        className="hidden md:block hover:bg-slate-100 transition px-4 py-2 border border-indigo-600 rounded-md"                    >
                        Sign in
                    </Link>
                    <Link href="/auth/register"
                        className="hidden md:block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md"
                    >
                        Get started
                    </Link>
                    <button id="openMenu" className="md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-menu-icon lucide-menu"
                        >
                            <path d="M4 12h16" />
                            <path d="M4 18h16" />
                            <path d="M4 6h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    )
}
