import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {teacherName} = body;

        const teacher = await prisma.teacher.findFirst({
            where: {name: teacherName},
            include: {enrollments: true}
        });

        const studentIds: string[] = [];
        teacher?.enrollments.map((e) => studentIds.push(e.studentId));

        const students = await prisma.student.findMany({
            where: {id: {in: studentIds}}
        });

        if(!students || students.length === 0) return NextResponse.json({message: "No Students found for this teacher", noStud: true}, {status: 200});

        return NextResponse.json({success: true, students}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Internal Server error"}, {status: 500})
    }
}