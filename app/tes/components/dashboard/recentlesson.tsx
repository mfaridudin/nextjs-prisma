import {
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import DashboardCard from "@/app/tes/components/shared/DashboardCard";

const RecentLessons = () => {
    // dummy data
    const lessons = [
        {
            id: 1,
            title: "Variables Quiz",
            course: "Programming Basics",
            classroom: "XI RPL 1",
            date: "10 Feb 2026",
        },
        {
            id: 2,
            title: "Loop Exercise",
            course: "Programming Basics",
            classroom: "XI RPL 1",
            date: "8 Feb 2026",
        },
        {
            id: 3,
            title: "Array Practice",
            course: "Programming Basics",
            classroom: "XI RPL 1",
            date: "5 Feb 2026",
        },
         {
            id: 3,
            title: "Array Practice",
            course: "Programming Basics",
            classroom: "XI RPL 1",
            date: "5 Feb 2026",
        },
    ];

    return (
        <DashboardCard title="Recent Lessons">
            <Stack spacing={2}>
                {lessons.map((lesson, index) => (
                    <div key={lesson.id}>
                        <Typography fontWeight="600">{lesson.title}</Typography>

                        <Typography variant="body2" color="textSecondary">
                            {lesson.course} • {lesson.classroom}
                        </Typography>

                        <Typography variant="caption" color="textSecondary">
                            {lesson.date}
                        </Typography>

                        {index !== lessons.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </div>
                ))}
            </Stack>
        </DashboardCard>
    );
};

export default RecentLessons;
