import { sendMail } from "@/lib/mail"

export async function GET() {
    await sendMail({
        to: "test@example.com",
        subject: "Test Email",
        html: "<h2>Nodemailer + Mailtrap berhasil 🎉</h2>",
    })

    return Response.json({ success: true })
}
