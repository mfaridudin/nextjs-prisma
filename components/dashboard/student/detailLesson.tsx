"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/components/ui/button"
import { useUserStore } from "@/store/useUserStore"


export default function StudentLessonPage() {
    const { user } = useUserStore()

    // console.log("USER DATA:", user?.id)

    const params = useParams()

    if (!params || !params.id) {
        return <div>Invalid Lesson ID</div>
    }

    const lessonId = params.id

    const [lesson, setLesson] = useState<any>(null)
    const [answers, setAnswers] = useState<any>({})
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState<number | null>(null)

    async function fetchLesson() {
        const res = await fetch(`/api/student/lesson/${lessonId}`)
        const data = await res.json()

        setLesson(data)

        if (data.submission) {
            setScore(data.submission.score)
            setSubmitted(true)
        }
    }


    useEffect(() => {
        fetchLesson()
    }, [])

    function handleChange(questionId: number, value: string) {
        setAnswers({
            ...answers,
            [questionId]: value
        })
    }

    async function handleSubmit() {
        const payload = {
            studentId: user?.id,
            lessonId: Number(lessonId),
            answers: Object.keys(answers).map(id => ({
                questionId: Number(id),
                answer: answers[id]
            }))
        }

        const res = await fetch("/api/student/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (res.ok) {
            setScore(data.score)
            setSubmitted(true)

            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            alert(data.message)
        }
    }

    if (!lesson) return <div>Loading...</div>

    // if (submitted) {
    //     return (
    //         <div className="p-6">
    //             <h1 className="text-2xl font-bold">
    //                 You already submitted
    //             </h1>

    //             <p className="mt-4 text-xl">
    //                 Your Score: {score}
    //             </p>
    //         </div>
    //     )
    // }

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
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Jumlah Soal</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">{lesson.questions?.length}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">{lesson.description || "No description available"}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    Your Score
                                </label>

                                <p className="text-lg font-semibold text-green-600">
                                    {submitted
                                        ? score
                                        : <span className="text-red-600">Not submitted yet</span>}
                                </p>
                            </div>


                        </div>
                    </div>

                    {!submitted && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                            <h1 className="text-2xl font-bold mb-4">
                                Do the questions carefully
                            </h1>

                            {lesson.questions.map((q: any, index: number) => (
                                <div key={q.id} className="mb-6 border p-4 rounded">
                                    <p className="font-semibold">
                                        {index + 1}. {q.question}
                                    </p>

                                    {["A", "B", "C", "D"].map(opt => (
                                        <div key={opt} className="mt-2">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    value={opt}
                                                    onChange={() =>
                                                        handleChange(q.id, opt)
                                                    }
                                                />
                                                <span className="ml-2">
                                                    {q[`option${opt}`]}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <Button onClick={handleSubmit}>
                                Submit Answers
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
