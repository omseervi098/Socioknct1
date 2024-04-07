import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGeneralContext } from "@/context/generalcontext";
import SignupForm from "@/components/signupForm/signupForm";

export default function Signup() {
  const { state, toggleTheme } = useGeneralContext();

  return (
    <div className="flex flex-col items-center justify-center sm:p-10 md:px-20 p-5">
      <div className="flex rounded-xl bg-white shadow-md overflow-hidden h-full w-full md:w-full">
        <div className="w-full p-2  md:p-10 py-4">
          <SignupForm />
        </div>
        <div className="flex-none relative w-2/3 md:block hidden">
          <Image src="/login.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
}
