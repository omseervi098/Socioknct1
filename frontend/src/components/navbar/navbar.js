"use client";
import React from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHome,
  faMessage,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { useAuthContext } from "@/context/authcontext";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
export default function Navbar() {
  const { state, toggleTheme } = useGeneralContext();
  const { auth, user } = useAuthContext();
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
        {auth === false ? (
          <>
            <Link
              href="/login"
              className="flex-grow flex justify-center md:flex-grow-0 "
            >
              <button
                className={`p-2 w-full ${
                  router.pathname === "/login"
                    ? "border-t-4 md:border-t-0 border-b-0 md:border-b-4"
                    : ""
                } px-4`}
                style={
                  router.pathname === "/login"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faRightToBracket} /> <div>Login</div>
              </button>
            </Link>
            <Link
              href="/signup"
              className="flex-grow flex justify-center md:flex-grow-0"
            >
              <button
                className={`p-2 w-full ${
                  router.pathname === "/signup"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/signup"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faUserPlus} /> <div>Join Now</div>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/feed"
              className="flex-grow flex justify-center md:flex-grow-0 "
            >
              <button
                className={`p-2 px-5 w-full  ${
                  router.pathname === "/feed"
                    ? "border-t-4 md:border-t-0 md:border-b-4 "
                    : ""
                } `}
                style={
                  router.pathname === "/feed"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faHome} />{" "}
                <div className="text-xs">Home</div>
              </button>
            </Link>
            <Link
              href="/profile"
              className="flex-grow flex justify-center md:flex-grow-0 "
            >
              <button
                className={`p-2 px-5 w-full  ${
                  router.pathname === "/profile"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/profile"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faRocketchat} />{" "}
                <div className="text-xs">Chat</div>
                {/* <div>Profile</div> */}
              </button>
            </Link>
            <Link
              href="/profile"
              className=" flex-grow flex justify-center md:flex-grow-0"
            >
              <button
                className={`p-2 px-0 w-full ${
                  router.pathname === "/profile"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/profile"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faBell} width={30} height={30} />
                <div className="text-xs">Notification</div>
                {/* <div>Profile</div> */}
              </button>
            </Link>
            <Link
              href="/profile"
              className="flex-grow flex justify-center md:flex-grow-0"
            >
              <button
                className={`p-2 px-5 w-full ${
                  router.pathname === "/profile"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/profile"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={20}
                  height={20}
                  className="rounded-full mx-auto"
                />
                <div className="text-xs pt-1">Profile</div>
              </button>
            </Link>
          </>
        )}
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
