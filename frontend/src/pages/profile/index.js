import InfoCard from "@/components/infoCard/infoCard";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export default function Profile() {
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
    <div className="flex flex-row justify-center items-start w-full h-full md:space-x-4 mt-6 md:px-10 xl:px-16">
      <div className="hidden md:block w-1/3 lg:w-1/4 xl:w-1/5">
        <InfoCard />
      </div>
      <div className="flex-grow px-2">Profile</div>
    </div>
  );
}
