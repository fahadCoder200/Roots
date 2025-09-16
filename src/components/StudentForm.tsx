"use client";

import SubjectSelector from "@/components/subject";
import { baseURL } from "@/lib/config";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type SubjectWithTeachers = Prisma.SubjectGetPayload<{
  include: { teachers: true };
}>;

type subjectProps = {
  allSubjects: SubjectWithTeachers[]
}

type subject = {
  subject: string,
  teacherId?: string
}

export default function AddStudentForm({ allSubjects }: subjectProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<subject[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (selectedSubjects.length !== 0) {
      try {
        console.log(data, selectedSubjects);
        const request = await axios.post(`${baseURL}/create/student`, { ...data, subjectFromFrontend: selectedSubjects });

        if (request) {
          toast.success("Student Created Successfully!");
          router.push("/students-info");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("error:", err.response?.data || err.message);
          toast.error(err.response?.data.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name:</label>
        <input required type="text" name="name" className="border p-2 rounded w-full" />
      </div>

      <div>
        <label>Class:</label>
        <input required type="text" name="Class" className="border p-2 rounded w-full" />
      </div>

      <div>
        <label>Subjects:</label>
        <SubjectSelector
          subjects={allSubjects}
          selectedSubjects={selectedSubjects}
          onChange={setSelectedSubjects}
        />
      </div>

      <button type="submit" className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s block w-30">ADD</button>
    </form>
  );
}
