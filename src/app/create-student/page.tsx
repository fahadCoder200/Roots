import AddStudentForm from "@/components/StudentForm";
import {prisma} from "@/lib/prisma";

export default async function StudentPage(){

  const subjects = await prisma.subject.findMany({include: {teachers: true}});

  return (
    <AddStudentForm allSubjects={subjects} />
  )
}