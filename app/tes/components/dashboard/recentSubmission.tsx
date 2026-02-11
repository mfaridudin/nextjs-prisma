import {
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import DashboardCard from "@/app/tes/components/shared/DashboardCard";

const RecentSubmissions = () => {
    // dummy data
    const submissions = [
        {
            id: 1,
            student: "Andi",
            lesson: "Variables Quiz",
            score: 90,
            date: "10 Feb 2026",
        },
        {
            id: 2,
            student: "Siti",
            lesson: "Loop Exercise",
            score: 85,
            date: "9 Feb 2026",
        },
        {
            id: 3,
            student: "Budi",
            lesson: "Array Practice",
            score: 88,
            date: "8 Feb 2026",
        },
    ];

    return (
        <DashboardCard title="Recent Submissions">
            <Stack spacing={2}>
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
