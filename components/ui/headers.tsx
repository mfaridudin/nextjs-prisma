"use client"

import { useUserStore } from "@/store/useUserStore"
import Button from "./button"
import Modal from "./modal"
import { signOut } from "next-auth/react";
import { useOpenModal } from "@/store/useOpenModal"

export default function Headers() {

    const { user } = useUserStore()
    const school = user?.school?.name

    const { open, mode, openLogoutModal, closeModal } = useOpenModal()
    const clearUser = useUserStore((state) => state.clearUser);

    // console.log(school)

    return (
        <>
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-10 p-4 flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>

                    <h1 className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {school} Dashboard
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </div>
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        A
                    </div>

                    <button onClick={openLogoutModal} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-red-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                    </button>
                </div>
            </header>

            <Modal
                open={open && mode === "logout"}
                onClose={closeModal}
                title="Log out"
                maxWidth="max-w-md"
            >
                <div className="p-6">
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                        Are you sure you want to logout?
                    </p>

                    <div className="flex justify-end gap-3">
                        <Button onClick={closeModal} variant="cancel">
                            Cancel
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => {
                                clearUser()
                                signOut({ callbackUrl: "/login" })
                            }}
                        >
                            Yes, Logout
                        </Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}
