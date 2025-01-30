# AUTHENTICATION 
Prompt


Reference [Databases](https://appwrite.io/docs/references/cloud/client-web/databases) 

In this new project we added '/app/context/user.tsx'
```bash
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode} from "react"
import { account, ID } from "@/libs/AppWriteClient"
import { useRouter } from "next/navigation"
import { User, UserContextTypes } from "../types"
import useGetProfileByUserId from "../hooks/useGetProfileByUserId"
import useCreateProfile from "../hooks/useCreateProfile"
const UserContext = createContext<UserContextTypes | null>(null)
const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const checkUser = async () => {
        try {
            const currentSession = await account.getSession("current");
            if(!currentSession) return
            const promise = await account.get() as any
            const profile = await useGetProfileByUserId(promise?.$id)

            setUser({
                id: promise?.$id,
                name: promise?.name,
                bio: profile?.bio,
                image: profile?.image
            })
        } catch {
            setUser(null)
        }
    }
    useEffect(() => { checkUser() }, [])
    const register = async ( name: string, email: string, password: string ) => {
        try {
            const promise = await account.create(ID.unique(), email, password, name)
            await account.createEmailPasswordSession(email, password);
            await useCreateProfile(promise?.$id, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID),'')
            await checkUser();
        } catch (error) {
            throw error
        }
    }
    const login = async (email:string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await checkUser();
        } catch (error) {
           throw error 
        }
    }
    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null)
            router.refresh()
        } catch (error) {
            throw error
        }
    }
    return (
        <UserContext.Provider value={{user, register, login, logout, checkUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;
export const useUser = () => useContext(UserContext)
```  

Next we added '/app/hooks/useGetProfileByUserId.tsx'
```bash
import { database, Query } from "@/libs/AppWriteClient";
const useGetProfileByUserId = async (userId: string) => {
    try {
        const response = await database.listDocuments(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            [
                Query.equal('user_id',userId )
            ]
        )
        const documents = response.documents;

        return {
            id: documents[0]?.$id,
            user_id: documents[0]?.user_id,
            name: documents[0]?.name,
            image: documents[0]?.image,
            bio: documents[0]?.bio
        }

    } catch (error) {
        throw error
    }
}
export default useGetProfileByUserId
```  

Then we added '/app/hooks/useCreateProfile.tsx'
```bash
import { database, ID} from "@/libs/AppWriteClient";
const useCreateProfile = async (userId: string, name: string, image:string, bio:string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
            ID.unique(),
            {
                user_id: userId,
                name: name,
                image: image,
                bio: bio
            }
        )

    } catch (error) {
        throw error
    }
}
export default useCreateProfile
```  

Next, we updated '/app/layout.tsx'
```bash
import type { Metadata } from "next";
import "./globals.css";
import AuthOverlay from "./components/AuthOverlay";
import UserProvider from "./context/user";
export const metadata: Metadata = {
  title: "KROWD",
  description: "A new social media application",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <AuthOverlay />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}

```  

Then, we updated '/app/components/auth/Register.tsx'
```bash
import { ShowErrorObject } from "@/app/types";
import { useRouter } from "next/navigation"
import { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
export default function Register() {
    const contextUser = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | ''>('');
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [confirmPassword, setConfirmPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null);
    const showError = (type:string) => {
        if(error && Object.entries(error).length > 0 && error?.type == type){
            return error.message
        }
        return ''
    }
    const validate = () => {
        setError(null)
        let isError = false
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(!name){
            setError({type:'name', message:'A Name Is Required.'})
            isError = true
        }else if (!email){
            setError({type:'email', message:'An Email Is Required.'})
            isError = true
        }else if(!reg.test(email)){
            setError({type:'email', message:'A Valid Email Is Required.'})
            isError = true   
        }else if(!password){
            setError({type:'password', message:'A Password Is Required.'})
            isError = true  
        }else if(password.length < 8){
            setError({type:'password', message:'Passwords must be a minimum of 8 characters.'})
            isError = true  
        }else if(password != confirmPassword){
            setError({type:'password', message:'Passwords do not match.'})
            isError = true  
        }
        return isError
    }
    const register = async () => {
        let isError = validate()
        if(isError) return
        if(!contextUser) return

        try {
            setLoading(true)
            await contextUser.register(name, email, password)
            setLoading(false)
            // setIsLoadingOpen(false)
            router.refresh()
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error)
        }
    }
    return(
        <>
            <div>
                <h1 className="text-center text-[28px] mb-4 font-bold">Register</h1>
                <div className="px-6 pb-2">
                    <TextInput
                        string={name}
                        placeholder="Full Name"
                        onUpdate={setName}
                        inputType="text"
                        error={showError('name')}
                    />
                </div>
                <div className="px-6 pb-2">
                    <TextInput
                        string={email}
                        placeholder="Email Address"
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                </div>
                <div className="px-6 pb-2">
                    <TextInput
                        string={password}
                        placeholder="Password"
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>
                <div className="px-6 pb-2">
                    <TextInput
                        string={confirmPassword}
                        placeholder="Confirm Password"
                        onUpdate={setConfirmPassword}
                        inputType="password"
                        error={showError('ConfirmPassword')}
                    />
                </div>
                <div className="px-6 pb-2 mt-6">
                    <button 
                        disabled={loading} 
                        onClick={() => register()}
                        className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm ${(!name 
                            || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'}`}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color="#FFFFFF" size={25} />  : 'Log In'}
                    </button>
                </div>
            </div>
        </>
    )
}
```  

Finally we updated '/app/components/auth/Login.tsx'
```bash
import { ShowErrorObject } from "@/app/types";
import { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useUser } from "@/app/context/user";
export default function Login() {
    const contextUser = useUser()
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null);
    const showError = (type:string) => {
        if(error && Object.entries(error).length > 0 && error?.type == type){
            return error.message
        }
        return ''
    }
    const login = async () => {
        let isError = validate()
        if (isError) return
        if (!contextUser) return

        try {
            setLoading(true)
            await contextUser.login(email, password)
            setLoading(false)
            // setIsLoginOpen(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error)
        }
    }
    const validate = () => {
        setError(null)
        let isError = false
        
        if (!email){
            setError({type:'email', message:'An Email Is Required.'})
            isError = true
        }else if(!password){
            setError({type:'password', message:'A Password Is Required.'})
            isError = true  
        }
        return isError
    }
    return (
        <>
            <div>
                <h1 className="text-center text-[28px] mb-4 font-bold">Log In</h1>
                <div className="px-6 pb-2">
                    <TextInput
                        string={email}
                        placeholder="Email Address"
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                </div>
                <div className="px-6 pb-2">
                    <TextInput
                        string={password}
                        placeholder="Password"
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>
                <div className="px-6 pb-2 mt-6">
                    <button 
                        disabled={loading} 
                        onClick={() => login()}
                        className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm ${(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'}`}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color="#FFFFFF" size={25} />  : 'Log In'}
                    </button>
                </div>
            </div>
        </>
    )
}
```  

Explain the addition and the updates