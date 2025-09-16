import SideBar from "@/components/sidebar";
import TeacherSearch from "@/components/TeacherSearch";
import TeacherTable from "@/components/TeacherTable";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StudentsInfo() {

    const teachers = await prisma.teacher.findMany({ include: { subjects: true } });

    return (
        <>
            <SideBar />
            <div className="pl-15 flex flex-col gap-6">
                <TeacherSearch />
                <TeacherTable teachers={teachers} />
                <div className="flex gap-4">
                    <Link href="/create-teacher" className="cursor-pointer border-2 border-red-600 px-4 py-2 rounded-lg">Create Teacher</Link>
                    <Link href="/create-subject" className="cursor-pointer border-2 border-red-600 px-4 py-2 rounded-lg">Create Subject</Link>
                </div>
            </div>
        </>
    )
}