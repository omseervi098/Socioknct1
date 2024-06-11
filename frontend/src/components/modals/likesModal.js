import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import { Poppins } from "next/font/google";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function LikesModal(props) {
  const cancelButtonRef = useRef(null);
  const { open, setOpen, likes } = props;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className={`relative z-50  ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="w-full sm:flex sm:items-start">
                    <div className="w-full mt-0 text-center sm:mt-0 sm:ml-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="w-full text-lg leading-6 font-medium text-gray-900 border-b border-gray-500 pb-4"
                      >
                        Likes for this post
                        <FontAwesomeIcon
                          icon={faX}
                          className="float-right text-red-500 cursor-pointer"
                          onClick={() => setOpen(false)}
                        />
                      </Dialog.Title>
                      <div className="w-full mt-1">
                        <ul className="flex flex-col gap-2 m-0 p-0  w-full overflow-y-auto">
                          {likes &&
                            likes.map((like, index) => {
                              return (
                                <li
                                  key={index}
                                  className="m-0 p-0 w-full flex justify-between items-center p-2 border-b border-gray-200"
                                >
                                  <div className="flex items-center gap-2 justify-between">
                                    <Image
                                      src={like.user.avatar}
                                      alt="profile"
                                      width={40}
                                      height={40}
                                      className="rounded-full object-cover w-9 h-9"
                                    />{" "}
                                    <div className="flex flex-col items-start">
                                      <p className=" text-sm font-semibold text-gray-900">
                                        {like.user.name}
                                      </p>
                                      <p className="text-start  text-xs font-semibold text-gray-500 line-clamp-1">
                                        {like.user.bio}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex ms-3 justify-center items-center">
                                    <FontAwesomeIcon
                                      icon={faUserPlus}
                                      className="text-blue-500 cursor-pointer"
                                      onClick={() => {
                                        console.log("clicked");
                                      }}
                                    />
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
