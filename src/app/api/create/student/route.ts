import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, Class, subjectFromFrontend } = body;
    console.log(name, Class, subjectFromFrontend);

    const subjectNames = subjectFromFrontend.map((s: any) => s.subject);

    const subjects = await prisma.subject.findMany({
      where: {
        name: { in: subjectNames },
      },
      select: { id: true, name: true },
    });

    const student = await prisma.student.create({
      data: {
        name,
        class: Class,
      },
    });

    const enrollmentsData = subjectFromFrontend.map((sf: any) => {
      const subject = subjects.find((s) => s.name === sf.subject);
      if (!subject) throw new Error(`Subject not found: ${sf.subject}`);
      console.log(sf);

      return {
        studentId: student.id,
        subjectId: subject.id,
        teacherId: sf.teacherId,
        subjectName: subject.name
      };
    });

    await prisma.enrollment.createMany({
      data: enrollmentsData,
    });

    console.log(student);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Error creating student:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
