"use client"
import { baseURL } from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignupForm() {

    const [acc_type, setAcc_type] = useState("Admin");
    const router = useRouter();
    

    async function signupCompleted(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const signUpData = new FormData(e.currentTarget);

        const data = Object.fromEntries(signUpData.entries());

        try {
            const request = await axios.post(`${baseURL}/auth/signup`, { data });

            if (request && request.data.user.status !== "pending") {
                toast.success("Signed up successfully!");
                setTimeout(() => {
                    router.push(`/dashboard-${(data.accountType).toString().toLowerCase()}`);
                }, 1000);
            }
            else {
                toast.success("Registration Successfull!");
                setTimeout(() => {
                    router.push("/confirmation-notice");
                }, 1000);
            }
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Signup error:", err.response?.data || err.message);
                toast.error(err.response?.data.message);
            } else {
                console.error("Unknown error:", err);
            }
        }
    }

    return (
        <div className="flex flex-col items-center gap-10">
            <h1 className="text-4xl">Roots Official SignUp Portal</h1>
            <form onSubmit={(e) => signupCompleted(e)} className="border-2 border-red-600 p-10 rounded-lg flex flex-col gap-5 w-200 h-140 justify-center">
                <div>
                    <label htmlFor="accountType" className="block">Select the type of account</label>
                    <select onChange={(e) => setAcc_type(e.target.value)} className="border-2 w-full p-2 rounded-md" name="accountType" id="accountType">
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                </div>

                <div>
                    <label className="block" htmlFor="name">{acc_type} Name</label>
                    <input required minLength={3} maxLength={25} type="text" name="name" placeholder="Write name here" className="border-2 rounded-md w-full p-2" />
                </div>


                <div>
                    <label className="block" htmlFor="password">Choose a password</label>
                    <input required type="text" maxLength={12} autoComplete="off" name="password" placeholder="Write password here" className="border-2 rounded-md w-full p-2" />
                </div>

                {(acc_type === "Admin" || acc_type === "Teacher") && <div>
                    <label className="block" htmlFor="passcode">Give {acc_type}-only Passcode</label>
                    <input required type="text" autoComplete="off" minLength={6} maxLength={6} name="passcode" placeholder="Write passcode here" className="border-2 rounded-md w-full p-2" />
                </div>}

                <Link href="/login" className="text-red-500 underline">Already have an account? Login</Link>

                <div className="w-full flex justify-center items-center">
                    <button className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s block w-30">Signup</button>
                </div>
            </form>
        </div>
    )
}