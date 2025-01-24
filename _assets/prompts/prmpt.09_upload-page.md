# UPLOAD PAGE
Prompt

'app/uploads/page.tsx'
'app/types.tsx'
'app/layouts/UploadLayout.tsx'

In this new project we added 'app/uploads/page.tsx'  
```bash
"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UploadError } from "../types";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PiKnifeLight } from "react-icons/pi";
import UploadLayout from "../layouts/UploadLayout";
export default function Upload(){
    const router = useRouter()
    let [fileDisplay, setFileDisplay] = useState<string>('');
    let [caption, setCaption] = useState<string>('');
    let [file, setFile] = useState<File | null>(null);
    let [error, setError] = useState<UploadError | null>(null);
    let [isUploading, setIsUploading] = useState<boolean>(false);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        
        if(files && FileSystem.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file)
            setFileDisplay(fileUrl);
            setFile(file)
        }
    }
    const clearVideo = () => {
        setFileDisplay('')
        setFile(null)
    }
    const discard = () => {
        setFileDisplay('')
        setFile(null)
        setCaption('')
    }
    const createNewPost = () => {
        console.log('Create New Post')
    }
    return(
        <>
            <UploadLayout>
                <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
                    <div>
                        <h1 className="text-[23px] font-semibold">Upload Video</h1>
                        <h2 className="text-gray-400 mt-1">Post a video to your account.</h2>
                    </div>

                    <div className="mt-8 md:flex gap-6">
                        {!fileDisplay ? (
                            <label
                                htmlFor="fileInput"
                                className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                <BiSolidCloudUpload size="40" color="#B3B3B1" />
                                <p className="mt-4 text-[17px]">Select video to upload.</p>
                                <p className="mt-1.5 text-gray-500 text-[13px]">Or drag and drop a file.</p>
                                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                                <p className="mt-2 text-gray-400 text-[13px]">Up to 30 minutes</p>
                                <p className="mt-4 text-gray-400 text-[13px]">Less than 2GB</p>

                                <label htmlFor="" className="mx-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer">Select File</label>
                                <input type="file" id="fileInput" onChange={onChange} hidden accept=".mp4" />
                            </label>
                        ) : (
                            <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
                                {isUploading ? (
                                    <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                                        <div className="mx-auto flex items-center justify-center gap-1">
                                            <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                            <div className="text-white font-bold">Uploading...</div>
                                        </div>
                                    </div>
                                ) : null} 

                                <img src="/images/mobile-case.png" className="absolute z-20 pointer-events-none"/>

                                <img src="/images/logo-white.png" width="90" className="absolute right-4 bottom-6 z-20" />

                                <video autoPlay loop muted src={fileDisplay} className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"/>

                                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border-gray-300">
                                    <div className="flex items-center truncate">
                                        <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                                        <p className="text-[11px] pl-1 truncate text-ellipsis">
                                            {file ? file.name : ''}
                                        </p>
                                    </div>

                                    <button onClick={() => clearVideo()} className="text-[11px] ml-2 font-semibold">Change</button>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 mb-6">
                            <div className="flex bg-[#F8F8F8] py-4 px-6">
                                <div>
                                    <PiKnifeLight className="mr-4" size="20" />
                                </div>
                                <div>
                                    <div className="text-semibold text-[15px] mb-1.5">Divide videos and edit.</div>
                                    <div className="text-semibold text-[13px] text-gray-400">
                                        You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos. 
                                    </div>
                                </div>

                                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                                    <button className="px-8 px-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm">
                                        Edit
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <div className="mb-1 text-[15px]">Caption</div>
                                    <div className="text-gray-400 text-[12px]">{caption.length}/150</div>
                                </div>
                                <input type="text" maxLength={150} className="w-full border p-2.5 rounded-md focus:outline-none" value={caption} onChange={event => setCaption(event?.target.value)} />
                            </div>

                            <div className="flex gap-3">
                                <button disabled={isUploading} onClick={() => discard()} className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm">
                                    Discard
                                </button>
                                <button disabled={isUploading} onClick={() => createNewPost()} className="px-10 px-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] rounded-sm">
                                    {isUploading ? <BiLoaderCircle className="animate-spin" color="#FFFFFF" size={25} /> : 'Post' }
                                </button>
                            </div>

                            {error ? (
                                <div className="text-red-600 mt-4">
                                    {error.message}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </UploadLayout>
        </>
    )
}
```  

In this new project we updated 'app/types.tsx'  
```bash
export interface RandomUsers {
    id: string,
    name: string,
    image: string
}
export interface Like {
    id: string;
    user_id: string;
    post_id: string
}
export interface Comment {
    id:string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string
}
export interface PostWithProfile {
    id:string;
    user_id:string;
    video_url:string;
    text:string;
    created_at:string;
    profile: {
      user_id:string;
      name:string;
      image:string;
    }
}
export interface UploadError {
    type: string;
    message:string;
}
export interface PostMainCompTypes {
    post: PostWithProfile
}
export interface PostMainLikesCompTypes {
    post: PostWithProfile
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

Finally we created 'app/layouts/UploadLayout.tsx'  
```bash
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
                <SideNavMain />
                {children}
            </div>
        </>
    )
}
```  

Explain the addition, the update and why the url path to '/upload' is displaying a 404.

Based on the final updates to:
'app/uploads/page.tsx'
'app/types.tsx'
'app/layouts/UploadLayout.tsx'

Provide the commit message for this update to the project repository.

feat: Add video upload page with layout and type updates