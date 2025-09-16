import TeacherForm from "@/components/teacherForm";
import {prisma} from "@/lib/prisma"

export default async function CreateTeacher() {

    const subjects = await prisma.subject.findMany();

    return (
        <TeacherForm subjectList={subjects || []} />
    )
}