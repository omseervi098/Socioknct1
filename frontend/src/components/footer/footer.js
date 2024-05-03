import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="p-6 text-center">
      <div className="flex flex-wrap justify-center gap-4 mb-2">
        <Link
          href="/about"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          Contact
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          Terms
        </Link>
        <Link
          href="/help"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          Help
        </Link>
        <Link
          href="/careers"
          className="text-xs text-gray-600 hover:text-gray-800 hover:underline"
        >
          Careers
        </Link>
      </div>
      <div className="flex flex-wrap justify-center text-sm gap-4">
        <Link href="/" className="flex items-center">
          <Image src="/favicon.ico" alt="logo" width={30} height={30} />
          &nbsp;Socioknct &copy; 2024
        </Link>
      </div>
    </div>
  );
}
