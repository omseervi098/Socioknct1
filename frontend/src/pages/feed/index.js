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
export default function Feed() {
  const { auth, user } = useAuthContext();
  const { location, getWeather, getNews } = useGeneralContext();
  const { posts, getPosts } = usePostContext();

  const router = useRouter();
  const getWeatherAndNewsOnce = useCallback(() => {
    if (user && user.location) {
      getWeather(user.location);
    } else {
      getWeather(location);
    }
    getNews();
    getPosts();
    console.log("Posts from Feed", posts);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    // make request in every 1 hour
    getWeatherAndNewsOnce();
  }, []);
  if (!auth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row justify-between items-start w-full h-full md:space-x-4 mt-6 md:px-10 xl:px-16">
      <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5">
        <InfoCard />
      </div>
      <div className=" w-full md:w-2/3 lg:w-1/2 px-2">
        <div className="mb-2">
          <AddPost />
        </div>
        <div className="flex flex-col gap-5 w-full">
          {posts.map((post, index) => {
            return <Post key={index} post={post} />;
          })}
        </div>
      </div>
      <div className="hidden lg:flex flex-col gap-3 lg:w-1/4 xl:w-1/4 px-0">
        <div className="">
          <WeatherCard />
        </div>
        <div className="">
          <NewsCard />
        </div>
      </div>
    </div>
  );
}
