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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    <span className="text-3xl font-bold">
                        SCHOOLMS
                    </span>

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
