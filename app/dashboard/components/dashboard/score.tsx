"use client";

import {
    Card,
    CardContent,
    Typography,
    Grid,
    Stack,
    LinearProgress,
    Avatar,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";


function ScoreCard({ title, value, icon, color }: any) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                height: "100%",
                minHeight: 169,
                minWidth: 170
            }}
        >
            <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                    sx={{
                        bgcolor: color,
                        width: 42,
                        height: 42,
                        margin: "0 auto",
                        mb: 1,
                    }}
                >
                    {icon}
                </Avatar>

                <Typography variant="h4" fontWeight={700}>
                    {value ?? 0}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={value ?? 0}
                    sx={{ mt: 2, height: 6, borderRadius: 5 }}
                />
            </CardContent>
        </Card>
    );
}

export default function ScoreSummary() {

    const [scores, setScores] = useState<any[]>([]);

    async function fetchScore() {
        try {
            const res = await fetch("/api/student/score");
            const data = await res.json();

            console.log("scores:", data);

            setScores(Array.isArray(data) ? data : []);
        } catch {
            setScores([]);
        }
    }

    useEffect(() => {
        fetchScore();
    }, []);

    const avg = scores.reduce((a, b) => a + b.score, 0) / scores.length || 0
    const bestScore = Math.max(...scores.map(s => s.score), 0)
    const worstScore = Math.min(...scores.map(s => s.score), 0)

    return (
        <Grid container spacing={2} direction="column">
            <Grid size={{ xs: 6 }}>
                <ScoreCard
                    title="Average Score"
                    value={avg}
                    icon={<TrendingUpIcon />}
                    color="#1976d2"
                    sx={{ width: "100%" }}
                />
            </Grid>

            <Grid size={{ xs: 6 }}>
                <ScoreCard
                    title="Best Score"
                    value={bestScore}
                    icon={<EmojiEventsIcon />}
                    color="#2e7d32"
                    sx={{ width: "100%" }}
                />
            </Grid>

            <Grid size={{ xs: 6 }}>
                <ScoreCard
                    title="Lowest Score"
                    value={worstScore}
                    icon={<ArrowDownwardIcon />}
                    color="#d32f2f"
                    sx={{ width: "100%" }}
                />
            </Grid>
        </Grid>

    );
}
