import React from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
export default function LoginForm() {
  // const { state, toggleTheme } = useGeneralContext();
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1>Welcome back!</h1>

      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
