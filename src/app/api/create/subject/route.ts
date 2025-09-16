import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, board } = body.data;

        if (!name || !board) {
            return NextResponse.json({ message: "Name and board are required" }, { status: 400 });
        }

        const subject = await prisma.subject.create({
            data: { name: `${name}(${board})` }
        });

        return NextResponse.json({ success: true, message: "Created Successfully", subject }, { status: 201 });
    } catch (err) {
        console.error("Error creating teacher:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}