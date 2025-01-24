# MAIN PAGE
Prompt  

Updated page, PostMain, types and PostMainLikes

In this new project we updated 'app/page.tsx'  
```bash
"use client"
import ClientOnly from "./components/ClientOnly";
import PostMain from "./components/PostMain";
import MainLayout from "./layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-[calc(100%-90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            <PostMain post={{
              id: '123',
              user_id: '456',
              video_url: '/beach.mp4',
              text: 'this is some text',
              created_at: 'date here',
              profile: {
                user_id: '456',
                name: 'User 1',
                image: 'https:placehold.co/100'
              }
            }} />
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
```  

Next, we created 'app/components/PostMain.tsx'

```bash  
'use client';
import {useEffect} from "react";
import { PostMainCompTypes } from "../types";
import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import PostMainLikes from "./PostMainLikes";

export default function PostMain({ post }: PostMainCompTypes){

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.id}`);

        if(postMainElement){
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, { threshold: [0.6] })
            observer.observe(postMainElement)
        }
    }, [])

    return (
        <>
            <div id={`PostMain-{post.id}`} className="flex border-b py-6">
                
                <div className="cursor-pointer">
                    <img className="rounded-full max-h-[60px]" width="60" src={post?.profile?.image} />
                </div>

                <div className="pl-3 w-full px-4">
                    <div className="flex items-center justify-between pb-0.5">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>

                        <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] hover:bg-[#FFEEF2] font-semibold rounded-md">
                            Follow
                        </button>
                    </div>

                    <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p>
                    <p className="text-[14px] pb-0.5 text-gray-500">#fun #cool #superAwesome</p>
                    <p className="text-[14px] pb-0.5 flex items-center font-semibold">
                        <ImMusic size="20" />
                        <span className="px-1">original sound - Awesome</span>
                        <AiFillHeart size="20" />
                    </p>

                    <div className="mt-2.5 flex">
                        <div className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
                            <video
                                id={`video-${post.id}`}
                                loop
                                controls
                                muted
                                className="rounded-xl object-cover mx-auto h-full"
                                src={post?.video_url}
                            />

                            <img
                                className="absolute right-2 bottom-10"
                                width="90"
                                src='/images/logo-white.png'
                            />
                        </div>

                        <PostMainLikes post={post}/>

                    </div>
                </div>

            </div>
        </>
    )
}
```  

We then update the 'app/types.tsx'  

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

Next, we created 'app/components/PostMainLikes.tsx' 

```bash  
import { useState } from "react";
import { Like, PostMainLikesCompTypes } from "../types";
import { AiFillHeart } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { Comment } from "../types";
export default function PostMainLikes({ post }: PostMainLikesCompTypes){

    const router = useRouter()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const likeOrUnlike = () => {
        console.log('likeOrUnlike')
    }
    const [likes, setLikes] = useState<Like[]>([])
    const [comments, setComments] = useState<Comment[]>([])

    return (
        <>
            <div id={`PostMainLikes-${post?.id}`} className="relative mr-[75px]">
                <div className="absolute bottom-0 pl-2">
                    <div className="pb-4 text-center">
                        <button 
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()}
                            className="rounded-full bg-gray-200 p-2 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likes?.length > 0 && userLiked ? '#FF2626' : ''} size="25" />
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="25" />
                            )}
                        </button>

                        <span className="text-xs text-gray-800 font-semibold">{likes?.length}</span>
                    </div>

                    <button
                        onClick={() => router.push(`/post/${post?.id}/${post?.profile?.user_id}`)}
                        className="pb-4 text-center"
                    >
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaCommentDots size="25" />
                        </div>

                        <span className="text-xs text-gray-800 font-semibold">
                            {comments?.length}
                        </span>
                    </button>

                    <button className="=text-center">
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaShare size="25" />
                        </div>

                        <span className="text-xs text-gray-800 font-semibold">
                            55
                        </span>
                    </button>

                </div>
            </div>
        </>
    )
}
```


Explain the addition and the update.