import { prisma } from "@/lib/prisma"
import { supabase } from "@/lib/supabase"

import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")


    if (isNaN(id)) {
        return new Response(
            JSON.stringify({ message: "Invalid ID" }),
            { status: 400 }
        )
    }

    try {
        const { data: lesson, error } = await supabase
            .from("Lesson")
            .select(`
                id,
                title,
                description,
                createdAt,
                course:Course (*),
                classroom:Classroom (*),
                teacher:User (*),
                questions:Question (*)
            `)
            .eq("id", id)
            .single();

        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }


        if (!lesson) {
            return new Response(
                JSON.stringify({ message: "Lesson not found" }),
                { status: 404 }
            )
        }

        return NextResponse.json(lesson)
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        )
    }
}


export async function DELETE(request: Request) {
    // const session = await getServerSession(authOptions)

    // if (!session || !session.user) {
    //     return new Response(
    //         JSON.stringify({ message: "Unauthorized" }),
    //         { status: 401 }
    //     )
    // }

    const url = new URL(request.url)
    const idString = url.pathname.split("/").pop()

    const id = parseInt(idString || "")


    if (isNaN(id)) {
        return new Response(
            JSON.stringify({ message: "Invalid ID" }),
            { status: 400 }
        )
    }
    // const body = await request.json()
    const { data: deletedLesson, error } = await supabase
        .from("Lesson")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }


    return NextResponse.json(deletedLesson, { status: 201 })
}