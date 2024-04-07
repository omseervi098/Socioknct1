import React from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
export default function Navbar() {
  const { state, toggleTheme } = useGeneralContext();
  return (
    <div className="h-auto flex justify-between items-center py-5 bg-white text-black shadow-sm px-2">
      <Link href="/">Socioknct</Link>
      <div className="flex space-x-4">
        <Link href="/login">Login</Link>
        <Link href="/signup">Register</Link>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}
