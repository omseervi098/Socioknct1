import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import InfoCard from "@/components/infoCard/infoCard";
import AddPost from "@/components/addPost/addPost";
import WeatherCard from "@/components/weatherCard/weatherCard";
import NewsCard from "@/components/newsCard/newsCard";
export default function Feed() {
  const { auth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    //check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  if (!auth) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row justify-between items-start w-full h-full md:space-x-4 mt-6 md:px-10 xl:px-16">
      <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5">
        <InfoCard />
      </div>
      <div className="flex-grow px-2">
        <AddPost />
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
