import LessonsPage from "@/components/dashboard/lessonpage";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div className="text-white">Unauthorized</div>
  }

  const user = session.user

  const courses =
    Number(user.roleId) === 1
      ? await prisma.course.findMany()
      : await prisma.course.findMany({
        where: {
          teachers: {
            some: { id: Number(user.id) },
          },
        },
      })

  return <LessonsPage courses={courses} url="/api/student/lesson" />;
}
