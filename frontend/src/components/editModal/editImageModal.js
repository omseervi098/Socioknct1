import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faExchange,
  faExclamationTriangle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import TextEditor from "../textEditor/textEditor";
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
export default function EditImageModal(props) {
  const cancelButtonRef = useRef(null);
  const { avatar } = props;
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();

  const handleSubmit = async (e) => {};
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {}}
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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen w-full md:h-auto md:w-[70vw] flex flex-col justify-between">
                <div className="pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className=" flex flex-col">
                      <span className=" font-semibold">Profile Picture</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("avatar");
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={240}
                    height={240}
                    className="rounded-full"
                  />
                </div>
                <div className="text-sm  flex flex-row justify-center items-center gap-4">
                  <div className=" px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none`}
                    >
                      <FontAwesomeIcon icon={faEdit} /> &nbsp; Edit Picture
                    </button>
                  </div>
                  <div className=" px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                    <button
                      className={`bg-blue-500 text-white  px-4 py-2 rounded-md focus:outline-none`}
                    >
                      <FontAwesomeIcon icon={faExchange} />
                      &nbsp; Replace Picture
                    </button>
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
