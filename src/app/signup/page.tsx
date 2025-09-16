import SignupForm from "@/components/signup";
import { getUserFromCookies } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect} from "next/navigation";

export default async function Signup() {

    const user = await getUserFromCookies();

    if(user) redirect(`/dashboard-${(user.role).toLowerCase()}`);

    return <SignupForm />
}