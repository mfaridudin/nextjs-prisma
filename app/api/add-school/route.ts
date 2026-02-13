import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { createSchoolSchema } from "@/lib/validators/school"
import { supabase } from "@/lib/supabase"


export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = parseInt(session.user.id)

    const { data: school, error } = await supabase
        .from("School")
        .select(`
            *,
            school_users!inner(user_id)
        `)
        .eq("school_users.user_id", userId)

    if (error) {
        console.error(error)
    }


    return NextResponse.json({ school }, { status: 200 })
}


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const userId = Number(session.user.id)

    const body = await request.json()
    const result = createSchoolSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    try {
        const { name, address, slug, educationLevel } = result.data

        const { data: newSchool, error: schoolError } = await supabase
            .from("School")
            .insert([
                {
                    name: body.name,
                    slug: body.slug,
                    address: body.address,
                    educationLevel: body.educationLevel,
                }
            ])
            .select()
            .single()

        if (schoolError) {
            console.error(schoolError)
        }


        const { error: userUpdateError } = await supabase
            .from("User")
            .update({
                schoolId: newSchool.id
            })
            .eq("id", userId)

        if (userUpdateError) {
            console.error("Eror Update School Id: ", userUpdateError)
        }


        const { data: updatedUser, error: userError } = await supabase
            .from("User")
            .select("*")
            .eq("id", userId)
            .single()

        if (userError) {
            console.error("Eror Dari sini", userError)
        }


        return NextResponse.json({
            school: newSchool,
            redirect: "/dashboard",
            message: "School created successfully",
            user: {
                id: updatedUser?.id,
                email: updatedUser?.email,
                roleId: updatedUser?.roleId,
                schoolId: updatedUser?.schoolId,
                classroomId: updatedUser?.classroomId
            }
        }, { status: 201 })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json(
            { error: error.message || "Failed to create school" },
            { status: 500 }
        )
    }
}
