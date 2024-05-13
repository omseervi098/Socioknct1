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
  const { commentId, postId, reply } = props;
  const { touch } = useGeneralContext();
  const { user } = useAuthContext();

  return (
    <>
      <div className="w-full flex flex-row items-start justify-start gap-2 py-1">
        <Image
          src={reply.user.avatar}
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
                <span className="text-xs font-semibold">{reply.user.name}</span>
                <span className="text-xs text-gray-500">
                  &nbsp;{props.parseDate(reply.createdAt)}
                </span>
              </div>
              <span className="text-xs text-gray-500 line-clamp-1">
                {reply.user.bio}
              </span>
            </div>
            <div className="">
              <FontAwesomeIcon icon={faEllipsisH} className="h-[20px]" />
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full flex flex-col items-start gap-1">
              <span className="text-xs" style={{ fontSize: "13px" }}>
                {reply.text}
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
    </>
  );
}
