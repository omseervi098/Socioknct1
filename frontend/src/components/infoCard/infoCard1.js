import { useGeneralContext } from "@/context/generalcontext";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBell,
  faHome,
  faMessage,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
export default function InfoCard1({ user }) {
  const { themes } = useGeneralContext();
  return (
    <div className="flex text-xs flex-col items-center justify-center pb-3 w-full bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="relative w-full overflow-hidden">
          <Image
            src={user.background}
            alt="login"
            width={240}
            height={200}
            className="w-full rounded-lg object-center  bg-blue-500"
          />
          <div className="w-20 md:w-16 xl:w-20 p-1 rounded-full absolute top-auto left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg">
            <Image
              src={user.avatar}
              alt="avatar"
              width={60}
              height={60}
              className="w-full rounded-full mx-auto object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center w-full mt-10 px-2">
            <h1
              className="text-lg font-bold
            "
            >
              {user.name}
            </h1>
            <span className="text-xs text-gray-500"> {user.bio}</span>{" "}
          </div>
          <div className="flex text-sm flex-row  md:flex-col flex-wrap gap-3 items-center justify-center w-full mt-4 px-7">
            <Link
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg md:w-full flex flex-col sm:flex-row items-center justify-center"
              href="/feed"
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="md:mr-2"
                width={20}
              />
              <span>Connect</span>
            </Link>
            <Link
              href="/chat"
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg md:w-full flex  flex-col sm:flex-row items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faMessage}
                className="md:mr-2"
                width={20}
              />
              <span>Message</span>
            </Link>
            <Link
              href="/notification"
              className="rounded-lg w-full flex items-center justify-center"
            >
              <span className="float-end"> View full profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
