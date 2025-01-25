# EDIT PROFILE OVERLAY
Prompt

In this new project we added 'app/components/profile/EditProfileOverlay.tsx' 
```bash
import { CropperDimensions, ShowErrorObject } from "@/app/types";
import { Cropper } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/styles.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import TextInput from "../TextInput";
import { BiLoaderCircle } from "react-icons/bi";
export default function EditProfileOverlay() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);
    const [cropper, setCropper] = useState<CropperDimensions | null>(null);
    const [uploadedImage, setUploadImage] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | ''>('https://placehold.co/100');
    const [userName, setUserName] = useState<string | ''>('');
    const [userBio, setUserBio] = useState<string | ''>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<ShowErrorObject | null>(null);
    const getUploadedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if(selectedFile){
            setFile(selectedFile);
            setUploadImage(URL.createObjectURL(selectedFile));
        }else{
            setFile(null);
            setUploadImage(null);
        }
    }
    const showError = (type:string) => {
        if(error && Object.entries(error).length > 0 && error?.type == type){
            return error.message
        }
        return ''
    }
    const cropAndUpdateImage = () => {
        console.log('Crop and Update Image!')
    }
    return (
        <>
            <div id="EditProfileOverlay" className="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto">
                <div className={`relative bg-white w-full max-w-[700px] sm:h-[580px] h-[655px] mx-3 p-4 rounded-lg mb-10 ${!uploadedImage ? 'h-[655px]' : 'h-[580px]'}`}>
                    <div className="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
                        <h1 className="text-[22px] font-medium">Edit Profile</h1>
                        <button className="hover:bg-gray-200 p-1 rounded-full" disabled={isUpdating}>
                            <AiOutlineClose size="25" />
                        </button>
                    </div>
                    <div className={`h-[calc(500px-200px)] ${!uploadedImage ? 'm-16' : 'mt-[58px]'}`}>
                        {!uploadedImage ? (
                            <div>
                                <div id="ProfilePhotoSelection" className="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full">
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">Profile Photo</h3>
                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <label htmlFor="image" className="relative cursor-pointer">
                                            <img className="round-full" width="95" src={userImage} />
                                            <button className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px] h-[32px]">
                                                <BsPencil size="17" className="ml-0.5"/>
                                            </button>
                                        </label>
                                        <input type="file" className="hidden" id="image" onChange={getUploadedImage} accept="image/png, image/jpeg, image/jpg" />
                                    </div>
                                </div>

                                <div id="UserNameSection" className="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full">
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">Name</h3>
                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <div className="sm:w-[60%] w-full max-w-md">
                                            <TextInput
                                                string={userName}
                                                placeholder="Username"
                                                onUpdate={setUserName}
                                                inputType="text"
                                                error={showError('userName')}
                                            />
                                            <p className={`relative text-[11px] text-gray-500 ${error ? 'mt-1' : 'mt-4'}`}>
                                                Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your profile link.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div id="UserBioSection" className="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full">
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">Bio</h3>
                                    <div className="flex items-center justify-center sm:-mt-6">
                                        <div className="sm:w-[60%] w-full max-w-md">
                                            <textarea 
                                                cols={30} 
                                                rows={4} 
                                                onChange={e => setUserBio(e.target.value)} 
                                                value={userBio || ''} 
                                                maxLength={80} 
                                                className="resize-none w-full bg-[#F1F1F1] text-gray-300 rounded-md py-2.5 px-3 focus:outline-none">    
                                            </textarea>
                                            <p className="text-[11px] text-gray-500">
                                                {userBio ? userBio.length : 0}/80
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil">
                                <Cropper 
                                    stencilProps={{ aspectRatio: 1}}
                                    className="h-[400px]"
                                    onChange={(cropper) => setCropper(cropper.getCoordinates())}
                                    src={uploadedImage}
                                />
                            </div>
                        )}
                    </div>
                    <div id="ButtonSection" className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full">
                        {!uploadedImage ? (
                            <div id="UpdateInfoButtons" className="flex items-center justify-end">
                                <button
                                    disabled={isUpdating}
                                    className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                                >
                                    <span className="px-2 font-medium text-[15px]">Cancel</span>
                                </button>
                                <button
                                    disabled={isUpdating}
                                    className="flex items-center bg-[#F02C56] text-white-border rounded-md ml-3 px-3 py-[6px]"
                                >
                                    <span className="px-2 font-medium text-[15px]">
                                        {isUpdating ? <BiLoaderCircle color="#FFFFFF" className="my-1 mx-2.5 animate-spin" /> : "Save"}
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div id="CropperButtons" className="flex items-center justify-end">
                                <button onClick={() => setUploadImage(null)} className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100">
                                    <span className="px-2 font-medium text-[15px]">Cancel</span>
                                </button>
                                <button onClick={() => cropAndUpdateImage()} className="flex items-center bg-[#F02C56] text-white-border rounded-md ml-3 px-3 py-[6px]">
                                    <span className="px-2 font-medium text-[15px]">
                                        {isUpdating ? <BiLoaderCircle color="#FFFFFF" className="my-1 mx-2.5 animate-spin" /> : "Apply"}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
```  

