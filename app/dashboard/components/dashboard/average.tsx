import { Card, CardContent, Typography } from "@mui/material";

export default function AverageScoreCard({ value }: any) {
    return (
        <Card>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Average Score
                </Typography>

                <Typography variant="h4" fontWeight={700}>
                    {value.toFixed(1)}
                </Typography>
            </CardContent>
        </Card>
    );
}
