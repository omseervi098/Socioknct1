"use client";
import React from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
export default function Navbar() {
  const { state, toggleTheme } = useGeneralContext();
  const { theme, themes } = state;
  const router = useRouter();
  return (
    <div
      className={`h-auto flex justify-between items-center text-black shadow-sm ${styles.navbar}  md:px-5`}
    >
      <div className={`hidden md:block flex items-center ${styles.logo} `}>
        <Link href="/">Socioknct {"</>"}</Link>
      </div>
      <div className="w-full md:w-auto flex  justify-evenly md:justify-end">
        <Link
          href="/login"
          className="flex-grow flex justify-center md:flex-grow-0"
        >
          <button
            className={`p-2 w-full px-4`}
            style={{
              background:
                router.pathname === "/login" ? themes.secondaryColorHover : "",
              color:
                router.pathname === "/login"
                  ? themes.primaryText
                  : themes.alternativeText,
              borderBottom:
                router.pathname === "/login"
                  ? "4px solid" + themes.secondaryColor
                  : "",
            }}
          >
            <FontAwesomeIcon icon={faRightToBracket} />{" "}
            <div className>Login</div>
          </button>
        </Link>
        <Link
          href="/signup"
          className="flex-grow flex justify-center md:flex-grow-0"
        >
          <button
            className="p-2 w-full"
            style={{
              background:
                router.pathname === "/signup" ? themes.secondaryColorHover : "",
              color:
                router.pathname === "/signup"
                  ? themes.primaryText
                  : themes.alternativeText,
              borderBottom:
                router.pathname === "/signup"
                  ? "3px solid" + themes.secondaryColor
                  : "",
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} /> <div>Join Now</div>
          </button>
        </Link>
        <div className="hidden md:flex items-center ms-2">
          <Switch
            checked={theme === "dark" ? true : false}
            onChange={toggleTheme}
            className={`${theme === "dark" ? "bg-black" : "bg-gray-200"}
          relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
