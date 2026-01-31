"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "cancel";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    fullWidth = false,
    ...props
}: ButtonProps) {
    const base =
        "rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";

    const colors = {
        primary:
            "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500/50",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400/50",
        danger:
            "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50",
        cancel:
            "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 focus:ring-gray-400/50",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${base} ${colors[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""
                } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
