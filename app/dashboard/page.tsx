import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-10 p-4 flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>

                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        School Management Dashboard
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {/* Notification Icon */}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v5h5l-5 5v-5z" />
                            </svg>
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        A
                    </div>

                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl fixed h-screen p-4 overflow-y-auto border-r border-gray-200/50 dark:border-gray-700/50">
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    </svg>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                    Students
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Teachers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Classes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Reports
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all duration-200 group">
                                    <svg className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Total Students</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">1,250</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+5% from last month</p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Total Teachers</h3>
                            </div>
                            <p className="text-3xl font-bold text-green-600">85</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+2% from last month</p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Classes</h3>
                            </div>
                            <p className="text-3xl font-bold text-purple-600">45</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">No change</p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center mb-4">
                                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold">Events</h3>
                            </div>
                            <p className="text-3xl font-bold text-red-600">12</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+10% from last month</p>
                        </div>
                    </div>

                    {/* Recent Activities or Table */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recent Students</h3>
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                                    <th className="text-left py-3 px-2 font-semibold">Name</th>
                                    <th className="text-left py-3 px-2 font-semibold">Class</th>
                                    <th className="text-left py-3 px-2 font-semibold">Grade</th>
                                    <th className="text-left py-3 px-2 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="py-3 px-2">John Doe</td>
                                    <td className="py-3 px-2">10A</td>
                                    <td className="py-3 px-2">A</td>
                                    <td className="py-3 px-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                            Active
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="py-3 px-2">Jane Smith</td>
                                    <td className="py-3 px-2">9B</td>
                                    <td className="py-2">B+</td>
                                    <td className="py-2 text-green-600">Active</td>
                                </tr>
                                <tr className="border-b dark:border-gray-700">
                                    <td className="py-2">Alex Johnson</td>
                                    <td className="py-2">11C</td>
                                    <td className="py-2">A-</td>
                                    <td className="py-2 text-yellow-600">Pending</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;