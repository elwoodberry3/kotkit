/**
 * Post User
 * Component
 */

import {useEffect, useRef} from "react";
import { PostUserCompTypes } from "@/app/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";

export default function PostUser({ post }: PostUserCompTypes){

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handleMouseEnter = () => video.play();
        const handleMouseLeave = () => video.pause();

        video.addEventListener('mouseenter', handleMouseEnter);
        video.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            video.removeEventListener('mouseenter', handleMouseEnter);
            video.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [])

    return (
        <>

            <div className="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
                {!post.video_url ? (
                    <div className="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                        <AiOutlineLoading3Quarters className="animate-spin ml-1" size="80" color="#FFFFFF" />
                    </div>
                ) : (
                    <Link href={`/post/${post.id}/${post.user_id}`}>
                        <video
                            ref={videoRef}
                            muted
                            loop
                            className="aspect-[3/4] object-cover rounded-md"
                            src={post.video_url}
                        />
                    </Link>
                )}
            </div>
        </>
    )
}