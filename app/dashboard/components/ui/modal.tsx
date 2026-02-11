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
}: ModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl shadow-lg">

                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button onClick={onClose}>
                            <IconX />
                        </button>
                    </div>
                )}

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

