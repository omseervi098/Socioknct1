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
import Reply from "./Reply";
import EmojiPicker from "emoji-picker-react";
import { useRef, useState } from "react";
import EmojiPickerModal from "../modals/emojiPickerModal";
import { usePostContext } from "@/context/postcontext";
import { Transition } from "@headlessui/react";
export default function Comment(props) {
  const { postId, comments } = props;
  const { touch } = useGeneralContext();
  const { user } = useAuthContext();
  const { addComment } = usePostContext();
  const [showEmoji, setShowEmoji] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [expandComment, setExpandComment] = useState(false);
  const commentRef = useRef();
  const handleAddComment = () => {
    console.log("Add comment");
    addComment({ postId, comment: commentRef.current.value });
  };
  return (
    <>
      <Transition
        show={props.openComment}
        className="w-full"
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={` w-full flex flex-row items-start justify-center pt-2 pb-0 px-0 
`}
        >
          <div className="min-w-[45px] w-[45px] h-auto max-h-12 rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              alt="avatar"
              width={50}
              height={50}
              className="w-[45px] h-auto rounded-full"
            />
          </div>
          <div className="relative w-[calc(100%-45px)] flex flex-col items-start gap-1 pl-2">
            <div className="relative w-full">
              <Textarea
                placeholder="Write a comment"
                className={`textareacommentreply p-2 relative w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 ${
                  touch ? "" : "pe-8"
                } min-h-[40px] max-h-[100px]`}
                rows={1}
                ref={commentRef}
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
              onClick={handleAddComment}
            >
              <span className="text-xs text-white">Post</span>
            </button>
          </div>
        </div>
      </Transition>
      <div className="w-full flex flex-col items-start gap-2 py-2 px-0">
        {comments.slice(0, 1).map((comment) => (
          <div className="w-full flex flex-row items-start justify-start gap-0">
            <Image
              src={comment.user.avatar}
              alt="avatar"
              width={50}
              height={50}
              className="w-[40px] h-auto rounded-full"
            />
            <div className="w-[calc(100%-40px)] flex flex-col items-start gap-1 pl-2">
              <div
                className="bg-gray-200 w-full flex flex-col items-start justify-between gap-1 px-2 pt-1 pb-2  rounded-lg"
                style={{ borderTopLeftRadius: "0px" }}
              >
                <div className="w-full flex flex-row items-start justify-between gap-1">
                  <div className="w-full flex flex-col flex-wrap items-start justify-start gap-0">
                    <div className="w-full text-xs font-semibold flex flex-row flex-wrap items-start gap-0">
                      <span className="text-xs font-semibold">
                        {comment.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        &nbsp;{props.parseDate(comment.createdAt)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {comment.user.bio}
                    </span>
                  </div>
                  <div className="">
                    <FontAwesomeIcon icon={faEllipsisH} className="h-[20px]" />
                  </div>
                </div>
                <div className="w-full flex flex-col items-start gap-1">
                  <div className="w-full flex flex-col items-start gap-1">
                    <span className="text-sm">{comment.text}</span>
                  </div>
                  <div className="w-full flex flex-row items-center justify-start gap-2">
                    <button className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                      Like (10)
                    </button>
                    |
                    <button
                      className="text-xs font-semibold text-gray-700 hover:text-blue-500"
                      onClick={() => setOpenReply(!openReply)}
                    >
                      Reply (20)
                    </button>
                  </div>
                </div>
              </div>
              <Reply openReply={openReply} parseDate={props.parseDate} />
            </div>
          </div>
        ))}
        <Transition
          show={expandComment}
          className="w-full"
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {comments.length > 1 &&
            comments.slice(1).map((comment) => (
              <div className="w-full flex flex-row items-start justify-start gap-0">
                <Image
                  src={comment.user.avatar}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="w-[40px] h-auto rounded-full"
                />
                <div className="w-[calc(100%-40px)] flex flex-col items-start gap-1 pl-2">
                  <div
                    className="bg-gray-200 w-full flex flex-col items-start justify-between gap-1 px-2 pt-1 pb-2  rounded-lg"
                    style={{ borderTopLeftRadius: "0px" }}
                  >
                    <div className="w-full flex flex-row items-start justify-between gap-1">
                      <div className="w-full flex flex-col flex-wrap items-start justify-start gap-0">
                        <div className="w-full text-xs font-semibold flex flex-row flex-wrap items-start gap-0">
                          <span className="text-xs font-semibold">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            &nbsp;{props.parseDate(comment.createdAt)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {comment.user.bio}
                        </span>
                      </div>
                      <div className="">
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          className="h-[20px]"
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                      <div className="w-full flex flex-col items-start gap-1">
                        <span className="text-sm">{comment.text}</span>
                      </div>
                      <div className="w-full flex flex-row items-center justify-start gap-2">
                        <button className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                          Like (10)
                        </button>
                        |
                        <button
                          className="text-xs font-semibold text-gray-700 hover:text-blue-500"
                          onClick={() => setOpenReply(!openReply)}
                        >
                          Reply (20)
                        </button>
                      </div>
                    </div>
                  </div>
                  <Reply openReply={openReply} parseDate={props.parseDate} />
                </div>
              </div>
            ))}
        </Transition>
      </div>
      <div
        className="w-full flex text-xs flex-col items-start gap-2 py-0 px-1 hover:text-blue-500"
        onClick={() => setExpandComment(!expandComment)}
      >
        {comments.length > 1 && (
          <span className="text-xs font-semibold text-gray-700 hover:text-blue-500">
            View {expandComment ? "less" : "more"} comments
          </span>
        )}
      </div>
      <EmojiPickerModal
        showEmoji={showEmoji}
        setShowEmoji={setShowEmoji}
        commentRef={commentRef}
      />
    </>
  );
}
