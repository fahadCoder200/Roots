import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// --- Types ---
interface SubjectInput {
  subject: string;
  teacherId: string;
}

interface GradeInput {
  subjectName: string;
  firstSessionGrade: string;
  secondSessionGrade?: string;
}

interface PatchBody {
  id: string;
  name: string;
  Class: string;
  subjectFromFrontend: SubjectInput[];
  gradePerSubject: GradeInput[];
}

export async function PATCH(req: Request) {
  try {
    const body: PatchBody = await req.json();
    const { name, Class, subjectFromFrontend, gradePerSubject, id } = body;

    const student = await prisma.student.update({
      where: { id },
      data: { name, class: Class },
      include: { enrollments: true },
    });

    if (subjectFromFrontend && subjectFromFrontend.length > 0) {
      await prisma.enrollment.deleteMany({ where: { studentId: student.id } });

      const subjects = await prisma.subject.findMany({
        where: { name: { in: subjectFromFrontend.map((s) => s.subject) } },
        select: { id: true, name: true },
      });

      await prisma.enrollment.createMany({
        data: subjectFromFrontend.map((sf) => {
          const subject = subjects.find((s) => s.name === sf.subject);
          if (!subject) throw new Error(`Subject not found: ${sf.subject}`);

          return {
            studentId: student.id,
            subjectId: subject.id,
            teacherId: sf.teacherId,
            subjectName: subject.name,
          };
        }),
      });
    }

    const freshStudent = await prisma.student.findFirst({
      where: { id },
      include: { enrollments: true },
    });
    if (!freshStudent) return NextResponse.json({}, { status: 404 });

    await Promise.all(
      gradePerSubject.map(async (subObj) => {
        const enrollment = freshStudent.enrollments.find(
          (e) => e.subjectName === subObj.subjectName
        );
        if (!enrollment) return;

        await prisma.grade.upsert({
          where: {
            enrollmentId_session: {
              enrollmentId: enrollment.id,
              session: "firstSession",
            },
          },
          update: { grade: subObj.firstSessionGrade },
          create: {
            session: "firstSession",
            grade: subObj.firstSessionGrade,
            enrollmentId: enrollment.id,
          },
        });

        if (subObj.secondSessionGrade && subObj.secondSessionGrade !== "none") {
          await prisma.grade.upsert({
            where: {
              enrollmentId_session: {
                enrollmentId: enrollment.id,
                session: "secondSession",
              },
            },
            update: { grade: subObj.secondSessionGrade },
            create: {
              session: "secondSession",
              grade: subObj.secondSessionGrade,
              enrollmentId: enrollment.id,
            },
          });
        }
      })
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error editing student:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE student with enrollments
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const student = await prisma.student.findFirst({
      where: { id },
      include: { enrollments: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const pastRecords = student.enrollments.map((e) => e.id);

    await prisma.enrollment.deleteMany({ where: { id: { in: pastRecords } } });
    await prisma.student.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error deleting student:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
