"use client"

import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
    return (
        <div
            style={{
                backgroundImage: "url('/assets/hero-section-dot-image.png')",
            }}
            className="flex flex-col items-center justify-center text-center bg-cover bg-no-repeat"
        >
            <h1 data-aos="zoom-in" className="text-[40px]/tight md:text-[54px]/tight font-semibold max-w-3xl mt-44">
                Build a smart dashboard{" "}
                <span data-aos="fade-up" className="bg-linear-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                    to manage your
                </span>{" "}
                school faster and easier
            </h1>

            <p  data-aos="zoom-in" className="text-base text-slate-600 max-w-lg mt-5">
                Streamlined workflows that support learning and help schools work more efficiently.
            </p>

            <div data-aos="zoom-in" className="flex items-center gap-4 mt-6">
                <Link href="/auth/register" className="bg-indigo-600 hover:bg-indigo-700 transition px-8 py-3 rounded-md text-white">
                    Get Started
                </Link>
            </div>

            <Image data-aos="zoom-in"
                src="/assets/hero-section-card-image.svg"
                alt="Hero Section Card Image"
                width={1000}
                height={500}
                className="w-full max-w-xl mt-16 drop-shadow-2xl drop-shadow-blue-500/15 mx-auto"
                priority
            />


        </div>
    )
}
