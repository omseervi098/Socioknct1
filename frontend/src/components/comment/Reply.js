import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import {
  faEllipsisH,
  faHandDots,
  faListDots,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea } from "flowbite-react";
import Image from "next/image";
import { useRef, useState } from "react";
import EmojiPickerModal from "../modals/emojiPickerModal";
import { Transition } from "@headlessui/react";
export default function Reply(props) {
  const { commentId, postId, openReply } = props;
  const { touch } = useGeneralContext();
  const { user } = useAuthContext();
  const [showEmoji, setShowEmoji] = useState(false);
  const [expandReply, setExpandReply] = useState(false);
  const handleAddReply = () => {
    console.log("Add reply");
  };
  const replyRef = useRef();
  return (
    <>
      <Transition
        show={openReply}
        className="w-full"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className=" w-full flex flex-row items-start justify-center py-2 px-0">
          <div className="min-w-[40px] w-[40px] h-auto max-h-12 rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              alt="avatar"
              width={50}
              height={50}
              className="w-[40px] h-auto rounded-full"
            />
          </div>
          <div className="relative w-[calc(100%-40px)] flex flex-col items-start gap-1 pl-2">
            <div className="relative w-full">
              <Textarea
                placeholder="Write a reply"
                className={`textareacommentreply p-2 relative w-full text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 ${
                  touch ? "" : "pe-8"
                } min-h-[35px] max-h-[90px] `}
                style={{ fontSize: "13px" }}
                rows={1}
                ref={replyRef}
              ></Textarea>
              {!touch && (
                <button
                  className=" absolute right-1 bottom-1 text-gray-500  rounded-full flex items-center justify-center gap-1  p-1 px-2"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <FontAwesomeIcon icon={faSmile} className="h-[18px]" />
                </button>
              )}
            </div>
            <button
              className="bg-blue-500 flex items-center justify-center gap-1 hover:bg-blue-700 p-1 px-2  rounded-full"
              onClick={handleAddReply}
            >
              <span className="text-xs text-white">Reply</span>
            </button>
          </div>
        </div>
      </Transition>
      <div className="w-full flex-col py-2">
        <div className="w-full flex flex-row items-start justify-start gap-2">
          <Image
            src={user.avatar}
            alt="avatar"
            width={50}
            height={50}
            className="w-[40px] h-auto rounded-full"
          />

          <div
            className="bg-gray-200 w-full flex flex-col items-start justify-between gap-1 px-2 pt-1 pb-2  rounded-lg"
            style={{ borderTopLeftRadius: "0px" }}
          >
            <div className="w-full flex flex-row items-start justify-between gap-2">
              <div className="w-full flex flex-col flex-wrap items-start justify-start gap-0">
                <div className="w-full text-xs font-semibold flex flex-row flex-wrap items-start gap-0">
                  <span className="text-xs font-semibold">
                    Omprakash Choudhary
                  </span>
                  <span className="text-xs text-gray-500">&nbsp;1 day ago</span>
                </div>
                <span className="text-xs text-gray-500 line-clamp-1">
                  SDE at Google | 4x Intern | ML Enthusiast
                </span>
              </div>
              <div className="">
                <FontAwesomeIcon icon={faEllipsisH} className="h-[20px]" />
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <div className="w-full flex flex-col items-start gap-1">
                <span className="text-xs" style={{ fontSize: "13px" }}>
                  lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
              </div>
              <div className="w-full flex flex-row items-center justify-start gap-3">
                <button className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                  Like (10)
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex text-xs flex-col items-start gap-2 py-2 px-1">
          Load more replies ...
        </div>
      </div>
      <EmojiPickerModal
        showEmoji={showEmoji}
        setShowEmoji={setShowEmoji}
        replyRef={replyRef}
      />
    </>
  );
}
