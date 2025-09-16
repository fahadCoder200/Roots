"use client"
import { baseURL } from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function CreateSubject() {

    const router = useRouter();

    async function createSub(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        console.log(data);

        try {
            const request = await axios.post(`${baseURL}/create/subject`, { data });

            if (request) {
                toast.success(request.data.message);
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
        <form onSubmit={(e) => createSub(e)} className="space-y-4">
            <div>
                <label htmlFor="">Board</label>
                <select className="border p-2 rounded w-full" name="board" id="board">
                    <option value="Camb">Cambridge</option>
                    <option value="AQA">AQA</option>
                </select>
            </div>

            <div>
                <label htmlFor="">Name</label>
                <input required className="border p-2 rounded w-full" type="text" name="name" />
            </div>

            <div className="w-full flex justify-center items-center">
                <button className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s block w-30">ADD</button>
            </div>
        </form>
    )
}