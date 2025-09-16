import TeacherForm from "@/components/teacherForm";
import {prisma} from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CreateTeacher() {

    const subjects = await prisma.subject.findMany();

    return (
        <TeacherForm subjectList={subjects || []} />
    )
}