import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  faCircle,
  faEllipsisH,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faCopy,
  faEdit,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { parseDate } from "../../utils/dates";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import { useGeneralContext } from "@/context/generalcontext";
import { usePostContext } from "@/context/postcontext";
import { socket } from "@/utils/socket";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function MiniPost({ post }) {
  const { auth, user } = useAuthContext();
  const { themes, deleteAlert, setDeleteAlert } = useGeneralContext();
  const { removeBookmark } = usePostContext();
  const [readMore, setReadMore] = useState(false);
  const router = useRouter();
  const handleDelete = (id) => {
    toast.promise(removeBookmark({ postId: id }), {
      loading: "Removing post from bookmarks",
      success: "Post removed from bookmarks",
      error: "Failed to remove post from bookmarks",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden h-full px-0 sm:px-1 lg:px-4">
      <div className="bg-white rounded-lg shadow-lg w-full px-2 sm:px-4 py-2">
        <div className=" pb-2 pt-1 w-full flex flex-row justify-between gap-2">
          <div className="w-auto flex flex-row gap-2">
            <div className="flex flex-row items-center gap-2">
              <Image
                src={post.user.avatar}
                alt="avatar"
                width={50}
                height={50}
                className="w-[48px] rounded-full"
              />
            </div>
            <div className="w-[calc(100%-50px)] flex flex-col justify-center">
              <div className="w-full flex flex-row items-center flex-wrap">
                <h1 className="text-xs sm:text-sm font-semibold">
                  {post.user.name}
                </h1>
                <p className="hidden text-xs text-gray-500 sm:flex items-center">
                  &nbsp;
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="h-[5px] text-green-500"
                  />
                  &nbsp;{parseDate(post.createdAt)}
                </p>
              </div>
              <div className="w-full text-xs  line-clamp-1 sm:line-clamp-2">
                {post.user.bio}
              </div>
              <p className="text-xs sm:hidden text-gray-500 flex items-center">
                &nbsp;
                <FontAwesomeIcon
                  icon={faCircle}
                  className="h-[5px] text-green-500"
                />
                &nbsp;{parseDate(post.createdAt)}
              </p>
            </div>
          </div>
          <div className="w-6 flex flex-row items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex w-full justify-center rounded-md px-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300"
                  style={{
                    backgroundColor: themes.body,
                    color: themes.primaryText,
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="h-[20px]" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className=" absolute right-0 z-30 mt-4 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }
                                  flex px-4 py-2 text-sm w-full text-left gap-2 font-semibold
                                `}
                          onClick={() => {
                            //check if post has poll
                            handleDelete(post._id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faBookmark}
                            className="h-[15px]"
                          />
                          UnSave Post
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }
                                  flex px-4 py-2 text-sm w-full text-left gap-2 font-semibold
                                `}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/post/${post._id}`
                            );

                            toast.success("Link copied to clipboard");
                          }}
                        >
                          <FontAwesomeIcon icon={faCopy} className="h-[15px]" />
                          Copy Link
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="w-full relative gap-2 px-2">
          <div
            className={`w-full text-wrap tiptap text-sm ${
              readMore ? "" : "line-clamp-3"
            }`}
            dangerouslySetInnerHTML={{ __html: post.text }}
          ></div>
          <button
            className="text-xs font-semibold text-gray-800"
            onClick={() => setReadMore(!readMore)}
          >
            read {readMore ? "less" : "more"}
          </button>
        </div>
        <div
          className="w-full flex flex-row justify-between gap-2 px-2 cursor-pointer"
          onClick={() => {
            //open post in new tab
            window.open(`/post/${post._id}`, "_blank");
          }}
        >
          {post.images && post.images.length > 0 && (
            <>
              <Image
                src={post.images[0]}
                alt="post image"
                width={100}
                height={100}
                className="h-[100px] min-w-[30%] rounded-lg object-cover"
              />
              {post.images.length > 1 && (
                <>
                  <Image
                    src={post.images[1]}
                    alt="post image"
                    width={100}
                    height={100}
                    className="h-[100px] min-w-[33%] rounded-lg object-cover"
                  />
                  {post.images.length > 2 && (
                    <Image
                      src={post.images[2]}
                      alt="post image"
                      width={100}
                      height={100}
                      className="h-[100px] min-w-[33%] rounded-lg object-cover"
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
