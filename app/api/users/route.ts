import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendMail } from "@/lib/mail";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function GET() {
    try {
        const { data: users, error } = await supabase
            .from("User")
            .select("*, role(name)");

        if (error) throw error;

        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.fullName || !body.email || !body.password || !body.password_confirmation) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (body.password !== body.password_confirmation) {
            return NextResponse.json({ error: "Password confirmation does not match" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const { data: newUser, error: insertError } = await supabase
            .from("User")
            .insert([{
                fullName: body.fullName,
                username: body.username || null,
                address: body.address || null,
                email: body.email,
                password: hashedPassword,
                age: body.age ? Number(body.age) : null,
                dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth).toISOString() : null,
                roleId: 1,
                emailVerified: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }])
            .select()
            .single();

        if (insertError) throw insertError;

        // Email verification token
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        await supabase.from("emailVerificationToken").insert([{
            token,
            userId: newUser.id,
            expiresAt,
        }]);

        // Optional: send email
        await sendMail({
            to: newUser.email,
            subject: "Verifikasi Email Akun Anda",
            html: `
        <div style="max-width:600px;margin:auto;font-family:sans-serif;">
          <h2>Halo ${newUser.fullName ?? "User"} 👋</h2>
          <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah untuk memverifikasi email Anda.</p>
          <a href="${BASE_URL}/auth/verify-email?token=${token}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;margin-top:16px;">Verifikasi Email</a>
          <p style="margin-top:24px;font-size:12px;color:#666;">Link ini akan kedaluwarsa dalam 24 jam.</p>
        </div>
      `,
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 });
    }
}
