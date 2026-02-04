import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

interface sendMailProps {
    to: string
    subject: string 
    html: string
}

export async function sendMail({
    to,
    subject,
    html,
}: sendMailProps) {
    return transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
    })
}
