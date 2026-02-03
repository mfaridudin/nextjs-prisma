import Course from "@/components/dashboard/course"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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

  return <Course courses={courses} />
}
