"use client"

import DashboardCard from "@/app/tes/components/shared/DashboardCard"
import { Box, Button, Card, CardContent, CardHeader, Chip, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import AddIcon from "@mui/icons-material/Add";

export default function page() {

    const params = useParams()

    if (!params || !params.id) {
        return <div>Invalid Lesson ID</div>
    }

    const lessonId = params.id

    console.log(lessonId)

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
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Lesson Detail
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

            {/* Card */}
            <div className="rounded-2xl mb-8 border border-gray-200 bg-white shadow-sm overflow-hidden">

                {/* Profile Header */}
                <div style={{ backgroundColor: "#5D87FF" }} className="p-6 bg-[#5D87FF]">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {lesson?.title}
                            </h2>
                            {/* <p className="text-sm text-white/80">@{lessons?.slug}</p> */}
                        </div>
                    </div>
                </div>

                {/* Detail */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Teacher</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {lesson?.teacher?.fullName || "Not Assigned"}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Number of Questions</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {questions.length}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Description</span>
                            <p className="text-sm font-semibold text-gray-900">
                                {lesson?.description}
                            </p>
                        </div>
                    </div>


                    <div className="mt-8 flex justify-end">
                        <Button
                            variant="contained"
                            // onClick={onEdit}
                            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white
                       hover:bg-indigo-700 transition"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>

            <DashboardCard title="List Score">
                <Box sx={{ overflow: "auto" }}>
                    <Table sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>No</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Classroom</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>Score</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>working time</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {score.map((item: any, index: number) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Typography fontWeight={500}>
                                            {index + 1}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600}>
                                            {item.student.fullName}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.student?.classroom?.name}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {item.score}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography fontWeight={600} color="textSecondary">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                minute: '2-digit',
                                                hour: '2-digit',
                                            })}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>

            <Card sx={{ mt: 4 }}>
                <CardHeader
                    title="Questions"
                    action={
                        <Link href="add-question">
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                size="small"
                            >
                                Add New Question
                            </Button>
                        </Link>
                    }
                />

                <Divider />

                <CardContent>
                    {questions.length > 0 ? (
                        <Stack spacing={2}>
                            {questions.map((q, index) => (
                                <Card key={q.id || index} variant="outlined">
                                    <CardContent>
                                        <Typography fontWeight={600}>
                                            {index + 1}. {q.question}
                                        </Typography>

                                        <Stack spacing={1} mt={2}>
                                            <Typography color={q.correct === "A" ? "success.main" : "text.secondary"}>
                                                A. {q.optionA}
                                            </Typography>

                                            <Typography color={q.correct === "B" ? "success.main" : "text.secondary"}>
                                                B. {q.optionB}
                                            </Typography>

                                            <Typography color={q.correct === "C" ? "success.main" : "text.secondary"}>
                                                C. {q.optionC}
                                            </Typography>

                                            <Typography color={q.correct === "D" ? "success.main" : "text.secondary"}>
                                                D. {q.optionD}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" mt={2}>
                                            <Chip
                                                label={`Correct: ${q.correct}`}
                                                color="success"
                                                size="small"
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    ) : (
                        <Typography color="text.secondary">
                            No questions added yet.
                        </Typography>
                    )}
                </CardContent>
            </Card>

        </div>
    )
}
