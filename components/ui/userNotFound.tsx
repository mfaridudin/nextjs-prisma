"use client"

export default function UserNotFound() {
    return (
        <div className="h-screen flex items-center overflow-hidden justify-center px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
                <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-gray-400 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    User Not Found
                </h1>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The user you're looking for doesn't exist or may have been removed.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}
