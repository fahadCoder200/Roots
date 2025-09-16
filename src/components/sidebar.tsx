"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"

export default function SideBar(){

    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);

    return (
        <div className="w-70 flex flex-col justify-center h-180 pl-15">
            <div className="flex flex-col gap-6 text-lg">
                <Link href="/dashboard-admin" onClick={() => setSelected("/dashboard-admin")} className={`hover:border-red-600 border-2 border-transparent px-4 py-2 rounded-lg cursor-pointer ${selected === '/dashboard-admin' && "bg-red-700 text-white"}`}>Home</Link>
                <Link href="/students-info" onClick={() => setSelected("/students-info")} className={`hover:border-red-600 border-2 border-transparent px-4 py-2 rounded-lg cursor-pointer ${selected === '/students-info' && "bg-red-700 text-white"}`}>Students</Link>
                <Link href="/teachers-info" onClick={() => setSelected("/teachers-info}")} className={`hover:border-red-600 border-2 border-transparent px-4 py-2 rounded-lg cursor-pointer ${selected === '/teachers-info' && "bg-red-700 text-white"}`}>Teachers</Link>
                <Link href="" onClick={() => setSelected("About")} className={`hover:border-red-600 border-2 border-transparent px-4 py-2 rounded-lg cursor-pointer ${selected === 'About' && "bg-red-700 text-white"}`}>About</Link>
            </div>
        </div>
    )
}