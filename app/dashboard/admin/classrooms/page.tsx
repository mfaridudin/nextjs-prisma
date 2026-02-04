import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Classroom from "@/components/dashboard/classroom"

export default async function page() {
  // const session = await getServerSession(authOptions)

  // if (!session || !session.user) {
  //   return <div>Unauthorized</div>
  // }

  // const user = session.user
  // const schoolId = user.schoolId

  // console.log("ini dari classroom :",schoolId)

  // const classrooms = await prisma.classroom.findMany({
  //   where: { schoolId: schoolId },
  // })

  return <Classroom />
}
