"use client";

import { Prisma } from "@prisma/client";

type SubjectWithTeachers = Prisma.SubjectGetPayload<{
  include: { teachers: true };
}>;

interface SubjectSelectorProps {
  subjects: SubjectWithTeachers[];
  selectedSubjects: { subject: string; teacherId?: string }[]; 
  onChange: (selected: { subject: string; teacherId?: string }[]) => void;
}

export default function SubjectSelector({
  subjects,
  selectedSubjects,
  onChange,
}: SubjectSelectorProps) {
  const toggleSubject = (subject: SubjectWithTeachers) => {
    const isSelected = selectedSubjects.some((s) => s.subject === subject.name);

    if (isSelected) {
      onChange(selectedSubjects.filter((s) => s.subject !== subject.name));
    } else {
      const defaultTeacherId =
        subject.teachers.length === 1
          ? subject.teachers[0].id
          : subject.teachers[0]?.id; 
      onChange([
        ...selectedSubjects,
        { subject: subject.name, teacherId: defaultTeacherId },
      ]);
    }
  };

  const handleTeacherChange = (subjectName: string, teacherId: string) => {
    onChange(
      selectedSubjects.map((s) =>
        s.subject === subjectName ? { ...s, teacherId } : s
      )
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {subjects.map((subject) => {
        const selected = selectedSubjects.find(
          (s) => s.subject === subject.name
        );

        return (
          <div key={subject.id} className="flex flex-col space-y-1">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!selected}
                onChange={() => toggleSubject(subject)}
                className="accent-blue-500"
              />
              <span>{subject.name}</span>
            </label>

            {selected && subject.teachers.length > 1 && (
              <select
                value={selected.teacherId || ""}
                onChange={(e) =>
                  handleTeacherChange(subject.name, e.target.value)
                }
                className="border p-1 rounded"
              >
                {subject.teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        );
      })}
    </div>
  );
}
