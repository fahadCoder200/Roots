export default function Layout({children}: {children: React.ReactNode}){
    return (
        <div className="size-full flex justify-center items-center h-screen">
            {children}
        </div>
    )
}