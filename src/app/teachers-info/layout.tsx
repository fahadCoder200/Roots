export default function Layout({children}: {children: React.ReactNode}){
    return (
        <div className="w-full flex p-10">
            {children}
        </div>
    )
}