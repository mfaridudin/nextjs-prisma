"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full text-start">
            {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            <input
                className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
          text-gray-800 placeholder-gray-400
          focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20
          dark:border-gray-700 dark:bg-gray-900 dark:text-white
          dark:placeholder-gray-500
          ${error ? "border-red-500 focus:ring-red-500/20" : ""}
          ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
