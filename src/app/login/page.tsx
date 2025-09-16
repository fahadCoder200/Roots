import LoginForm from "@/components/login";
import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/auth";

export default async function Login() {

    const user = await getUserFromCookies();

    if (user && user.payload.role === "Admin") {
        redirect(`/dashboard-admin`);
    }

    else if(user && user.payload.role === "Teacher"){
        redirect("/dashboard-teacher")
    }
    return <LoginForm />
}
