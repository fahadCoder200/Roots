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


  const sessions = [
    { key: "firstSession", label: "First Session" },
    { key: "secondSession", label: "Second Session" },
    { key: "thirdSession", label: "Third Session" },
    { key: "fourthSession", label: "Fourth Session" },
  ];


  const getGrade = (grades: any[], session: string) => {
    const g = grades.find((gr) => gr.session === session);
    if (!g) {
      return { marks: " ", grade: " ", percentage: " " };
    }
    return {
      marks: g.marks ?? " ",
      grade: g.grade === "none" ? " " : g.grade,
      percentage: g.marks ? `${(g.marks / 75) * 100}%` : " ",
    };
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6 justify-center w-full">
      <h1 className="text-2xl font-bold mb-6">
        Report Card – {student?.name} ({student?.class})
      </h1>

      <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Teacher</th>
            {sessions.map((s) => (
              <th key={s.key} className="border px-4 py-2" colSpan={3}>
                {s.label}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-50">
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2"></th>
            {sessions.map((s) => (
              <React.Fragment key={s.key}>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">%</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {student?.enrollments.map((e) => (
            <tr key={e.id} className="hover:bg-gray-50 transition">
              <td className="border px-4 py-2">{e.subject?.name ?? "-"}</td>
              <td className="border px-4 py-2">{e.teacher?.name ?? "-"}</td>
              {sessions.map((s) => {
                const g = getGrade(e.grades, s.key);
                return (
                  <React.Fragment key={s.key}>
                    <td className="border px-4 py-2">{g.marks}</td>
                    <td className="border px-4 py-2">{g.grade}</td>
                    <td className="border px-4 py-2">{g.percentage}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        href="/students-info"
        className="border-2 border-red-600 cursor-pointer px-4 py-2 rounded hover:bg-red-600 hover:text-white transition"
      >
        Go Back
      </Link>
    </div>
  );
}
