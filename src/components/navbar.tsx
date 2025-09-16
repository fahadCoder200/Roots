import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow w-full">
      <h1 className="text-lg font-bold w-35 text-center cursor-pointer">Roots School System</h1>
      <div className="flex gap-4">
        <Link href="/login" className="px-4 py-2 border-2 border-transparent rounded bg-red-700 text-white hover:bg-transparent hover:text-black hover:border-red-700 cursor-pointer transition-all 0.7s">
          Log In
        </Link>
        <Link href="/signup" className="px-4 py-2 border-2 rounded hover:bg-red-700 text-black hover:text-white border-red-700 cursor-pointer transition-all 0.4s">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
