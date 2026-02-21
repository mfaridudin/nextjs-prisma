"use client"
export default function Footer() {
    return (
        <div>
            <footer data-aos="zoom-in" className="relative px-6 md:px-16 lg:px-24 xl:px-32 mt-40 w-full text-slate-500">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
                    <div className="md:max-w-114">
                        <div className="flex items-center gap-2">
                            {/* <img src="/images/logos/logo.svg" width={"60%"} alt="" /> */}
                            <img
                                src="/images/logos/logo.svg"
                                alt="Logo"
                                className="h-8 w-auto"
                            />

                        </div>
                        <p className="mt-6">
                            Build and manage your learning platform with ease. Our LMS helps schools and educators deliver lessons,
                            manage students, and track progress—all from one powerful system.
                        </p>
                    </div>
                    <div className="flex-1 flex items-start md:justify-end gap-20">
                        <div>
                            <h2 className="font-semibold mb-5">Company</h2>
                            <ul className="space-y-2">
                                <li>
                                    <a href="" className="hover:text-indigo-600 transition">Home</a>
                                </li>
                                <li>
                                    <a href="/features" className="hover:text-indigo-600 transition">Features</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-semibold mb-5">Get in touch</h2>
                            <div className="space-y-2">
                                <p>+1-212-456-7890</p>
                                <p>contact@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="pt-4 text-center pb-5">
                    Copyright 2026 ©
                    <a href="https://prebuiltui.com?utm_source=saasly" target="_blank">SCHOOLMS</a>. All Right Reserved. Distributed
                    by
                    <a href="https://themewagon.com" target="_blank">Muhammad Farid</a>
                </p>
            </footer>

        </div>
    )
}
