/**
 * COMMENTS
 * @app/components/posts/Comments.tsx
 */
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