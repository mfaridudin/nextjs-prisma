import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = session.user
    const schoolId = Number(user.schoolId)

    if (Number(user.roleId) === 1) {
        // const courses = await prisma.course.findMany({
        //     where: { schoolId },
        // })
        const { data: course } = await supabase
            .from("Course")
            .select(`*,
                 teachers:User (
                    id,
                    fullName,
                    email
                )`
            )
            .eq("schoolId", schoolId)

        return NextResponse.json(course)
    }

    if (Number(user.roleId) === 2) {
        const { data: courses, error } = await supabase
            .from("Course")
            .select(`
                id,
                name,
                schoolId,
                teachers:User (
                    id,
                    fullName,
                    email
                )
            `)
            .eq("schoolId", schoolId);


        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json(courses ?? []);
    }



    return NextResponse.json({ message: "Forbidden" }, { status: 403 })
}


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const schoolId = Number(session.user.schoolId);

    const { data: newCourse, error: insertError } = await supabase
        .from("Course")
        .insert({
            name: body.name,
            schoolId: schoolId,
        })
        .select()
        .single();

    if (insertError) {
        console.error("Insert Course Error:", insertError);
        return NextResponse.json(
            { message: insertError.message },
            { status: 500 }
        );
    }

    const { error: updateUserError } = await supabase
        .from("User")
        .update({
            courseId: newCourse.id,
        })
        .eq("id", body.teacherId);


    if (updateUserError) {
        console.error("Pivot Error:", updateUserError);
        return NextResponse.json(
            { message: updateUserError.message },
            { status: 500 }
        );
    }


    return NextResponse.json(
        { course: newCourse },
        { status: 201 }
    );
}


// export async function DELETE(request: Request) {
//     const session = await getServerSession(authOptions)

//     if (!session || !session.user) {
//          return new Response(
//             JSON.stringify({ message: "Unauthorized" }),
//             { status: 401 }
//          )
//      }

//     const body = await request.json()

//     const deletedCourse = await prisma.course.delete({
//         where: {
//             id: body.id,
//         }
//     })

//     return NextResponse.json(deletedCourse, { status: 201 })
// }