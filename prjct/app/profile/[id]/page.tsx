/**
 * PROFILE PAGE
 */
"use client"
import ClientOnly from "@/app/components/ClientOnly";
import EditProfileOverlay from "@/app/components/profile/EditProfileOverlay";
import PostUser from "@/app/components/profile/PostUser";
import MainLayout from "@/app/layouts/MainLayout";
import { ProfilePageTypes } from "@/app/types";
import { BsPencil } from "react-icons/bs";
export default function Profile({ params }: ProfilePageTypes){
    const defaultUser = {
        id: 'tD2tgTp2',
        user_id: 'user_tD2tgTp2',
        name: 'Martin "Marty" Byrde',
        image: 'https://placehold.co/200',
        bio: 'This is my bio. Follow me!'
    }
    return (
        <>
            <MainLayout>
                {/* <ClientOnly>
                    <EditProfileOverlay />
                </ClientOnly> */}
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
                                id: 'tD2tgTp2',
                                user_id: 'user_tD2tgTp2',
                                video_url:'/videos/four-wheeler.mp4',
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