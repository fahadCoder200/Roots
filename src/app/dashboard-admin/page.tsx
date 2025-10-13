import SideBar from "@/components/sidebar";
import { getUserFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Admin() {

    const user = await getUserFromCookies();

    const pendingAccounts = await prisma.user.findMany({
        where: { status: "pending" }
    });

    return (
        <>
            <SideBar />
            <div className="w-full flex flex-col gap-25">
                <div className="flex justify-between w-full px-20 py-20 text-xl">
                    <p>Name: {user!.payload.name}</p>
                    <p>Role: {user!.payload.role}</p>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="text-xl px-20">Pending Accounts</div>
                    {pendingAccounts.length === 0 ? (
                        <p className="px-20">No Pending Accounts for Now</p>
                    ) : (
                        pendingAccounts.map((acc) => (
                            <p className="px-20" key={acc.id}>{acc.name}</p>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}