Next, we updated 'app/types.tsx' 
```bash
export interface RandomUsers {
    id: string,
    name: string,
    image: string
}
export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}
export interface ShowErrorObject {
    type: string;
    message: string; 
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
export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
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

export interface ProfilePageTypes {
    params: { id: string; };
}

export interface PostUserCompTypes {
    post: Post
}
export interface MenuItemTypes {
    iconString:string,
    colorString:string,
    sizeString:string
}
export interface MenuItemCompTypes{
    user: RandomUsers
}
export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}
```  

After that we added 'app/profile/[id]/page.tsx' 
```bash
"use client"
import ClientOnly from "@/app/components/ClientOnly";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import PostUser from "@/app/components/profile/PostUser";
import MainLayout from "@/app/layouts/MainLayout";
import { ProfilePageTypes } from "@/app/types";
import { BsPencil } from "react-icons/bs";
export default function Profile({ params }: ProfilePageTypes){
    const defaultUser = {
        id: '123',
        user_id: '456',
        name: 'John Weeks',
        image: 'https://placehold.co/200',
        bio: 'This is my bio. Follow me!'
    }
    return (
        <>
            <MainLayout>
                <ClientOnly>
                    <EditProfileOverlay />
                </ClientOnly>
                <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                    <div className="flex w-[calc(100vw-230px)]">
                        <ClientOnly>
                            {true ? (
                                <img className="w-[120px] min-w-[120px] rounded-full" src={defaultUser.image} />
                            ) : (
                                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full" />
                            )}
                        </ClientOnly>
                        <div className="ml-5 w-full">
                            <ClientOnly>
                                {defaultUser?.name ? (
                                    <div>
                                        <p className="text-[30px] font-bold truncate">{defaultUser.name}</p>
                                        <p className="text-[18px] truncate">{defaultUser.name}</p>
                                    </div>
                                ) : (
                                    <div className="h-[60px]" />
                                )}
                            </ClientOnly>
                            {true ? (
                                <button className="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100">
                                    <BsPencil className="mt-0.5 mr-1"  size="18"/>
                                    <span>Edit Profile</span>
                                </button>
                            ) : (
                                <button
                                    className="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]"
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <span className="font-bold">10K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">Following</span>
                        </div>
                        <div className="mr-4">
                            <span className="font-bold">44K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">Followers</span>
                        </div>
                    </div>
                    <ClientOnly>
                        <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                            {defaultUser.bio}
                        </p>
                    </ClientOnly>
                    <ul className="w-full flex items-center pt-4 border-b">
                        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Likes</li>
                    </ul>
                    <ClientOnly>
                        <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                            <PostUser post={{
                                id:'123',
                                user_id:'345',
                                video_url:'/videos/dance.mp4',
                                text:'This is a post',
                                created_at: 'date goes here'
                            }} />
                        </div>
                    </ClientOnly>
                </div>
            </MainLayout>
        </>
    )
}
```  

And finally we added 'app/components/TextInput.tsx' 
```bash
import { TextInputCompTypes } from "../types";
export default function TextInput({string, inputType, placeholder, error, onUpdate}: TextInputCompTypes) {
    return(
        <>
            <input 
                placeholder={placeholder}
                type={inputType}
                className="block w-full bg-[#F1F1F1] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                value={string || ''}
                onChange={(event) => onUpdate(event.target.value)}
                autoComplete="off"
            />
            <div className="text-red-500 text-[14px] font-semibold">
                {error ? (error) : (null)}
            </div>
        </>
    )
}
```  

Explain the addition and the updates