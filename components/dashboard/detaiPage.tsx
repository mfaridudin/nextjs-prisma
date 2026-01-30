"use client"

export default function DetaiPage({ item, title }: any) {
    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    {title}
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            {/* teacher Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

                <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center space-x-4">
                        <img
                            src={item.avatar}
                            alt={`${item.fullName} avatar`}
                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-white">{item.fullName}</h2>
                            <p className="text-indigo-100">@{item.username}</p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.fullName}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.username}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.age} <span>years</span></p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.address}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Age</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{item.emailVerified ? 'yesss' : 'not'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {new Date(item.dateOfBirth).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Account Created</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Role</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {item.role.name}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 flex space-x-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                            Edit teacher
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
