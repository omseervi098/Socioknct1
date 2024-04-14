import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useGeneralContext } from "@/context/generalcontext";
import Navbar from "@/components/navbar/navbar";
import LoginForm from "@/components/loginForm/loginForm";

export default function Login() {
  const { toggleTheme } = useGeneralContext();

  return (
    <div className="flex flex-col items-center justify-center sm:p-10 md:px-20 p-5">
      <div className="flex rounded-xl bg-white shadow-md overflow-hidden h-full w-full md:w-full">
        <div className="w-full p-2  md:p-10 py-5">
          <LoginForm />
        </div>
        <div className="flex-none relative w-2/3 md:block hidden">
          <Image src="/login.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
}
