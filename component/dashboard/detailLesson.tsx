"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/component/ui/button"
import Link from "next/link"

export default function LessonDetail() {
    const params = useParams()

    if (!params || !params.id) {
        return <div>Invalid Lesson ID</div>
    }

    const lessonId = params.id

    const [lesson, setLesson] = useState<any>(null)
    const [questions, setQuestions] = useState<any[]>([])
    const [score, setScore] = useState<any[]>([])

    async function fetchLessonDetail() {
        try {
            const res = await fetch(`/api/teacher/lesson/${lessonId}`)
            const data = await res.json()

            setLesson(data)
            setQuestions(data.questions || [])
        } catch (err) {
            console.error(err)
            setLesson(null)
            setQuestions([])
        }
    }

    async function fetchScore() {
        try {
            const res = await fetch(`/api/score-list/${lessonId}`)
            const data = await res.json()

            setScore(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setScore([])
        }
    }


    useEffect(() => {
        fetchLessonDetail()
        fetchScore()
    }, [])

    console.log(score)

    return (
        <>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Lesson Detail
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            {lesson && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    {/* Header gradien untuk highlight nama dan slug */}
                    <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{lesson.title}</h2>
                                {/* <p className="text-indigo-100">@{classroom?.slug}</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* Ubah ke 1 kolom karena hanya 1 field; sesuaikan jika menambah */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Teacher</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">
                                    {lesson.teacher?.fullName || "Not Assigned"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Number of Questions</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">{questions.length}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">{lesson.description || "No description available"}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )}


            <div className="flex items-center justify-between mb-6 mt-8">
                <h1 className="text-3xl font-bold text-white">
                    List Score
                </h1>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Classroom</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">working time</th>
                            {/* <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {score.map((item: any, index: number) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.student?.fullName}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.student?.classroom?.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">{item.score}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        minute: '2-digit',
                                        hour: '2-digit',
                                    })}
                                </td>
                                {/* <td className="py-4 px-6 text-sm">
                                    <div className="flex space-x-2">
                                        <Link href={`course/${item.id}/detail`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-md transition duration-200"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </td> */}
                            </tr>

                        ))}
                        {score.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-8 px-6 text-center text-gray-500 dark:text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        No data yet
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mb-8 mt-10">
                <h1 className="text-3xl font-bold text-white">
                    Questions
                </h1>
                <Button>
                    <Link href={"add-question"}>
                        Add New Question
                    </Link>
                </Button>
            </div>

            {questions.length > 0 ? (
                <div className="space-y-4">
                    {questions.map((q, index) => (
                        <div key={q.id || index} className="border rounded p-4">
                            <p className="font-semibold">{index + 1}. {q.question}</p>
                            <ul className="ml-4 mt-2 list-disc">
                                <li className={q.correct === "A" ? "text-green-600 font-semibold" : ""}>
                                    A. {q.optionA}
                                </li>
                                <li className={q.correct === "B" ? "text-green-600 font-semibold" : ""}>
                                    B. {q.optionB}
                                </li>
                                <li className={q.correct === "C" ? "text-green-600 font-semibold" : ""}>
                                    C. {q.optionC}
                                </li>
                                <li className={q.correct === "D" ? "text-green-600 font-semibold" : ""}>
                                    D. {q.optionD}
                                </li>
                            </ul>
                            <p className="mt-2 text-sm text-gray-500">
                                Correct Answer: {q.correct}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No questions added yet.</p>
            )}

        </>
    )
}
