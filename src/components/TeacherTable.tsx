"use client"
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type TeacherWithSubjects = Prisma.TeacherGetPayload<{
    include: { subjects: true };
}>;

type TeacherProps = {
    teachers: TeacherWithSubjects[];
};

export default function TeacherTable({ teachers }: TeacherProps) {
    return (
        <>
            {teachers.length !== 0 && <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">ID</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Subjects</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((t) => (
                        <tr key={t.id} className="hover:bg-gray-100 transition">
                            <td className="border px-4 py-2">{t.id}</td>
                            <td className="border px-4 py-2">{t.name}</td>
                            <td className="border px-4 py-2">
                                <div className="flex items-center justify-between">
                                    <span>
                                        {t.subjects.length > 0
                                            ? t.subjects.map((s) => s.name).join(", ")
                                            : "No subjects"}
                                    </span>

                                    <button
                                        onClick={() => console.log("Edit", t.id)}
                                        className="ml-4"
                                    >
                                        <img
                                            src="/edit.png"
                                            alt="edit"
                                            className="w-10 h-10 opacity-70 hover:opacity-100 cursor-pointer"
                                            onClick={() => redirect(`/teachers-info/${t.id}/edit`)}
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </>
    );
}
