"use client"
export default function Footer() {
    return (
        <div>
            <footer data-aos="zoom-in" className="relative px-6 md:px-16 lg:px-24 xl:px-32 mt-40 w-full text-slate-500">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-200 pb-6">
                    <div className="md:max-w-114">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-9 h-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                            </svg>
                            <span className="text-3xl font-bold">
                                SCHOOLMS
                            </span>

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
                <p  className="pt-4 text-center pb-5">
                    Copyright 2026 ©
                    <a href="https://prebuiltui.com?utm_source=saasly" target="_blank">SCHOOLMS</a>. All Right Reserved. Distributed
                    by
                    <a href="https://themewagon.com" target="_blank">Muhammad Farid</a>
                </p>
            </footer>

        </div>
    )
}
