import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    select: {
      id: true,
      roleId: true,
      fullName: true,
      username: true,
      email: true,
      address: true,
      schoolId: true,
      role: {
        select: {
          name: true,
        },
      },
      school: {
        select: {
          name: true,
          slug: true,
          address: true,
        },
      },
    },
  })

  if (!user) {
    return new Response(
      JSON.stringify({ message: "User not found" }),
      { status: 404 }
    )
  }

  return Response.json(user)
}
