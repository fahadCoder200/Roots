import EditStudentsForm from "@/components/editAndGradeForm";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ id: string }>;
};


export default async function editStudent({ params }: Props) {

    const student = await prisma.student.findFirst({
        where: { id: (await params).id },
        include: { enrollments: {include: {subject: true, grades: true}} }
    });

    const subjects = await prisma.subject.findMany({
        include: {teachers: true}
    });

    if (!student) {
        return <p>Student not found</p>;
    }

    return (
        <div className="w-200 flex justify-center items-center">
            <EditStudentsForm allSubjects={subjects} student={student}  />
        </div>
    )
}