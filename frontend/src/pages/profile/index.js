import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export default function Profile() {
  const { auth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center sm:p-10 md:px-20 p-5">
      <h1>Profile</h1>
    </div>
  );
}
