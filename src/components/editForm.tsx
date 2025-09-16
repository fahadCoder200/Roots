"use client"
import { baseURL } from "@/lib/config";
import { Subject, Teacher } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

type EditFormProps = {
    subjectList: Subject[];
    teacher: Teacher & { subjects?: Subject[] };
};

export default function EditForm({ subjectList, teacher }: EditFormProps) {

    const router = useRouter();


    async function editTeacher(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        data.id = teacher.id;

        try {
            const request = await axios.patch(`${baseURL}/edit/teacher`, data);

            if (request) {
                toast.success("edit successfull!");
                router.push("/teachers-info");
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

    async function deleteTeacher() {
        try {
            const request = await axios.post(`${baseURL}/edit/teacher`, { id: teacher.id });

            if (request) {
                toast.success("Deleted Sucessfully!");
                router.push("/teachers-info");
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
        <form onSubmit={(e) => editTeacher(e)} className="flex flex-col gap-10">
            <div>
                <label htmlFor="name">Teacher Name</label>
                <input required type="text" defaultValue={teacher.name} name="name" placeholder="Write Name Here" className="border p-2 rounded w-full" />
            </div>

            <div>
                <label htmlFor="">First Subject</label>
                <select name="subject1" id="subject1" className="border p-2 rounded w-full">
                    {subjectList.length === 0 ? <option value="none">None</option> : subjectList.map((s) => (
                        <option key={s.id} value={`${s.name}`}>{s.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="">Second Subject(Optional)</label>
                <select name="subject2" id="subject2" className="border p-2 rounded w-full">
                    <option value="none">None</option>
                    {subjectList.length === 0 ? <option value="none">None</option> : subjectList.map((s) => (
                        <option key={s.id} value={`${s.name}`}>{s.name}</option>
                    ))}
                </select>
            </div>

            <div className="w-full flex justify-center items-center gap-7">
                <button type="button" onClick={() => deleteTeacher()} className="px-4 py-2 border-2 rounded hover:bg-red-700 text-black hover:text-white border-red-700 cursor-pointer transition-all 0.4s w-30">
                    Delete
                </button>
                <button type="submit" className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s block w-30">Edit</button>
            </div>
        </form>
    )
}