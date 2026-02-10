"use client"

export default function Features() {
    return (
        <div id="features">
            <p data-aos="zoom-in" className="text-center uppercase font-semibold text-indigo-600 mt-20">
                Features
            </p>
            <h3 data-aos="zoom-in" className="text-3xl font-bold text-center mx-auto mt-2">
                Features Overview
            </h3>
            <p data-aos="zoom-in" className="text-sm text-slate-500 text-center mt-4 max-w-lg mx-auto">
                A curated showcase of our latest LMS features—each designed with clarity,
                purpose, and a focus on meaningful learning experiences.
            </p>

            <div data-aos="zoom-in" className="flex flex-wrap items-center justify-center gap-10 mt-16">
                <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png" alt="Card Image"
                        height="{400}" width="{400}" />
                    <h3 data-aos="zoom-in" className="text-base font-semibold text-slate-700 mt-4">
                        Feedback analyser
                    </h3>
                    <p data-aos="zoom-in" className="text-sm text-slate-600 mt-1">
                        Get instant insights into your finances with live dashboards.
                    </p>
                </div>
                <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png" alt="Card Image"
                        height="{400}" width="{400}" />
                    <h3 data-aos="zoom-in" className="text-base font-semibold text-slate-700 mt-4">
                        User management
                    </h3>
                    <p data-aos="zoom-in" className="text-sm text-slate-600 mt-1">
                        Get instant insights into your finances with live dashboards.
                    </p>
                </div>
                <div className="max-w-80 hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png" alt="Card Image"
                        height="{400}" width="{400}" />
                    <h3 data-aos="zoom-in" className="text-base font-semibold text-slate-700 mt-4">
                        Better invoicing
                    </h3>
                    <p data-aos="zoom-in" className="text-sm text-slate-600 mt-1">
                        Get instant insights into your finances with live dashboards.
                    </p>
                </div>
            </div>
        </div>
    )
}
