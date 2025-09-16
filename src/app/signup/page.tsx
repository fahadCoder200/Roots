import SignupForm from "@/components/signup";
import { getUserFromCookies } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Signup() {

    const user = await getUserFromCookies();

    if (user && user.payload.role === "Admin") {
        redirect(`/dashboard-admin`);
    }

    else if (user && user.payload.role === "Teacher") {
        redirect("/dashboard-teacher")
    }
    return <SignupForm />
}