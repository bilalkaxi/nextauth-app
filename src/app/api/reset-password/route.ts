import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: { gt: new Date() },

        },
    });

    if (!user) {
        return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashed,
            resetToken: null,
            resetTokenExpiry: null,
        },
    });
    return NextResponse.json({ success: true })
}