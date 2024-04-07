import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useGeneralContext } from "@/context/generalcontext";
import Navbar from "@/components/navbar/navbar";
import LoginForm from "@/components/loginForm/loginForm";

export default function Login() {
  const { state, toggleTheme } = useGeneralContext();

  return (
    <div className="h-auto flex flex-col items-center justify-center sm:p-10 p-5">
      <div className="flex rounded-xl bg-white shadow-md overflow-hidden h-full w-full">
        <div className=" flex-auto p-20">
          <LoginForm />
        </div>
        <div className="flex-none relative w-1/2 sm:block hidden">
          <Image src="/login.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
}
