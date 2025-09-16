import SideBar from "@/components/sidebar";
import StudentTable from "@/components/StudentTable";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudentsInfo() {

    const students = await prisma.student.findMany({include: {enrollments: true}});

    return (
        <>
            <SideBar />
            <div className="pl-15 flex flex-col gap-6">
                <StudentTable students={students} />
                <div>
                    <Link href="/create-student" className="cursor-pointer border-2 border-red-600 px-4 py-2 rounded-lg">Create Student</Link>
                </div>
            </div>
        </>
    )
}