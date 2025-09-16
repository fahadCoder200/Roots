import LoginForm from "@/components/login";
import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/auth";

export default async function Login() {

    const user = await getUserFromCookies();

    console.log(user);
    if(user) redirect(`/dashboard-${(user.payload.role).toLowerCase()}`);
    return <LoginForm />
}
