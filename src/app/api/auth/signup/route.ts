import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { accountType, name, password, passcode } = body.data;
        console.log(accountType, name, password, passcode);

        if (!name || !accountType || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // let userexists = await prisma.user.findOne({
        //     where: {
        //         name: name
        //     }
        // });
        // console.log(userexists);

        // if(userexists){
        //     return NextResponse.json({ success: false, error: "User Already exists" }, { status: 409 });
        // }

        let newUser = {};
        if (accountType === 'Admin' && passcode === process.env.ADMIN_PASSCOD) {
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser = await prisma.user.create({
                data: {
                    name,
                    password: hashedPassword,
                    role: "Admin",
                    status: "active"
                },
            });

            const sessionCookie = jwt.sign({ payload: newUser, jti: Math.floor(Date.now() / 1000) }, process.env.JWT_ID!, { expiresIn: "30d" });

            (await cookies()).set("sessionCookie", sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // only HTTPS in prod
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            })

        }

        else if (accountType === "Teacher" && passcode === process.env.TACHR_PASSCOD) {
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser = await prisma.user.create({
                data: {
                    name,
                    password: hashedPassword,
                    role: "Teacher",
                    status: "active"
                },
            });

            const sessionCookie = jwt.sign({ payload: newUser, jti: Math.floor(Date.now() / 1000) }, process.env.JWT_ID!, { expiresIn: "30d" });

            (await cookies()).set("sessionCookie", sessionCookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // only HTTPS in prod
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 30
            })
        }

        else if (accountType === "Student") {
            const hashedPassword = await bcrypt.hash(password, 10);
            newUser = await prisma.user.create({
                data: {
                    name,
                    password: hashedPassword,
                    role: "Student",
                    status: "pending"
                }
            })
        }

        else {
            return NextResponse.json({ success: false, message: "Invalid Passcode!" }, { status: 401 });
        }

        return NextResponse.json(
            { success: true, message: "User signed up!", user: newUser },
            { status: 201 }
        );

    } catch (err) {
        console.error("Error parsing body:", err);
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
}