import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faX } from "@fortawesome/free-solid-svg-icons";
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
export default function ArticleModal(props) {
  const cancelButtonRef = useRef(null);
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();
  const { createPost } = usePostContext();
  const [content, setContent] = useState("<p>Write something here...</p>");
  const [bool, setBool] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("from submit", content.substring(3, content.length - 4).trim());
    if (
      content.substring(3, content.length - 4).trim() ===
        "Write something here..." ||
      content.substring(3, content.length - 4).trim() === ""
    ) {
      setBool(false);
      return toast.error("Empty content not allowed");
    }
    //disable the button
    await setBool(true);
    await toast
      .promise(createPost({ content: content, type: "text" }), {
        loading: "Posting...",
        success: "Posted successfully",
        error: "Failed to post",
      })
      .then(() => {
        setBool(false);
        setContent("<p>Write something here...</p>");
        props.handleOpen("article");
      })
      .catch((err) => {
        console.log(err);
        setBool(false);
        setContent("<p>Write something here...</p>");
      });
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          props.handleOpen("article");
          setContent("<p>Write something here...</p>");
        }}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen w-full md:h-auto md:w-auto sm:my-8 sm:w-full sm:max-w-xl">
                <div className=" pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.avatar}
                      width={50}
                      height={50}
                      alt="avatar"
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        Add a new article
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("article");
                        setContent("<p>Write something here...</p>");
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-0 relative">
                  <TextEditor content={content} setContent={setContent} />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto  hover:bg-blue-400 transition-all ${
                      content.substring(3, content.length - 4).trim() ===
                        "Write something here..." ||
                      content.substring(3, content.length - 4).trim() === ""
                        ? "cursor-not-allowed bg-blue-100"
                        : "cursor-pointer bg-blue-500"
                    }`}
                    onClick={handleSubmit}
                    disabled={
                      content.substring(3, content.length - 4).trim() ===
                        "Write something here..." ||
                      content.substring(3, content.length - 4).trim() === ""
                        ? true
                        : bool
                    }
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      props.handleOpen("article");
                      setContent("<p>Write something here...</p>");
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
