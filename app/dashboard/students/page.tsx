import Students from "@/components/dashboard/student"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"

export default async function page() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return <div>Unauthorized</div>
    }

    const students = await prisma.user.findMany({
        where: {
            schoolId: Number(session.user.schoolId),
            roleId: 3
        }
    })

    console.log(students)

    // const data = await fetch("http://127.0.0.1:3000/api/teacher", {
    //     cache: "no-store",
    // })

    // const json = await data.json()

    // console.log(json)

    return (
        <div>
            <Students />
        </div>
    )
}
