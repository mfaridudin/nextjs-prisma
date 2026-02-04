"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default function LessonDetailPage() {
    const params = useParams()
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

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Lesson Detail
                </h1>

                {lesson && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold">{lesson.title}</h2>
                        <p>{lesson.description}</p>
                    </div>
                )}

                <h2 className="text-lg font-semibold mb-3">
                    Create / Edit Questions
                </h2>

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
        </>
    )
}
