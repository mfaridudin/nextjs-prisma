import {
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import DashboardCard from "@/app/dashboard/components/shared/DashboardCard";
import { useEffect, useState } from "react";

const RecentSubmissions = () => {

    interface recentSubmission {
        id: number;
        student: string;
        lesson: string;
        score: number;
        date: string;
    }

    const [submissions, setSubmissions] = useState<recentSubmission[]>([]);


    async function fetchSubmissions() {
        try {
            const res = await fetch("/api/teacher/recent-submmision");
            const data = await res.json();
            setSubmissions(data);
        } catch (error) {
            console.error("Error fetch sumbission:", error);
        }
    }

    useEffect(() => {
        fetchSubmissions();
    }, []);
    // dummy data
    // const submissions = [
    //     {
    //         id: 1,
    //         student: "Andi",
    //         lesson: "Variables Quiz",
    //         score: 90,
    //         date: "10 Feb 2026",
    //     },
    //     {
    //         id: 2,
    //         student: "Siti",
    //         lesson: "Loop Exercise",
    //         score: 85,
    //         date: "9 Feb 2026",
    //     },
    //     {
    //         id: 3,
    //         student: "Budi",
    //         lesson: "Array Practice",
    //         score: 88,
    //         date: "8 Feb 2026",
    //     },
    // ];

    console.log(submissions)

    return (
        <DashboardCard title="Recent Submissions">
            <Stack spacing={2} sx={{
                height: 300,
                overflowY: "auto",
                // maxHeight: 320,
                pr: 1,
                /* scrollbar styling */
                "&::-webkit-scrollbar": {
                    width: 5,
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#cbd5e1",
                    borderRadius: 10,
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#94a3b8",
                }
            }}
            >
                {submissions.map((item, index) => (
                    <div key={item.id}>
                        <Typography fontWeight="600">{item.student}</Typography>

                        <Typography variant="body2" color="textSecondary">
                            {item.lesson} • Score: {item.score}
                        </Typography>

                        <Typography variant="caption" color="textSecondary">
                            {item.date}
                        </Typography>

                        {index !== submissions.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </div>
                ))}
            </Stack>
        </DashboardCard>
    );
};

export default RecentSubmissions;
