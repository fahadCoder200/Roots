"use client"
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type StudentWithSubjects = Prisma.StudentGetPayload<{
    include: { enrollments: true };
}>;

type StudentProps = {
    students: StudentWithSubjects[];
};

export default function StudentTable({ students }: StudentProps) {
    console.log(students);
    return (
        <>
            {students.length !== 0 ? <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">ID</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Class</th>
                        <th className="border px-4 py-2 text-left">Subjects</th>
                        <th className="border px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr  key={s.id} className="hover:bg-gray-100 transition cursor-pointer">
                            <td className="border px-4 py-2">{s.id}</td>
                            <td className="border px-4 py-2">{s.name}</td>
                            <td className="border px-4 py-2">{s.class}</td>
                            <td className="border px-4 py-2">
                                <div className="flex items-center justify-between flex-row">
                                    <span>
                                        {s.enrollments.length > 0
                                            ? s.enrollments.map((s) => s.subjectName).join(", ")
                                            : "No subjects"}
                                    </span>
                                    <img onClick={() => redirect(`/students-info/${s.id}/edit`)} src="edit.png" alt="edit" className="w-7 hover:opacity-45" />
                                </div>
                            </td>
                            <td onClick={() => redirect(`/students-info/${s.id}/view`)} className="border px-4 py-2">View Details</td>
                        </tr>
                    ))}
                </tbody>
            </table> : <p>No Students Yet!</p>}
        </>
    );
}
