import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNav";

export default function UploadLayout({ children }: { children: React.ReactNode}){
    const pathname = usePathname()
    return (
        <>
            <TopNav />
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname == '/upload' ? 'max-w-[1140px]' : ''}`}>
                {children}
            </div>
        </>
    )
}