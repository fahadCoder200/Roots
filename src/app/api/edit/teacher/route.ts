import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { subject1, id, subject2 } = body;

        if (subject2 !== "none") {
            const subject_2 = await prisma.subject.findFirst({ where: { name: subject2 } });
            const subject_1 = await prisma.subject.findFirst({ where: { name: subject1 } });

            const teacher = await prisma.teacher.update({
                where: { id },
                data: {
                    subjects: {
                        set: [{ id: subject_1?.id }, { id: subject_2?.id }]
                    }
                }
            });

            return NextResponse.json({ success: true }, { status: 200 });
        }
        const subject_1 = await prisma.subject.findFirst({ where: { name: subject1 } });

        const teacher = await prisma.teacher.update({
            where: { id },
            data: {
                subjects: {
                    set: { id: subject_1?.id }
                }
            }
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error("Error creating teacher:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        await prisma.teacher.delete({
            where: { id }
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Error creating teacher:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}