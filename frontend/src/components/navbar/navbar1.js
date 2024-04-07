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
export default function Navbar1() {
  const { state, toggleTheme } = useGeneralContext();
  const { theme, themes } = state;
  const router = useRouter();
  return (
    <div
      className={`h-auto flex justify-between items-center text-black shadow-sm ${styles.navbar}  px-5 py-2`}
    >
      <div className={`flex items-center space-x-4 ${styles.logo}`}>
        <Link href="/">Socioknct {"</>"}</Link>
      </div>
      <div className="flex ">
        <div className="flex items-center ms-2">
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
