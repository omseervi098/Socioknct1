import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import InfoCard from "@/components/infoCard/infoCard";
export default function Notification() {
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
    <div className="flex flex-row justify-center items-start w-full h-full md:space-x-4 mt-5 md:px-10 xl:px-16">
      <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5 ">
        <div className="mb-3">
          <InfoCard />
        </div>
      </div>
      <div className=" w-full md:w-2/3 lg:w-1/2 px-2">Notification</div>
    </div>
  );
}
