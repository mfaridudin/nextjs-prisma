"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import PageContainer from "@/app/dashboard/components/container/PageContainer";

export default function StudentLessonPage() {
  const { user } = useUserStore();
  const params = useParams();

  if (!params || !params.id) {
    return <div>Invalid Lesson ID</div>;
  }

  const lessonId = params.id;

  const [lesson, setLesson] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  async function fetchLesson() {
    const res = await fetch(`/api/student/lesson/${lessonId}`);
    const data = await res.json();

    setLesson(data);

    if (data.submissions && data.submissions.length > 0) {
      setScore(data.submissions[0].score);
      setSubmitted(true);
    }
  }

  useEffect(() => {
    fetchLesson();
  }, []);

  function handleChange(questionId: number, value: string) {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  }

  async function handleSubmit() {
    const payload = {
      studentId: user?.id,
      lessonId: Number(lessonId),
      answers: Object.keys(answers).map((id) => ({
        questionId: Number(id),
        answer: answers[id],
      })),
    };

    const res = await fetch("/api/student/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setScore(data.score);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert(data.message);
    }
  }

  const submission = lesson?.submissions?.[0]

  const answerMap = submission
    ? Object.fromEntries(
      submission.answers.map((a: any) => [a.questionId, a])
    )
    : {}

  if (!lesson) return <div>Loading...</div>;

  return (
    <PageContainer>
      <Box>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight={700}>
            Lesson Detail
          </Typography>

          <Button variant="contained" onClick={() => window.history.back()}>
            Back
          </Button>
        </Stack>

        {/* Lesson Info */}
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            {lesson.title}
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">Questions</Typography>
              <Typography fontWeight={600}>
                {lesson.questions?.length}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">Description</Typography>
              <Typography fontWeight={600}>
                {lesson.description || "-"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">Your Score</Typography>
              <Typography
                fontWeight={700}
                color={submitted && score! > 50 ? "success.main" : "error.main"}
              >
                {submitted ? score : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* answrs question */}
        {submitted && submission && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              Questions Review
            </Typography>

            {lesson.questions.map((q: any, index: number) => {
              const userAnswer = answerMap[q.id]

              return (
                <Box key={q.id} mb={3}>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Typography fontWeight={600} mb={1}>
                      {index + 1}. {q.question}
                    </Typography>

                    <Chip
                      label={userAnswer?.isCorrect ? "Correct" : "Wrong"}
                      color={userAnswer?.isCorrect ? "success" : "error"}
                      size="small"
                    />
                  </Stack>

                  <Stack spacing={1} mb={1}>
                    <RadioGroup value={userAnswer?.answer || ""}>
                      {["A", "B", "C", "D"].map((opt) => {
                        const optionText = q[`option${opt}`]

                        return (
                          <FormControlLabel
                            key={opt}
                            value={opt}
                            disabled
                            control={
                              <Radio />
                            }
                            label={optionText}
                          />
                        )
                      })}
                    </RadioGroup>
                  </Stack>

                  {!userAnswer?.isCorrect && (
                    <Chip
                      label={`Correct Answer: ${q.correct}`}
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              )
            })}
          </Card>
        )}

        {/* Questions */}
        {!submitted && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
              Questions
            </Typography>

            {lesson.questions.map((q: any, index: number) => (
              <Box key={q.id} mb={3}>
                <Typography fontWeight={600} mb={1}>
                  {index + 1}. {q.question}
                </Typography>

                <RadioGroup
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <FormControlLabel value="A" control={<Radio />} label={q.optionA} />
                  <FormControlLabel value="B" control={<Radio />} label={q.optionB} />
                  <FormControlLabel value="C" control={<Radio />} label={q.optionC} />
                  <FormControlLabel value="D" control={<Radio />} label={q.optionD} />
                </RadioGroup>

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}

            <Button
              disabled={lesson.questions?.length === 0}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit Answers
            </Button>

          </Card>
        )}
      </Box>
    </PageContainer>
  );
}
