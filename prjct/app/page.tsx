/**
 * PAGE
 * Page Template
 */
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
              id: 'tD2tgTp2',
              user_id: 'user_tD2tgTp2',
              video_url: '/videos/four-wheeler.mp4',
              text: 'You know what guys.. this is really amazing!',
              created_at: 'date here',
              profile: {
                user_id: '456',
                name: 'Martin "Marty" Byrde',
                image: 'https:placehold.co/100'
              }
            }} />
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}
