import EditForm from "@/components/editForm";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function TeacherPage({ params }: Props) {
    const teacher = await prisma.teacher.findUnique({
        where: { id: (await params).id },
        include: { subjects: true },
    });

    const subjectList = await prisma.subject.findMany();

    if (!teacher) {
        return <p>Teacher not found</p>;
    }

    return (
        <>
            <EditForm teacher={teacher} subjectList={subjectList} />
        </>
    );
}
