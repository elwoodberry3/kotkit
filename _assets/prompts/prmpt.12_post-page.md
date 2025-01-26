# POST PAGE
Prompt

In this new project we added 'app/post/[postid]/[userid]/page.tsx'
```bash  
"use client"
import ClientOnly from "@/app/components/ClientOnly";
import Comments from "@/app/components/posts/Comments";
import CommentsHeader from "@/app/components/posts/CommentsHeader";
import { PostPageTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
export default function Post({params}:PostPageTypes) {
    const router = useRouter()
    const loopThroughPostUp = () => {
        console.log('Loop Through Posts Up')
    }
    const loopThroughPostDown = () => {
        console.log('Loop Through Posts Down')
    }
    const postById = {
        id: 'tD2tgTp2',
        user_id: 'user_tD2tgTp2',
        video_url: '/videos/four-wheeler.mp4',
        text: 'this is some text',
        created_at: 'date here',
        profile: {
            user_id: '456',
            name: 'Martin "Marty" Byrde',
            image: 'https:placehold.co/100'
          }
    }
    return(
        <>
            <div id="PostPage" className="lg:flex justify-between w-full h-screen bg-black overflow-auto">
                <div className="lg:w-[calc(100%-540px)] h-full relative">
                    <Link href={`/profile/${params?.userId}`} className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                        <AiOutlineClose size="27"/>
                    </Link>
                    <div>
                        <button onClick={() => loopThroughPostUp()} className="absoulte z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                            <BiChevronUp size="30" color="#FFFFFF" />
                        </button>
                        <button onClick={() => loopThroughPostDown()} className="absoulte z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                            <BiChevronDown size="30" color="#FFFFFF" />
                        </button>
                    </div>
                    <img className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" width="45" src="/images/logo-small.png" />
                    <ClientOnly>
                        {postById?.video_url ? (
                            <video
                                className="fixed object-cover w-full my-auto z-[0] h-screen"
                                src="/videos/four-wheeler.mp4"
                            ></video>
                        ) : (null)}

                        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {true ? (
                                <video
                                    autoPlay
                                    controls
                                    loop
                                    muted
                                    className="h-screen mx-auto"
                                    src="/videos/four-wheeler.mp4"
                                />
                            ) : (null)}
                        </div>
                    </ClientOnly>
                </div>
                <div id="InfoSection" className="lg:max-w-[550px] relative w-full h-full bg-white">
                    <div className="py-7"/>
                    <ClientOnly>
                        {postById?.video_url ? (
                            <CommentsHeader post={postById} params={params} />
                        ) : (null)}
                    </ClientOnly>
                    <Comments params={params} />
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
export interface CommentWithProfile {
    id:string;
    user_id:string;
    post_id:string;
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
export interface CommentsHeaderCompTypes {
    params: {
        userId: string;
        postId: string;
    }
    post: PostWithProfile
}
export interface CommentsCompTypes {
    params: {
        userId: string;
        postId: string;
    }
}
export interface SingleCommentCompTypes {
    params: {
        userId: string;
        postId: string;
    };
    comment: CommentWithProfile
}
export interface PostMainCompTypes {
    post: PostWithProfile
}
export interface PostMainLikesCompTypes {
    post: PostWithProfile
}
export interface PostPageTypes {
    params: { 
        userId: string; 
        postId: string 
    };
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

We then created 'app/components/posts/CommentsHeader.tsx'
```bash 
"use client"
import { CommentsHeaderCompTypes } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import ClientOnly from "../ClientOnly";
import { AiFillHeart } from "react-icons/ai";
export default function CommentsHeader({post, params}: CommentsHeaderCompTypes) {
    const router = useRouter()
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [userLiked, setUserLiked] = useState<boolean>(false)
    const deletePost = () => {
        console.log('Delete Post')
    }
    const likeOrUnlike = () => {
        console.log('Like Or Unlike')
    }
    return(
        <>
            <div className="flex items-center justify-between px-8">
                <div className="flex items-center">
                    <Link href={`/profile/${post?.user_id}`}>
                        {post?.profile.image ? (
                            <img className="rounded-full lg:mx-o mx-auto" width="40" src={post?.profile.image} />
                        ) : (
                            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"/>
                        )}
                    </Link>
                    <div className="ml-3 pt-0.5">
                        <Link 
                            href={`/profile/${post?.user_id}`}
                            className="relative z-10 text-[17px] font-semibold hover:underline"
                        >
                            {post?.profile.name}
                        </Link>
                        <div className="relative z-0 text-[13px] -mt-5 font-light">
                            {post?.profile.name}
                            <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5">.</span>
                            <span className="font-medium">{post?.created_at}</span>
                        </div>
                    </div>
                </div>
                {true ? (
                    <div>
                        {isDeleting ? (
                            <BiLoaderCircle className="animate-spin" size="25" />
                        ) : (
                            <button disabled={isDeleting} onClick={() => deletePost()}>
                                <BsTrash3 className="cursor-pointer" size="25" />
                            </button>
                        )}
                    </div>
                ) : (null)}
            </div>
            <p className="px-8 mt-4 text-sm">{post?.text}</p>
            <p className="flex item-center gap-2 px-8 mt-4 text-sm font-bold">
                <ImMusic size="17" />
                Original Sound - {post?.profile.name}
            </p>
            <div className="flex items-center px-8 mt-8">
                <ClientOnly>
                    <div className="pb-4 text-center flex items-center">
                        <button
                            disabled={hasClickedLike}
                            onClick={() => likeOrUnlike()}
                            className="rounded-full bg-gray-200 p-2 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart size="25" />
                            ) : (
                                <BiLoaderCircle className="animate-spin" size="25" />
                            )}
                        </button>
                        <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">103</span>
                    </div>
                </ClientOnly>
                <div className="pb-4 text-center flex items-center">
                    <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <BsChatDots size={25} />
                    </div>
                    <span className="text-xs pl-2 text-gray-800 font-semibold">
                        4
                    </span>
                </div>
            </div>
        </>
    )
} 
``` 

And created  'app/components/posts/Comments.tsx'
```bash  
import { CommentsCompTypes } from "@/app/types";
import ClientOnly from "../ClientOnly";
import SingleComment from "./SingleComment";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
export default function Comments({params}: CommentsCompTypes) {
    const [comment, setComment] = useState<string>('')
    const [inputFocused, setInputFocused] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const commentsByPost = [
        {
            id: 'tD2tgTp2',
            user_id: 'user_tD2tgTp2',
            post_id: '789',
            text: 'You know what guys.. this is really amazing!',
            created_at: 'date here',
            profile: {
              user_id: '456',
              name: 'Martin "Marty" Byrde',
              image: 'https:placehold.co/100'
            }
        },
        {
            id: 'pOO4vykh',
            user_id: 'user_pOO4vykh',
            post_id: '789',
            text: 'Shut up Marty!',
            created_at: 'date here',
            profile: {
              user_id: '456',
              name: 'Ruth Langmore',
              image: 'https:placehold.co/100'
            }
        },
        {
            id: 'tD2tgTp2',
            user_id: 'user_tD2tgTp2',
            post_id: '789',
            text: 'Ruth.. .you are a mean person.',
            created_at: 'date here',
            profile: {
              user_id: '456',
              name: 'Martin "Marty" Byrde',
              image: 'https:placehold.co/100'
            }
        },
        {
            id: 'pSsl1Eav',
            user_id: 'user_pSsl1Eav',
            post_id: '789',
            text: 'I need money to fund my project. Who can help me?',
            created_at: 'date here',
            profile: {
              user_id: '456',
              name: 'Omar Navarro',
              image: 'https:placehold.co/100'
            }
        }
    ]
    const addComment = () => {
        console.log('Add Comment')
    }
    return(
        <>
            <div id="Comments" className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto" >
                <div className="pt-2" />
                <ClientOnly>
                    {commentsByPost.length < 1 ? (
                        <div className="text-center mt-6 text-xl text-gray-500">No Comments...</div>
                    ) : (
                        <div className="">
                            {commentsByPost.map((comment, index) => (
                                <SingleComment key={index} comment={comment} params={params} />
                            ))}
                        </div>
                    )}
                </ClientOnly>
                <div className="mb-28"/>
            </div>
            <div id="CreateComment" className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2">
                <div className={`bg-[#F1F1F1] flex items-center rounded-lg w-full lg:max-w-[420px] ${inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F1]'}`}>
                    <input
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        onChange={e => setComment(e.target.value)}
                        value={comment || ''}
                        className="bg-[#F1F1F1] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
                        type="text"
                        placeholder="Add Comment..."
                    />
                </div>
                {!isUploading ? (
                    <button
                        disabled={!comment}
                        onClick={() => addComment()}
                        className={`font-semibold text-sm ml-5 pr-1 ${comment ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'}`}
                    >
                        Post
                    </button>
                ) : (
                    <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
                )}
            </div>
        </>
    )
}
``` 

And finally, we created 'app/components/posts/SingelComment.tsx'
```bash  
import { SingleCommentCompTypes } from "@/app/types";
import Link from "next/link";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";
export default function SingleComment({ comment, params}: SingleCommentCompTypes) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const deleteThisComment = () => {
        let res = confirm("Are you sure you want to delete this comment?")
        if(!res) return
        // do somthing...
    }
    return(
        <>
            <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
                <div className="flex items-center relative w-full">
                    <Link href={`/profile/${comment.profile.user_id}`}>
                        <img width="40" className="absolute top-0-rounded-full lg:mx-0 mx-auto" src={comment.profile.image} />
                    </Link>
                    <div className="ml-14 pt-0.5 w-full">
                        <div className="text-[18px] font-semibold flex items-center justify-between">
                            <span className="flex items-center">
                                {comment?.profile?.name}
                                <span className="text-[12px] text-gray-600 font-light ml-1">
                                    {comment?.created_at}
                                </span>
                            </span>
                            {true ? (
                                <button
                                    disabled={isDeleting}
                                    onClick={() => deleteThisComment()}
                                >
                                    { isDeleting ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20"/> : <BsTrash3 className="cursor-pointer" size="25"/> }
                                </button>
                            ) : (null)}
                        </div>
                        <p className="text[15px] font-light">{comment.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
``` 

Explain the addition and the updates