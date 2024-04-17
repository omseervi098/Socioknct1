import Image from "next/image";
import { Fragment, createRef, use, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useGeneralContext } from "@/context/generalcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import PdfReader from "../pdfReader/pdfReader";
import { usePostContext } from "@/context/postcontext";

export default function Post(props) {
  const { post } = props;
  const { themes, touch } = useGeneralContext();
  const [seeMore, setSeeMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    const audioElement = audioRef.current;
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px",
        threshold: 0.5,
      }
    );
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        setAudioVisible(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px",
        threshold: 0.5,
      }
    );

    if (videoElement) {
      observer1.observe(videoElement);
    }
    if (audioElement) {
      observer2.observe(audioElement);
    }
    return () => {
      if (videoElement) {
        observer1.unobserve(videoElement);
      }
      if (audioElement) {
        observer2.unobserve(audioElement);
      }
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      if (!visible) {
        videoRef.current.pause();
      } else {
        // if playable then play
        if (videoRef.current.readyState === 4) videoRef.current.play();
      }
    }
  }, [visible]);
  useEffect(() => {
    if (!audioVisible) {
      const audios = document.querySelectorAll("audio");
      audios.forEach((audio) => {
        //if audio is playing then pause it
        if (audio && !audio.paused) {
          audio.pause();
        }
      });
    }
  }, [audioVisible]);
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
                className="w-[50px] rounded-full"
              />
            </div>
            <div className="w-auto flex flex-col justify-center">
              <div className="w-full flex flex-row items-center flex-wrap">
                <h1 className="text-xs sm:text-sm font-semibold">
                  {post.user.name}
                </h1>
                <p className="text-xs text-gray-500 flex items-center">
                  &nbsp;
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="h-[5px] text-green-500"
                  />
                  &nbsp;10 days
                </p>
              </div>
              <div className="w-full text-xs flex flex-row items-center overflow-hidden ">
                {post.user.bio}
              </div>
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
                <Menu.Items className="absolute right-0 z-50 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        <div className="relative w-full text-xs sm:text-sm flex items-center pt-2 pb-4 px-2  ">
          <div
            dangerouslySetInnerHTML={{ __html: post.text }}
            className={` transition-all w-full ease-in-out duration-300
                        ${seeMore ? "block" : "max-h-[80px] overflow-hidden"}`}
          ></div>
          {post.text.length > 200 && (
            <div
              className=" absolute  bottom-0 right-0 text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setSeeMore(!seeMore);
              }}
            >
              {seeMore ? "See Less" : "..See More"}
            </div>
          )}
        </div>
        {post.images && post.images.length > 0 && (
          <div className="my-2 flex   bg-gray-300 rounded-lg justify-center items-center w-full h-full ">
            {post.images.length === 1 && (
              <div className="w-full h-full">
                <Image
                  src={post.images[0]}
                  alt="post-image"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-xl"
                />
              </div>
            )}
            {post.images.length === 2 && (
              <>
                <div className="w-1/2 h-full">
                  <Image
                    src={post.images[0]}
                    alt="post-image"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-1/2 h-full">
                  <Image
                    src={post.images[1]}
                    alt="post-image"
                    width={500}
                    height={500}
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </>
            )}
            {post.images.length > 2 && (
              <>
                <div className="w-2/3 ">
                  <Image
                    src={post.images[0]}
                    alt="post-image"
                    width={500}
                    height={300}
                    className="h-[300px] object-contain rounded-xl bg-opacity-50 bg-contain bg-center backdrop-opacity-50"
                  />
                </div>
                <div className="w-1/3 h-full flex flex-col ">
                  <Image
                    src={post.images[1]}
                    alt="post-image"
                    width={500}
                    height={500}
                    className="w-full h-1/2 "
                  />
                  <Image
                    src={post.images[2]}
                    alt="post-image"
                    width={500}
                    height={500}
                    className="w-full h-1/2"
                  />
                </div>
              </>
            )}
          </div>
        )}
        {post.video && (
          <div className="my-2 flex flex gap-2 justify-center items-center w-full rounded-xl overflow-hidden ">
            <video
              muted={true}
              controls
              ref={videoRef}
              autoPlay={true}
              className="w-full h-full"
              src={post.video}
              disablePictureInPicture={true}
              controlsList="nodownload"
              playsInline={true}
              disableRemotePlayback={true}
            ></video>
          </div>
        )}
        {post.audio && (
          <div
            ref={audioRef}
            className="my-2 flex flex-row items-center justify-center gap-2 sm:px-2"
          >
            <AudioPlayer
              src={post.audio}
              // other props here
              // ref={audioRef}
              autoPlayAfterSrcChange={false}
              autoPlay={false}
              showJumpControls={false}
              className="rounded-xl "
              loop={false}
              preload="auto"
            />
          </div>
        )}
        {post.document && (
          <div className="my-2 flex flex-row items-center justify-center gap-2 sm:px-2 ">
            <PdfReader
              file={post.document.url}
              info={{ name: post.document.name, size: post.document.size }}
              height={300}
            />
          </div>
        )}
        {post.poll && (
          <div className="my-2 flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{post.poll.question}</h1>
            <div className="flex flex-col gap-1">
              {post.poll.options.map((option, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center w-full"
                  >
                    <p>{option.text}</p>
                    <p>{option.votes}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
