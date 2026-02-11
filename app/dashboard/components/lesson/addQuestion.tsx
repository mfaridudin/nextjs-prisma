"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button, Card, CardContent, Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { DeleteIcon } from "lucide-react"
import { IconArrowLeft } from "@tabler/icons-react"
// import Input from "@/component/ui/input"

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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Add Question
                    </h1>
                    <p className="text-sm text-gray-500">
                        Detail information
                    </p>
                </div>

                <Button
                    variant="contained"
                    startIcon={<IconArrowLeft />}
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>
            </div>
            <Card sx={{ mt: 2 }}>
                <CardContent>
                    <Stack spacing={3}>

                        {questions.map((q, index) => (
                            <Card key={index} variant="outlined">
                                <CardContent>
                                    <Stack spacing={2}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography fontWeight={600}>
                                                Question {index + 1}
                                            </Typography>

                                            {questions.length > 1 && (
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeQuestion(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Stack>

                                        <TextField
                                            label="Question"
                                            value={q.question}
                                            onChange={(e) =>
                                                updateQuestion(index, "question", e.target.value)
                                            }
                                            fullWidth
                                        />

                                        <TextField
                                            label="Option A"
                                            value={q.optionA}
                                            onChange={(e) =>
                                                updateQuestion(index, "optionA", e.target.value)
                                            }
                                            fullWidth
                                        />

                                        <TextField
                                            label="Option B"
                                            value={q.optionB}
                                            onChange={(e) =>
                                                updateQuestion(index, "optionB", e.target.value)
                                            }
                                            fullWidth
                                        />

                                        <TextField
                                            label="Option C"
                                            value={q.optionC}
                                            onChange={(e) =>
                                                updateQuestion(index, "optionC", e.target.value)
                                            }
                                            fullWidth
                                        />

                                        <TextField
                                            label="Option D"
                                            value={q.optionD}
                                            onChange={(e) =>
                                                updateQuestion(index, "optionD", e.target.value)
                                            }
                                            fullWidth
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel>Correct Answer</InputLabel>
                                            <Select
                                                value={q.correct}
                                                label="Correct Answer"
                                                onChange={(e) =>
                                                    updateQuestion(index, "correct", e.target.value)
                                                }
                                            >
                                                <MenuItem value="A">Option A</MenuItem>
                                                <MenuItem value="B">Option B</MenuItem>
                                                <MenuItem value="C">Option C</MenuItem>
                                                <MenuItem value="D">Option D</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}

                        <Divider />

                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={addQuestion}>
                                Add Question
                            </Button>

                            <Button variant="contained" onClick={handleSaveAll}>
                                Save All Questions
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}
