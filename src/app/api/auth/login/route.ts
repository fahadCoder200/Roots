import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { accountType, name, password } = body.data;

        if (!name || !accountType || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = await prisma!.user.findFirst({
            where: { name }
        });

        if(!user || user.role !== accountType) return NextResponse.json({success: false, message: "Login Failed!"}, {status: 404});

        if (user.status === "pending") {
            return NextResponse.json({ success: false, message: "Account is Pending" }, { status: 401 });
        }

        if (await bcrypt.compare(password, user.password)) {
            let sessionCookie = jwt.sign({ payload: user, jti: Math.floor(Date.now() / 1000) }, process.env.JWT_ID!, { expiresIn: "30d" });

            (await cookies()).set("sessionCookie", sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            });

            return NextResponse.json({success: true, message: "Login Successfull"}, {status: 200});
        }

        return NextResponse.json({success: false, message: "Password Incorrect!"}, {status: 404});

    } catch (err) {
        console.error("Error parsing body:", err);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}