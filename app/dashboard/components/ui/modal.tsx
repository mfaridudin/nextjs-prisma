"use client";

import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    maxWidth?: string;
}

export default function Modal({
    open,
    onClose,
    title,
    children,
    maxWidth = "max-w-xl",
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                className={`
          w-full ${maxWidth}
          bg-white
          rounded-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.15)]
          animate-in fade-in zoom-in-95
        `}
            >
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                        >
                            <IconX />
                        </button>
                    </div>
                )}

                <div className="px-6 py-5">{children}</div>
            </div>
        </div>
    );
}
