"use client"

import Features from "@/components/landingpage/features";
import Footer from "@/components/landingpage/footer";
import HeroSection from "@/components/landingpage/heroSection";
import Navbar from "@/components/landingpage/navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function page() {

    useEffect(() => {
        AOS.init({
            duration: 900,
            once: true,
        });
    }, []);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <h3 className="text-base text-center text-slate-400 mt-32 pb-14 font-medium">
                Trusted by leading schools —
            </h3>
            <Features />
            <Footer />
        </div>
    )
}
