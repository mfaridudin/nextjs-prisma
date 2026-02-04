"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/components/ui/button"
import Link from "next/link"

export default function LessonQuestionsPage() {
    const params = useParams()

    if (!params || !params.id) {
        return <div>Invalid Lesson ID</div>
    }

    const lessonId = params.id

    const [lesson, setLesson] = useState<any>(null)
    const [questions, setQuestions] = useState<any[]>([])

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

    useEffect(() => {
        fetchLessonDetail()
    }, [])

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
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Jumlah Soal</label>
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
