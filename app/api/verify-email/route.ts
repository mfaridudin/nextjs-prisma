import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
        console.log("Token missing in request");
        return NextResponse.json({ success: false, message: "Token missing" }, { status: 400 });
    }

    const { data: tokenData, error: tokenError } = await supabase
        .from("EmailVerificationToken")
        .select("id, userId, expiresAt")
        .eq("token", token)
        .maybeSingle();

    if (tokenError) {
        console.log("Supabase token error:", tokenError);
        return NextResponse.json({ success: false, message: tokenError.message }, { status: 500 });
    }

    console.log("Token data:", tokenData);

    if (!tokenData) {
        return NextResponse.json({ success: false, message: "Token not found" }, { status: 400 });
    }

    if (!tokenData.expiresAt || new Date(tokenData.expiresAt) < new Date()) {
        return NextResponse.json({ success: false, message: "Token expired" }, { status: 400 });
    }

    const { error: updateError } = await supabase
        .from("User")
        .update({ emailVerified: true })
        .eq("id", tokenData.userId);

    if (updateError) {
        console.log("Supabase update user error:", updateError);
        return NextResponse.json({ success: false, message: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, userId: tokenData.userId });
}
