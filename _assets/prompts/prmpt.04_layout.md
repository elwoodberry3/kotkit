# Layout

In this new project we added 'layouts/MainLayout.tsx'  

```bash  
import React from "react";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode}){
    const pathname = usePathname()
    return (
        <>
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname == '/' ? 'max-w-[1140px]' : ''}`}>
                {children}
            </div>
        </>
    )
}
```

Then, we updated the 'app/page.tsx'

```bash  
"use client"
import MainLayout from "./layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div>
          Home
        </div>
      </MainLayout>
    </>
  );
}
```

Explain the addition and the update.