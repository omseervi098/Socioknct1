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
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
export default function InfoCard() {
  const { state } = useGeneralContext();
  const { themes } = state;
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center pb-3 w-full bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="relative w-full overflow-hidden">
          <Image
            src="/login.jpg"
            alt="login"
            width={240}
            height={200}
            className="w-full object-cover h-28 rounded-lg"
          />
          <div className="w-24 p-1 rounded-full absolute top-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg">
            <Image
              src={user.avatar}
              alt="avatar"
              width={90}
              height={90}
              className="w-full rounded-full mx-auto object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center w-full mt-10 px-2">
            <h1
              className="text-xl font-bold
            "
            >
              {user.name}
            </h1>
            <hr
              className="w-4/5 mt-2 mb-2"
              style={{
                borderColor: themes.primaryColor,
              }}
            />
            <div className="flex items-center justify-center gap-2">
              <span
                className="text-sm text-gray-500 border-r pr-2"
                style={{ borderColor: themes.primaryColor }}
              >
                @{user.username}
              </span>{" "}
              <span className="text-sm text-gray-500"> 15 +</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center w-full mt-4 px-7">
            <Link
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
              href="/feed"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" width={20} />
              Home
            </Link>
            <Link
              href="/chat"
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faRocketchat}
                className="mr-2"
                width={20}
              />
              Messages
            </Link>
            <Link
              href="/notification"
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
            >
              <div className="mr-2">
                <FontAwesomeIcon icon={faBell} className="" width={20} />
              </div>
              <span className="float-end"> Notifications</span>
            </Link>

            <Link
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
              href="/profile"
            >
              <div className="mr-2">
                <FontAwesomeIcon icon={faUser} className=" " width={20} />{" "}
              </div>
              <span>Profile</span>
            </Link>
            <button
              style={{ backgroundColor: themes.primaryColor }}
              className="text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2"
                width={20}
              />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
