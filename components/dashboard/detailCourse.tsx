"use client"

export default function DetailCourse({ data }: any) {
    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Detail Course
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Header gradien untuk highlight nama dan slug */}
                <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{data?.name}</h2>
                            {/* <p className="text-indigo-100">@{classroom?.slug}</p> */}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* Ubah ke 1 kolom karena hanya 1 field; sesuaikan jika menambah */}
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Teacher</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">
                                {data?.teachers[0]?.fullName || "Not Assigned"}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Number of Students</label>
                            <p className="text-lg text-gray-900 dark:text-gray-100">{data?._count?.students || 0}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
