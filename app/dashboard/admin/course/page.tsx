import Course from "@/components/dashboard/course"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export default async function page() {
  // const { user } = useUserStore()
  // const res = await fetch('http://localhost:3000/api/course', {
  //   cache: 'no-store'
  // });
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div className="text-white">Unauthorized</div>
  }

  const user = session.user

  let courses: { name: string; id: number; createdAt: Date; updatedAt: Date }[] = []

  if (Number(user.roleId) === 1) {
    courses = await prisma.course.findMany()
  } else if (Number(user.roleId) === 2) {
    courses = await prisma.course.findMany({
      where: {
        teachers: {
          some: { id: Number(user.id) },
        },
      },
    })
  }

  const data = courses;
  console.log("USER ADMIN PAGE:", data)
  return <Course courses={data} />

}
