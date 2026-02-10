export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 30);// 30 mins
    await prisma.user.update({
        where: { email },
        data: {
            resetToken: token,
            resetTokenExpiry/* resetTokenExpiry : showing error*/: expiry,
        },
    });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 30 minutes.</p>
        `,
    });

    return NextResponse.json({ success: true })
};