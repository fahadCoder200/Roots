"use client"
import { baseURL } from "@/lib/config";
import { Subject } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

type SubjectListProps = {
    subjectList: Subject[]
}

export default function TeacherForm({ subjectList }: SubjectListProps,) {

    const router = useRouter();

    async function submitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const creationData = new FormData(e.currentTarget);
        const data = Object.fromEntries(creationData.entries());
        console.log(data);

        try {
            let request = await axios.post(`${baseURL}/create/teacher`, { data });

            if (request) {
                toast.success("Teacher Created Successfully!");
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
        <form onSubmit={(e) => submitForm(e)} className="space-y-4">
            <div>
                <label htmlFor="name">Teacher Name</label>
                <input required type="text" name="name" placeholder="Write Name Here" className="border p-2 rounded w-full" />
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


            <div className="w-full flex justify-center items-center">
                <button className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s block w-30">ADD</button>
            </div>
        </form>
    )
}