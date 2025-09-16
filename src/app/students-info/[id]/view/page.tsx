import { prisma } from "@/lib/prisma";
import Link from "next/link";

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


    return (
        <div className="p-4 flex flex-col items-center gap-6 justify-center w-full">
            <h1 className="text-xl font-semibold mb-4">
                {student?.name} ({student?.class})
            </h1>

            <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Subject</th>
                        <th className="border px-4 py-2 text-left">Teacher</th>
                        <th className="border px-4 py-2 text-left">Grade(1st Session)</th>
                        <th className="border px-4 py-2 text-left">Grade(2nd Session)</th>
                    </tr>
                </thead>
                <tbody>
                    {student?.enrollments.map((e) => (
                        <tr key={e.id} className="hover:bg-gray-50 transition"
                        >
                            <td className="border px-4 py-2">{e.subject?.name ?? "-"}</td>
                            <td className="border px-4 py-2">{e.teacher?.name ?? "-"}</td>
                            {e.grades.length !== 0 ? e.grades.map((g) => (
                                <td key={g.id} className="border px-4 py-2">{g.grade === 'none' ? "Not Assigned" : g.grade}</td>
                            )) : <><td className="border px-4 py-2">{"Not Assigned"}</td><td className="border px-4 py-2">{"Not Assigned"}</td></>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link href="/students-info" className="border-2 border-red-600 cursor-pointer px-4 py-2 rounded">Go Back</Link>
        </div>
    );

}