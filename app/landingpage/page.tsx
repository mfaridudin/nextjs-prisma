"use client"

import Features from "@/component/landingpage/features";
import Footer from "@/component/landingpage/footer";
import HeroSection from "@/component/landingpage/heroSection";
import Navbar from "@/component/landingpage/navbar";
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
