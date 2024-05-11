import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import InfoCard from "@/components/infoCard/infoCard";
import AddPost from "@/components/addPost/addPost";
import WeatherCard from "@/components/weatherCard/weatherCard";
import NewsCard from "@/components/newsCard/newsCard";
import { useGeneralContext } from "@/context/generalcontext";
import axios from "axios";
import Post from "@/components/post/Post";
import { usePostContext } from "@/context/postcontext";
import SuggestionsCard from "@/components/suggestionsCard/suggestionsCard";
import Footer from "@/components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Loader1 from "@/components/loader/loader1";
import PostSkeleton from "@/components/post/PostSkeleton";
import Loader2 from "@/components/loader/loader2";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Feed() {
  const { auth, user } = useAuthContext();
  const { location, getWeather, getNews } = useGeneralContext();
  const { getTotalPosts, totalPosts, hasMore, posts, getPosts, addPosts } =
    usePostContext();
  const router = useRouter();
  const getWeatherAndNewsOnce = useCallback(() => {
    if (user && user.location) {
      getWeather(user.location);
    } else {
      getWeather(location);
    }
    getNews();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    getWeatherAndNewsOnce();
    async function handleFetch() {
      await getTotalPosts();
      await getPosts();
    }
    handleFetch();
  }, []);

  if (!auth) {
    return null;
  }

  return (
    <div className="relative flex flex-row justify-between items-start w-full h-full md:space-x-4 mt-5 md:px-10 xl:px-16">
      {/* <div className="fixed left-0 w-full z-10 flex items-center justify-center top-20 transform -translate-y-1/2">
        <button className="bg-blue-500 text-sm text-white p-1 px-4 rounded-full shadow-lg">
          New Posts
        </button>
      </div> */}
      <div className="hidden m-0 p-0 md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="mb-3 m-0 p-0">
          <InfoCard />
        </div>
        <div className="">
          <SuggestionsCard />
        </div>
      </div>
      <div className=" w-full md:w-2/3 lg:w-1/2 px-2">
        <div className="mb-5">
          <AddPost />
        </div>
        <hr className="border-1 border-gray-400 mx-3" />
        <InfiniteScroll
          dataLength={posts.length}
          next={addPosts}
          hasMore={hasMore}
          loader={posts.length === 0 ? <PostSkeleton /> : <Loader2 />}
          endMessage={
            <p className="text-center text-xs">
              <b>Yay! You have seen it all</b>
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col gap-5 w-full pt-6">
            {posts &&
              posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })}
          </div>
        </InfiniteScroll>
      </div>
      <div className="hidden lg:flex flex-col gap-3 lg:w-1/4 xl:w-1/4 px-0">
        <div className="">
          <WeatherCard />
        </div>
        <div className="">
          <NewsCard />
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
      <button
        id="scrollToTop"
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => {
          //add smooth scroll
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    </div>
  );
}
