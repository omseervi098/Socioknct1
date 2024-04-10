import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
export default function Notification() {
  const { auth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center sm:p-10 md:px-20 p-5">
      <h1>Notification</h1>
    </div>
  );
}
