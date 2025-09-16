import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full gap-10">
      <NavBar />
      <h1 className="text-4xl">Welcome to the Roots DHA-I Official Portal</h1>
      <div className="flex flex-col items-center w-200">
        <p>This is an application for Teachers and Administators to track students, classes, grades and time tables</p>
        <p>But it can also be used by students for attendance and grade checking</p>
      </div>
    </div>
  );
}
