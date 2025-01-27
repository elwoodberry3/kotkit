# APPLICATION AUTHENTICATION OVERLAY
Prompt

In this new project we added 'app/components/auth/Login.tsx' 
```bash
import { ShowErrorObject } from "@/app/types";
import { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
export default function Login() {
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
    const login = () => {
        console.log('Log In')
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

In this new project we added 'app/components/auth/Register.tsx' 
```bash
import { ShowErrorObject } from "@/app/types";
import { useRouter } from "next/navigation"
import { useState } from "react";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
export default function Register() {
    const router = useRouter
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
    const register = () => {
        console.log('Register')
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

In this new project we added 'app/components/AuthOverlay.tsx' 
```bash
"use client"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Register from "./auth/Register"
import Login from "./auth/Login"
export default function AuthOverlay(){
    let [isRegister, setIsRegister] = useState<Boolean>(false)
    return (
        <>
            <div id="AuthOverlay" className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50">
                <div className="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg">
                    <div className="w-full flex justify-end">
                        <button className="p-1.5 rounded-full bg-gray-100">
                            <AiOutlineClose size="26" />
                        </button>
                    </div>
                    {isRegister ? <Register/> : <Login/>}
                </div>
            </div>
        </>
    )
}
```  

And finally, we updated 'app/layout.tsx' 
```bash
import type { Metadata } from "next";
import "./globals.css";
import AuthOverlay from "./components/AuthOverlay";

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
      <body>
        <AuthOverlay />
        {children}
      </body>
    </html>
  );
}
```  

Explain the addition and the updates
