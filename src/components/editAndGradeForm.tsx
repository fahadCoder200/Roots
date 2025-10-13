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

type StudentsWithSubjects = Prisma.StudentGetPayload<{
  include: {
    enrollments: {
      include: {
        subject: true;
        grades: true; // ✅ corrected
      };
    };
  };
}>;



type subjectProps = {
  allSubjects: SubjectWithTeachers[];
  student: StudentsWithSubjects;
};

type subject = {
  subject: string;
  teacherId?: string;
};

export default function EditStudentsForm({ allSubjects, student }: subjectProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<subject[]>([]);
  const [wantToChange, setWantToChange] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const gradePerSubject = student.enrollments.map((e) => ({
      subjectName: e.subjectName,
      firstSessionGrade: formData.get(`${e.subjectName}-first`) as string,
      firstSessionMarks: formData.get(`${e.subjectName}-marks-first`) as string,
      secondSessionGrade: formData.get(`${e.subjectName}-second`) as string,
      secondSessionMarks: formData.get(`${e.subjectName}-marks-second`) as string,
      thirdSessionGrade: formData.get(`${e.subjectName}-third`) as string,
      thirdSessionMarks: formData.get(`${e.subjectName}-marks-third`) as string,
      fourthSessionGrade: formData.get(`${e.subjectName}-fourth`) as string,
      fourthSessionMarks: formData.get(`${e.subjectName}-marks-fourth`) as string
    }));
    console.log(gradePerSubject);

    try {
      const request = await axios.patch(`${baseURL}/edit/student`, {
        ...data,
        id: student.id,
        subjectFromFrontend: selectedSubjects,
        gradePerSubject,
      });

      if (request) {
        toast.success("Student edited Successfully!");
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
  };

  async function deleteStudent() {
    try {
      let request = await axios.post(`${baseURL}/edit/student`, { id: student.id });

      if (request) {
        toast.success("Student Deleted Successfully!");
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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div>
        <label>Name:</label>
        <input
          defaultValue={student.name}
          required
          type="text"
          name="name"
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label>Class:</label>
        <input
          defaultValue={student.class}
          required
          type="text"
          name="Class"
          className="border p-2 rounded w-full"
        />
      </div>

      {student.enrollments.map((e) => (
        <div key={e.id} className="mb-4">
          <p className="font-semibold">{e.subjectName} Grades</p>
          <div>
            <label htmlFor={`${e.subjectName}-first`}>1st Session</label>
            <p>Grade</p>
            <select
              className="border p-2 rounded w-full"
              name={`${e.subjectName}-first`}
              defaultValue={e.grades?.find((g) => g.session === "firstSession")?.grade || "none"}
            >
              <option value="none">None</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <p>Marks</p>
            <input placeholder="Enter session's marks" className="border p-2 rounded w-full" type="number" name={`${e.subjectName}-marks-first`} />
          </div>

          <div>
          </div>

          <div>
            <label htmlFor={`${e.subjectName}-second`}>2nd Session</label>
            <select
              className="border p-2 rounded w-full"
              name={`${e.subjectName}-second`}
              defaultValue={e.grades?.find((g) => g.session === "secondSession")?.grade || "none"}
            >
              <option value="none">None</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <p>Marks</p>
            <input placeholder="Enter session's marks" className="border p-2 rounded w-full" type="number" name={`${e.subjectName}-marks-second`} />
          </div>

          <div>
            <label htmlFor={`${e.subjectName}-third`}>3rd Session</label>
            <select
              className="border p-2 rounded w-full"
              name={`${e.subjectName}-third`}
              defaultValue={e.grades?.find((g) => g.session === "thirdSession")?.grade || "none"}
            >
              <option value="none">None</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <p>Marks</p>
            <input placeholder="Enter session's marks" className="border p-2 rounded w-full" type="number" name={`${e.subjectName}-marks-third`} />
          </div>

          <div>
            <label htmlFor={`${e.subjectName}-fourth`}>4th Session</label>
            <select
              className="border p-2 rounded w-full"
              name={`${e.subjectName}-fourth`}
              defaultValue={e.grades?.find((g) => g.session === "fourthSession")?.grade || "none"}
            >
              <option value="none">None</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>

            <p>Marks</p>
            <input placeholder="Enter session's marks" className="border p-2 rounded w-full" type="number" name={`${e.subjectName}-marks-fourth`} />
          </div>
        </div>
      ))}

      {wantToChange ? (
        <div>
          <label>Subjects:</label>
          <SubjectSelector
            subjects={allSubjects}
            selectedSubjects={selectedSubjects}
            onChange={setSelectedSubjects}
          />
        </div>
      ) : (
        <button type="button" onClick={() => setWantToChange(true)}>
          Change Subjects
        </button>
      )}

      <div className="w-full flex gap-5 mt-4">
        <button
          onClick={() => deleteStudent()}
          type="button"
          className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all block"
        >
          Delete
        </button>
        <button
          type="submit"
          className="border-2 px-4 py-2 hover:bg-red-600 rounded text-black hover:text-white border-red-700 cursor-pointer transition-all block"
        >
          Edit
        </button>
      </div>
    </form>
  );
}
