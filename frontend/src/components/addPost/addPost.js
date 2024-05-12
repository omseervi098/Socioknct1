import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useGeneralContext } from "@/context/generalcontext";
import { Menu, Transition } from "@headlessui/react";
import ArticleModal from "../modals/articleModal";
import VideoModal from "../modals/videoModal";
import PollModal from "../modals/pollModal";
import PhotoModal from "../modals/photoModal";
import AudioModal from "../modals/audioModal";
import DocumentModal from "../modals/documentModal";
export default function AddPost() {
  const { themes } = useGeneralContext();
  const { auth, user } = useAuthContext();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [open, setOpen] = useState({
    photo: false,
    video: false,
    document: false,
    poll: false,
    audio: false,
    article: false,
  });
  const handleOpen = (type) => {
    setOpen({ ...open, [type]: !open[type] });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full px-0 sm:px-1 lg:px-4">
        <div className="bg-white rounded-lg shadow-lg w-full">
          <div className="flex w-full p-4 gap-3">
            <div
              className="w-auto p-1 rounded-full"
              style={{ backgroundColor: themes.primaryColor }}
            >
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <button
              className="w-full h-11 p-2 border-2 rounded-full text-left flex-grow hover:bg-blue-100"
              style={{
                borderColor: themes.primaryColor,
              }}
              placeholder="What's on your mind?"
              onClick={() => setOpen({ ...open, article: !open.article })}
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex justify-between px-4 pb-3">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center space-x-2 p-1 hover:ring transition-all rounded-lg text-sm"
                style={{
                  backgroundColor: themes.body,
                  borderColor: themes.primaryText,
                }}
                onClick={() => setOpen({ ...open, photo: !open.photo })}
              >
                <Image
                  src="/icons/photo.png"
                  width={20}
                  height={20}
                  alt="photo-icon"
                />
                <span>Photo</span>
              </button>
              <button
                className="flex items-center space-x-2 p-1 hover:ring transition-all rounded-lg text-sm"
                style={{
                  backgroundColor: themes.body,
                  borderColor: themes.primaryText,
                }}
                onClick={() => setOpen({ ...open, video: !open.video })}
              >
                <Image
                  src="/icons/video.png"
                  width={20}
                  height={20}
                  alt="video-icon"
                />
                <span>Video</span>
              </button>
              <button
                className="flex items-center space-x-2 p-1  rounded-lg text-sm hover:ring transition-all"
                style={{
                  backgroundColor: themes.body,
                  borderColor: themes.primaryText,
                }}
                onClick={() => setOpen({ ...open, document: !open.document })}
              >
                <Image
                  src="/icons/document.png"
                  width={20}
                  height={20}
                  alt="document-icon"
                />
                <span>Document</span>
              </button>
            </div>

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex w-full justify-center rounded-md  p-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300"
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
                <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm w-full text-left gap-2"
                          )}
                          onClick={() => setOpen({ ...open, poll: !open.poll })}
                        >
                          <Image
                            src="/icons/poll.png"
                            width={20}
                            height={20}
                            alt="poll-icon"
                          />
                          Create a Poll
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm w-full text-left gap-2"
                          )}
                          onClick={() =>
                            setOpen({ ...open, audio: !open.audio })
                          }
                        >
                          <Image
                            src="/icons/music.png"
                            width={20}
                            height={20}
                            alt="audio-icon"
                          />
                          Upload a Audio
                        </button>
                      )}
                    </Menu.Item>
                    <hr />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm w-full text-left"
                          )}
                          onClick={() =>
                            setOpen({ ...open, article: !open.article })
                          }
                        >
                          Write an Article
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <ArticleModal open={open.article} handleOpen={handleOpen} />
      <VideoModal open={open.video} handleOpen={handleOpen} />
      <PollModal open={open.poll} handleOpen={handleOpen} />
      <PhotoModal open={open.photo} handleOpen={handleOpen} />
      <AudioModal open={open.audio} handleOpen={handleOpen} />
      <DocumentModal open={open.document} handleOpen={handleOpen} />
    </>
  );
}
