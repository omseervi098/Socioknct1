import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faComment,
  faCommentAlt,
  faPaperPlane,
  faSmile,
  faThumbsUp,
  faUser,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
import { Carousel } from "react-responsive-carousel";
import { Textarea } from "flowbite-react";
import { useGeneralContext } from "@/context/generalcontext";
import Comment from "../comment/Comment";
import { useAuthContext } from "@/context/authcontext";
import EmojiPickerModal from "./emojiPickerModal";
export default function PostImageModal(props) {
  const cancelButtonRef = useRef(null);
  const { postInfo, open, handleOpen, parseDate } = props;
  const { user } = useAuthContext();
  const { touch } = useGeneralContext();
  const [seeMore, setSeeMore] = useState(false);
  const [expandComment, setExpandComment] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const commentRef = useRef();
  const handleAddComment = async () => {};

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          // handleOpen();
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
              <Dialog.Panel className="relative transform overflow-x-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen md:w-auto max-w-xxl md:mx-4 lg:mx-10 xl:mx-20">
                <div className="grid md:grid-cols-3 gap-0 h-full max-h-screen">
                  <div className="md:col-span-2 h-[50vh] md:h-auto flex items-center justify-center bg-gray-800">
                    <Carousel
                      className="h-full w-full flex items-center justify-center"
                      centerMode={true}
                      centerSlidePercentage={100}
                      emulateTouch={true}
                      swipeable={true}
                      showThumbs={false}
                      showStatus={false}
                      renderIndicator={(
                        onClickHandler,
                        isSelected,
                        index,
                        label
                      ) => {
                        if (isSelected) {
                          return (
                            <li
                              className="inline-block h-4 w-4 rounded-full bg-black text-white text-xs cursor-pointer mr-1"
                              onClick={onClickHandler}
                              title={label}
                            >
                              {index + 1}
                            </li>
                          );
                        }
                        return (
                          <li
                            className="inline-block h-4 w-4 rounded-full bg-white text-black text-xs cursor-pointer mr-1"
                            onClick={onClickHandler}
                            title={label}
                          >
                            {index + 1}
                          </li>
                        );
                      }}
                      renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                          <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 right-1 transform -translate-y-1/2 z-10"
                          >
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className=" text-white bg-black bg-opacity-75 rounded-full p-2"
                            />
                          </button>
                        )
                      }
                      renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                          <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            className="absolute top-1/2 left-1 transform -translate-y-1/2 z-10"
                          >
                            <FontAwesomeIcon
                              icon={faChevronLeft}
                              className=" text-white bg-black bg-opacity-75 rounded-full p-2"
                            />
                          </button>
                        )
                      }
                    >
                      {postInfo.images.map((image, index) => (
                        <div
                          key={index}
                          className="h-full flex items-center justify-center"
                        >
                          <img
                            src={image}
                            alt="post-image"
                            width={400}
                            height={400}
                            className="max-h-[45vh] md:max-h-[80vh] max-w-[90vw] md:max-w-[80vw] object-contain"
                          />
                        </div>
                      ))}
                    </Carousel>
                    <div className="right-1 top-1 absolute p-0 sm:hidden">
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-white cursor-pointer border-transparent p-2 hover:text-red-600 transition-all border hover:border hover:border-white rounded-full p-1"
                        onClick={() => {
                          props.handleOpen();
                        }}
                      />
                    </div>
                  </div>
                  <div className="h-[50vh] md:h-full w-full flex flex-col overflow-y-auto">
                    <div className="w-full pt-3 pb-3 px-3 flex flex-row justify-between ">
                      <div className="flex items-center gap-2">
                        <Image
                          src={postInfo.user.avatar}
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full h-[45px]"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold line-clamp-1">
                            {postInfo.user.name}
                          </span>
                          <span className="text-xs text-gray-500 line-clamp-1">
                            {postInfo.user.bio} + "ML Engineer"
                          </span>
                          <span className="text-xs text-gray-500">
                            {parseDate(postInfo.createdAt)}
                          </span>

                          <span className="text-xs text-gray-500"></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          className="text-white px-3 py-2 cursor-pointer  transition-all border hover:border rounded-full p-1 bg-blue-400 hover:bg-blue-500"
                        />

                        <FontAwesomeIcon
                          icon={faX}
                          className="hidden md:block text-gray-500 p-2 border cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                          onClick={() => {
                            props.handleOpen();
                          }}
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto">
                      <div className="flex flex-col gap-2 px-3">
                        <div className="relative w-full text-xs sm:text-sm flex items-center pt-2 pb-2 px-2  ">
                          <div
                            dangerouslySetInnerHTML={{ __html: postInfo.text }}
                            className={`tiptap transition-all w-full ease-in-out duration-300
                        ${
                          seeMore
                            ? "block"
                            : "max-h-[160px] overflow-hidden mb-2"
                        }`}
                          ></div>
                          {postInfo.text.length > 500 && (
                            <div
                              className=" absolute bottom-0 right-0 text-blue-500 cursor-pointer hover:underline "
                              onClick={() => {
                                setSeeMore(!seeMore);
                              }}
                            >
                              {seeMore ? "See Less" : "..See More"}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="px-3 w-full flex flex-row justify-between items-center gap-2 pb-2 pt-1 px-1">
                        <div className="flex flex-row items-center gap-2">
                          <div className="relative flex flex-row items-center gap-0 w-14 ">
                            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden border border-gray-800">
                              <Image
                                src="https://ui-avatars.com/api/?name=Ocs+Gkads"
                                alt="avatar"
                                width={50}
                                height={50}
                                className=" rounded-full"
                              />
                            </div>
                            <div className="absolute w-6 left-4 h-6 rounded-full bg-gray-300 overflow-hidden border border-gray-800">
                              <Image
                                src="https://ui-avatars.com/api/?name=Fed+Jsss"
                                alt="avatar"
                                width={50}
                                height={50}
                                className=" rounded-full"
                              />
                            </div>
                            <div className="absolute left-8 w-6 h-6 rounded-full bg-gray-300 overflow-hidden border border-gray-800">
                              <Image
                                src="https://ui-avatars.com/api/?name=John+Doe"
                                alt="avatar"
                                width={50}
                                height={50}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {postInfo.likes.length} Likes
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                          <div className="rounded-full text-gray-500 flex items-center justify-center">
                            <FontAwesomeIcon
                              icon={faComment}
                              className="h-[15px]"
                            />
                          </div>
                          <div className="text-xs text-gray-500">
                            {postInfo.comments.length} Comments
                          </div>
                        </div>
                      </div>
                      <div className="px-2 w-full flex flex-row justify-between items-center gap-2  border-t border-gray-300 pt-1">
                        <div className="flex flex-row items-center gap-0">
                          <button className="text-gray-500 flex items-center justify-center gap-1 hover:bg-gray-100 p-1 px-2 rounded-md">
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              className="h-[20px]"
                            />
                            <span className="text-xs text-gray-700">Like</span>
                          </button>
                          <button className="text-gray-500 flex items-center justify-center gap-1 hover:bg-gray-100 p-1 px-2 rounded-md">
                            <FontAwesomeIcon
                              icon={faCommentAlt}
                              className="h-[20px]"
                            />
                            <span className="text-xs text-gray-700">
                              Comment
                            </span>
                          </button>
                        </div>
                        <button className="text-gray-500 flex items-center justify-center gap-1 hover:bg-gray-100 p-1 px-2 rounded-md">
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="h-[20px]"
                          />
                          <span className="text-xs text-gray-700">Share</span>
                        </button>
                      </div>

                      <div
                        className={`px-2 w-full flex flex-row items-start justify-center pt-2 pb-0 px-0 
`}
                      >
                        <div className="min-w-[45px] w-[45px] h-auto max-h-12 rounded-full overflow-hidden">
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
                              placeholder="Write a comment"
                              className={`textareacommentreply p-2 relative w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 ${
                                touch ? "" : "pe-8"
                              } min-h-[40px] max-h-[100px]`}
                              rows={1}
                              ref={commentRef}
                            />
                            {!touch && (
                              <button
                                className=" absolute right-1 bottom-1 text-gray-500  rounded-full flex items-center justify-center gap-1  p-1 px-2"
                                onClick={() => setShowEmoji(!showEmoji)}
                              >
                                <FontAwesomeIcon
                                  icon={faSmile}
                                  className="h-[18px]"
                                />
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
                      <div className="px-2 w-full flex flex-col items-start gap-2 pt-2 pb-0 px-0">
                        {postInfo.comments.slice(0, 1).map((comment, index) => (
                          <Comment
                            comment={comment}
                            parseDate={parseDate}
                            key={index}
                            postId={postInfo._id}
                            postUser={postInfo.user}
                          />
                        ))}
                        <Transition
                          show={expandComment}
                          className="w-full flex flex-col gap-3"
                          enter="transition-opacity duration-500"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-300"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          {postInfo.comments.length > 1 &&
                            postInfo.comments
                              .slice(1)
                              .map((comment, idx) => (
                                <Comment
                                  comment={comment}
                                  parseDate={parseDate}
                                  key={idx}
                                  postId={post._id}
                                  postUser={post.user}
                                />
                              ))}
                        </Transition>
                        {postInfo.comments.length > 1 && (
                          <button
                            className="w-full flex text-xs items-start gap-0 py-0 px-1 hover:text-blue-500"
                            onClick={() => setExpandComment(!expandComment)}
                          >
                            <span className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                              View {expandComment ? "less" : "more"} comments
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    <EmojiPickerModal
                      showEmoji={showEmoji}
                      setShowEmoji={setShowEmoji}
                      commentRef={commentRef}
                    />
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
