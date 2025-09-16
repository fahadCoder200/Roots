import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const subjects = await prisma?.subject.findMany({
            include: { teachers: true }
        });

        return NextResponse.json({ subjects }, { status: 200 });
    } catch (err) {
        console.error("Error creating teacher:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}