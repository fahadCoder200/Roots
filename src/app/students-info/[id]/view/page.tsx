import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const student = await prisma.student.findFirst({
    where: { id: (await params).id },
    include: {
      enrollments: {
        include: {
          subject: true,
          teacher: true,
          grades: true,
        },
      },
    },
  });

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const academicYearStart = month >= 8 ? year : year - 1;
  const academicYearEnd = academicYearStart + 1;

  const sessions = [
    { key: "firstSession", label: `Sessional Oct ${academicYearStart}` },
    { key: "secondSession", label: `1st Mock Dec ${academicYearStart}` },
    { key: "thirdSession", label: `Mock March ${academicYearEnd} ` },
    { key: "fourthSession", label: `Mock April ${academicYearEnd}` },
  ];

  function getActualGrade(percentage: number): string {
    if (percentage >= 90 && percentage <= 100) {
      return "A*";
    } else if (percentage >= 80) {
      return "A";
    } else if (percentage >= 70) {
      return "B";
    } else if (percentage >= 60) {
      return "C";
    } else if (percentage >= 50) {
      return "D";
    } else if (percentage >= 40) {
      return "E";
    } else if (percentage >= 0) {
      return "U";
    } else {
      return "Invalid";
    }
  }

  const getGrade = (grades: any[], session: string) => {
    const g = grades.find((gr) => gr.session === session);
    if (!g) {
      return { marks: " ", grade: " ", percentage: " " };
    }
    const percentage = Math.floor((g.marks / g.maxMarks) * 100);
    return {
      maxMarks: g.maxMarks ?? " ",
      marks: g.marks ?? " ",
      grade: percentage ? getActualGrade(percentage) : " ",
      percentage: percentage ? `${percentage}%` : " ",
    };
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6 justify-center w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Report Card for Academic Year {academicYearStart}-{academicYearEnd}
      </h1>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-md text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-r-2 border-gray-500 px-4 py-2">Subject</th>
              <th className="border-r-2 border-gray-500 px-4 py-2">Teacher</th>
              {sessions.map((s, idx) => (
                <th
                  key={s.key}
                  className={`border px-4 py-2 ${idx < sessions.length - 1 ? 'border-r-2 border-gray-500' : ''}`}
                  colSpan={4}
                >
                  {s.label}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th className="border-r-2 border-gray-500 px-4 py-2"></th>
              <th className="border-r-2 border-gray-500 px-4 py-2"></th>
              {sessions.map((s, idx) => (
                <React.Fragment key={s.key}>
                  <th className="border px-4 py-2">Max Marks</th>
                  <th className="border px-4 py-2">Marks Obt.</th>
                  <th className="border px-4 py-2">%</th>
                  <th className={`border px-4 py-2 ${idx < sessions.length - 1 ? 'border-r-2 border-gray-500' : ''}`}>Grade</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {student?.enrollments.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 transition">
                <td className="border-r-2 border-gray-500 px-4 py-2">{e.subject?.name ?? "-"}</td>
                <td className="border-r-2 border-gray-500 px-4 py-2">{e.teacher?.name ?? "-"}</td>
                {sessions.map((s, idx) => {
                  const g = getGrade(e.grades, s.key);
                  return (
                    <React.Fragment key={s.key}>
                      <td className="border px-4 py-2">{g.maxMarks}</td>
                      <td className="border px-4 py-2">{g.marks}</td>
                      <td className="border px-4 py-2">{g.percentage}</td>
                      <td className={`border px-4 py-2 ${idx < sessions.length - 1 ? 'border-r-2 border-gray-500' : ''}`}>{g.grade}</td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        href="/students-info"
        className="border-2 border-red-600 cursor-pointer px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Go Back
      </Link>
    </div>
  );
}