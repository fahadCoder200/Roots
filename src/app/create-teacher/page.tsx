import TeacherForm from "@/components/teacherForm";

export default async function CreateTeacher() {

    const subjects = await prisma?.subject.findMany();

    return (
        <TeacherForm subjectList={subjects || []} />
    )
}