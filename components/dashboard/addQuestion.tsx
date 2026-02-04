"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default function AddQuestion() {
    const params = useParams()

    if (!params || !params.id) {
        return <div>Invalid Lesson ID</div>
    }

    const lessonId = params.id

    const [lesson, setLesson] = useState<any>(null)

    const [questions, setQuestions] = useState([
        {
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            correct: "A"
        }
    ])

    async function fetchDetail() {
        const res = await fetch(`/api/teacher/lesson/${lessonId}`)
        const data = await res.json()

        setLesson(data)

        if (data.questions?.length > 0) {
            setQuestions(data.questions)
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [])

    function addQuestion() {
        setQuestions([
            ...questions,
            {
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correct: "A"
            }
        ])
    }

    function removeQuestion(index: number) {
        const updated = questions.filter((_, i) => i !== index)
        setQuestions(updated)
    }

    function updateQuestion(index: number, field: string, value: string) {
        const updated = [...questions]
        updated[index] = {
            ...updated[index],
            [field]: value
        }

        setQuestions(updated)
    }

    async function handleSaveAll() {
        const res = await fetch("/api/teacher/question/bulk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lessonId,
                questions
            })
        })

        if (res.ok) {
            alert("Questions saved successfully!")
            fetchDetail()
        } else {
            alert("Failed to save questions")
        }

        setQuestions([
            {
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correct: "A"
            }
        ])
    }

    console.log("LESSON DATA:", lesson)

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">

            </h1>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Add / Edit Questions
                </h1>
                <button
                    onClick={() => window.history.back()}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    Back to List
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

                <div className="p-6 bg-linear-to-r from-indigo-500 to-purple-600">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Lesson {lesson?.title || "Unknown"}</h2>
                        </div>
                    </div>
                </div>

                {lesson && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                                <p className="text-lg text-gray-900 dark:text-gray-100">{lesson.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    
                    {questions.map((q, index) => (
                        <div key={index} className="border p-4 rounded mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold">
                                    Question {index + 1}
                                </h3>

                                {questions.length > 1 && (
                                    <button
                                        onClick={() => removeQuestion(index)}
                                        className="text-red-500 text-sm"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <Input
                                label="Question"
                                value={q.question}
                                onChange={(e) =>
                                    updateQuestion(index, "question", e.target.value)
                                }
                            />

                            <Input
                                label="Option A"
                                value={q.optionA}
                                onChange={(e) =>
                                    updateQuestion(index, "optionA", e.target.value)
                                }
                            />

                            <Input
                                label="Option B"
                                value={q.optionB}
                                onChange={(e) =>
                                    updateQuestion(index, "optionB", e.target.value)
                                }
                            />

                            <Input
                                label="Option C"
                                value={q.optionC}
                                onChange={(e) =>
                                    updateQuestion(index, "optionC", e.target.value)
                                }
                            />

                            <Input
                                label="Option D"
                                value={q.optionD}
                                onChange={(e) =>
                                    updateQuestion(index, "optionD", e.target.value)
                                }
                            />

                            <div className="mt-2">
                                <label className="text-sm font-medium">
                                    Correct Answer
                                </label>

                                <select
                                    className="border p-2 rounded w-full mt-1"
                                    value={q.correct}
                                    onChange={(e) =>
                                        updateQuestion(index, "correct", e.target.value)
                                    }
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-3 mt-4">
                        <Button onClick={addQuestion}>
                            + Add More Question
                        </Button>

                        <Button onClick={handleSaveAll}>
                            Save All Questions
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
