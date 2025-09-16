"use client"

import { baseURL } from "@/lib/config";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

export default function TeacherSearch() {

    const [teacherValue, setTeacherValue] = useState("");

    async function SearchTeacher(teacher: string) {
        try {
            const request = await axios.post(`${baseURL}/get/students`, { teacherName: teacher });

            console.log(request.data);
            if (request.data.noStud) {
                toast.success("No Students found for this teacher");
                return;
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
        <div className="flex flex-col gap-2">
            <input onChange={(e) => setTeacherValue(e.target.value)} className="w-full border-2 p-4 rounded-lg" type="text" placeholder="Search Teacher for Students" name="search" id="" />
            <button onClick={() => SearchTeacher(teacherValue)} className="bg-red-500 cursor-pointer px-4 py-2 text-white rounded">Search</button>
        </div>
    )
}