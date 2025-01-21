# Components

In this new project we added 'components/ClientOnly.tsx'

```bash
'use client';
import React, {useEffect, useState} from "react";

export default function ClientOnly({ children }: { children: React.ReactNode }){
    const [isClient, setIsClient] = useState(false)
    useEffect(()=>{setIsClient(true)},[])
    
    return (<>{isClient ? <div>{children}</div> : null}</>)
}
```  

Explain the addition and the update.