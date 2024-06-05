import InfoCard from "@/components/infoCard/infoCard";
import Post from "@/components/post/Post";
import PostSkeleton from "@/components/post/PostSkeleton";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import { usePostContext } from "@/context/postcontext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import InfoCardSkeleton from "@/components/infoCard/infoCardSkeleton";
import InfoCard1 from "@/components/infoCard/infoCard1";
import Footer from "@/components/footer/footer";
export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const token = context.req.cookies.token;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const post = response.data.post;
    return {
      props: { post },
    };
  } catch (error) {
    return {
      props: { post: null },
    };
  }
};
export default function Page({ post }) {
  const router = useRouter();
  const { user } = useAuthContext();
  if (localStorage.getItem("token") === null) {
    router.push("/login");
  }
  if (router.isFallback || !post || !user) {
    return (
      <div className="flex flex-row justify-center items-start w-full h-full md:space-x-4 mt-5 md:px-10 xl:px-16">
        <div className="hidden md:block w-1/3">
          <InfoCardSkeleton />
        </div>
        <div className="flex-grow px-2">
          <PostSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-start w-full h-full md:space-x-4 md:mt-5 md:px-10 xl:px-24 gap-4 md:gap-0">
      <div className="px-2 sm:px-3 md:px-0 block w-full md:w-1/3 lg:w-1/4">
        {user._id === post.user._id ? (
          <div className="hidden md:block">
            <InfoCard />
          </div>
        ) : (
          <InfoCard1 user={post.user} />
        )}
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
      <div className="px-2 md:px-0 w-full md:w-2/3">
        <Post post={post} full={true} />
      </div>
    </div>
  );
}
