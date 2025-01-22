# SIDE NAVIGATION  
Prompt

In this new project we added 'layouts/includes/SideNav.tsx'

```bash  
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "@/app/components/MenuItem";
import ClientOnly from "@/app/components/ClientOnly";
import MenuItemFollow from "@/app/components/MenuItemFollow";
export default function SideNavMain(){
    const pathname = usePathname()
    return(
        <>
            <div
                id="SideNavMain"
                className={`
                    fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto
                    ${pathname == '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}
                `}
            >
                <div className="lg:w-full w-[55px] mx-auto">
                    <Link href="/">
                        <MenuItem iconString="For You" colorString={pathname == '/' ? '#F02C56' : ''} sizeString="25" />
                    </Link>
                    <MenuItem iconString="Following" colorString="#000000" sizeString="25" />
                    <MenuItem iconString="LIVE" colorString="#000000" sizeString="25" />

                    <div>
                        <div className="border-b lg:ml-2 mt-2"></div>

                        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">Suggested Accounts</h3>

                        <div className="lg:hidden block pt-3"></div>

                        <ClientOnly>
                            <div className="cursor-pointer">
                                <MenuItemFollow user={{id:"1", name:"John Doe", image: "https://placehold.co/50"}} />
                            </div>
                        </ClientOnly>

                        <button className="lg:block hidden text-[#F02C56]  pt-1.5 pl-2 text-[13px]">See All</button>
                    </div>

                    {true ? (
                        <div>
                            <div className="border-b lg:ml-2 mt-2"></div>

                            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">Following Accounts</h3>

                            <div className="lg:hidden block pt-3"></div>

                            <ClientOnly>
                                <div className="cursor-pointer">
                                    <MenuItemFollow user={{id:"1", name:"John Doe", image: "https://placehold.co/50"}} />
                                </div>
                            </ClientOnly>

                            <button className="lg:block hidden text-[#F02C56]  pt-1.5 pl-2 text-[13px]">See More</button>
                        </div>
                    ) : null}

                    <div className="lg:block hidden border-b lg:ml-2 mt-2"></div>

                    <div className="lg:block hidden text-[11px] text-gray-500">
                        <p className="pt-4 px-2">About Newsroom KotKit Shop Contact KrowdKyte</p>
                        <p className="pt-4 px-2">KotKit for Good Advertise Developers Transparency KotKit Rewards KotKit Browse KotKit Embeds</p>
                        <p className="pt-4 px-2">Help Safety Terms Privacy Creator Portal Community Guidelines</p>
                        <p className="pt-4 px-2">&copy; 2025 KotKit</p>
                    </div>
                </div>
            </div>
        </>
    )
}
```  

Next, we created the following component, Menu Item, in 'components/MenuItem.tsx'
```bash  
'use client';
import { MenuItemTypes } from "@/app/types";
import { AiOutlineHome } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { RiGroupLine } from "react-icons/ri";
export default function MenuItem({iconString, colorString, sizeString}: MenuItemTypes) {
    const icons = () => {
        if (iconString == 'For You') return <AiOutlineHome size={sizeString} color={colorString} />
        if (iconString == 'Following') return <RiGroupLine size={sizeString} color={colorString} />
        if (iconString == 'Live') return <BsCameraVideo size={sizeString} color={colorString} />
    }
    return(
        <>
            <div className="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
                <div className="flex items-center lg:mx-0 mx-auto">
                    {icons()}
                    <p className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>{iconString}</p>
                </div>
            </div>
        </>
    )
}
```

We also created 'app/types.tsx'
```bash  
export interface RandomUsers {
    id: string,
    name: string,
    image: string
}
export interface MenuItemTypes {
    iconString:string,
    colorString:string,
    sizeString:string
}
export interface MenuItemCompTypes{
    user: RandomUsers
}
```

Then, in  the 'layouts/MainLayout.tsx' file we made the following update
```bash  
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./includes/TopNav";
import SideNavMain from "./includes/SideNav";

export default function MainLayout({ children }: { children: React.ReactNode}){
    const pathname = usePathname()
    return (
        <>
            <TopNav />
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : ''}`}>
                <SideNavMain />
                {children}
            </div>
        </>
    )
}
```  

Explain the addition and the update.