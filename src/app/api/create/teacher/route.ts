import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {name, subject1} = body.data;
        console.log(name, subject1);

        if (!name || !subject1) {
            return NextResponse.json({ message: "Name and subjectName are required" }, { status: 400 });
        }

        if (subject1 !== 'none') {
            const subject = await prisma.subject.findFirst({ where: { name: subject1 } });

            if (!subject) {
                return NextResponse.json({ error: "Subject not found" }, { status: 404 });
            }

            const teacher = await prisma.teacher.create({
                data: {
                    name,
                    subjects: { connect: { id: subject.id } },
                },
            });

            return NextResponse.json({ success: true, teacher }, { status: 201 });
        }


        const teacher = await prisma.teacher.create({
            data: {name}
        });

        return NextResponse.json({ success: true, teacher }, { status: 201 });

    } catch (err) {
        console.error("Error creating teacher:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
