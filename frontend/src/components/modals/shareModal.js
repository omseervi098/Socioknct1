import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
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
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function ShareModal(props) {
  const cancelButtonRef = useRef(null);
  const { open, setOpen, url } = props;
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 w-full sm:max-w-xl md:max-w-lg">
                <div className="w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="w-full sm:flex sm:items-start">
                    <div className="w-full mt-0 text-center sm:mt-0 sm:ml-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="w-full text-lg leading-6 font-medium text-gray-900 border-b border-gray-300 pb-4"
                      >
                        Share this post via ...
                        <FontAwesomeIcon
                          icon={faX}
                          className="float-right text-red-500 cursor-pointer"
                          onClick={() => setOpen(false)}
                        />
                      </Dialog.Title>
                      <div className="w-full mt-3">
                        <div className="w-full flex gap-3 flex-col items-center justify-center">
                          <div className="w-full flex flex-row items-center justify-between">
                            <input
                              type="text"
                              value={url}
                              className="flex-grow text-sm p-2 border border-gray-300 rounded-md"
                              readOnly
                            />
                            <FontAwesomeIcon
                              icon={faCopy}
                              className="ml-2 cursor-pointer h-6 w-6 text-gray-500 hover:text-gray-700"
                              onClick={() => {
                                if (navigator && navigator.clipboard) {
                                  navigator.clipboard.writeText(url);
                                  toast.success("Link copied to clipboard");
                                } else {
                                  toast.error("Failed to copy link");
                                }
                              }}
                            />
                          </div>

                          <div className="w-full flex flex-row items-center justify-evenly gap-2">
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet?url=${url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a
                              href={`https://www.linkedin.com/shareArticle?url=${url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                            <a
                              href={`https://api.whatsapp.com/send?text=${url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                            >
                              <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                          </div>
                        </div>
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
