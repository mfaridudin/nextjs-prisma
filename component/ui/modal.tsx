"use client"

import { ReactNode } from "react"

interface ModalProps {
    open: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    maxWidth?: string
}

export default function Modal({ open,
    onClose,
    title,
    children,
    maxWidth = "max-w-xl",
}: ModalProps) {
    if (!open) return null
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${maxWidth}`}>
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                        <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-200"
                            onClick={onClose}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div>{children}</div>
            </div>
        </div>
    )
}
