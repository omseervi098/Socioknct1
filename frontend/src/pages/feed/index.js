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
import DeleteAlert from "@/components/modals/deleteAlert";
export default function Feed() {
  const { auth, user } = useAuthContext();
  const { location, getWeather, getNews, deleteAlert, setDeleteAlert } =
    useGeneralContext();
  const { hasMore, posts, getPosts, addPosts } = usePostContext();
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
    getWeatherAndNewsOnce();
    if (posts.length === 0) getPosts();
  }, []);

  if (!auth) {
    return null;
  }

  return (
    <div className="relative flex flex-row justify-between items-start w-full h-full md:mt-5 md:px-10 xl:px-16">
      {/* <div className="fixed left-0 w-full z-10 flex items-center justify-center top-20 transform -translate-y-1/2">
        <button className="bg-blue-500 text-sm text-white p-1 px-4 rounded-full shadow-lg">
          New Posts
        </button>
      </div> */}
      <div className="hidden m-0 p-0 md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5 ">
        <div className="mb-3 m-0 p-0">
          <InfoCard />
        </div>
        <div className="">
          <SuggestionsCard />
        </div>
      </div>
      <div className=" w-full md:w-2/3 lg:w-1/2 px-1 md:px-4">
        <div className="mb-4 hidden md:block">
          <AddPost />
        </div>
        <hr className="hidden sm:block border-1 border-gray-400 mx-4" />
        <InfiniteScroll
          dataLength={posts.length}
          next={addPosts}
          hasMore={hasMore}
          loader={posts.length === 0 ? <PostSkeleton /> : <Loader2 />}
          endMessage={
            <p className="text-center text-xs mt-2">
              <b>Thats all folks!</b>
            </p>
          }
          style={{ overflow: "hidden !important" }}
        >
          <div className="flex flex-col gap-3 w-full md:pt-4">
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
        className="hidden md:block fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => {
          //add smooth scroll
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <DeleteAlert
        text={deleteAlert.text}
        id={deleteAlert.id}
        open={deleteAlert.open}
        setOpen={setDeleteAlert}
        handleDelete={deleteAlert.handleDelete}
      />
    </div>
  );
}
