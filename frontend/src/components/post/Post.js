import Image from "next/image";
import { Fragment, createRef, use, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useGeneralContext } from "@/context/generalcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCircle,
  faCopy,
  faDeleteLeft,
  faEdit,
  faEllipsisH,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "react-h5-audio-player";
import PdfReader from "../pdfReader/pdfReader";
import { usePostContext } from "@/context/postcontext";
import ThreeImage from "../image/threeimage";
import PostImageModal from "../modals/postImageModal";
import { useAuthContext } from "@/context/authcontext";
import toast from "react-hot-toast";
import { text } from "@fortawesome/fontawesome-svg-core";
import { socket } from "@/utils/socket";
export default function Post(props) {
  const { post } = props;
  const { themes, touch } = useGeneralContext();
  const [seeMore, setSeeMore] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [visible, setVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { deletePost, votePoll, updatePollPost, unvotePoll } = usePostContext();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [percentage, setPercentage] = useState(
    post.poll
      ? post.poll.options.map((opt, index) => ({
          id: index,
          percentage: getPercentage(opt.votes.length, post.poll.totalVotes),
        }))
      : []
  );
  const [voted, setVoted] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const textRef = useRef(null);
  const handleOpen = (type) => {
    setOpen(!open);
  };
  const handleDeletePost = (postId) => {
    console.log("Delete Post", postId);
    toast.promise(deletePost(postId), {
      loading: "Deleting Post...",
      success: "Post Deleted Successfully",
      error: "Error Deleting Post",
    });
  };

  useEffect(() => {
    socket.on("poll", (data) => {
      updatePollPost(data);
    });
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
    if (textRef.current) {
      textRef.current.clientHeight >= 75
        ? setShowSeeMore(true)
        : setShowSeeMore(false);
    }
    return () => {
      if (videoElement) {
        observer1.unobserve(videoElement);
      }
      if (audioElement) {
        observer2.unobserve(audioElement);
      }
      socket.off("poll");
    };
  }, []);

  useEffect(() => {
    if (post.poll) {
      post.poll.options.forEach((option, index) => {
        const newPercentage = getPercentage(
          option.votes.length,
          post.poll.totalVotes
        );
        document.getElementById(`poll-${post._id}-${index}-bar`).style.width =
          newPercentage + "%";
      });

      const votedornot = post.poll.options.some((option) =>
        option.votes.includes(user._id)
      );
      setVoted(votedornot);
    }
    if (textRef.current) {
      textRef.current.clientHeight >= 70
        ? setShowSeeMore(true)
        : setShowSeeMore(false);
    }
  }, [post, percentage]);

  function getPercentage(votes, totalVotes) {
    return Math.round((votes / totalVotes) * 100);
  }
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
  if (!post.user) return null;
  const handleVote = ({ postId, optionId }) => {
    console.log("Voting", postId, optionId);
    toast
      .promise(votePoll({ postId, optionId }), {
        loading: "Voting...",
        success: "Voted Successfully",
        error: "Error Voting",
      })
      .then(() => {
        setVoted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnvote = () => {
    console.log("Unvoting");
    toast
      .promise(unvotePoll({ postId: post._id }), {
        loading: "Unvoting...",
        success: "Unvoted Successfully",
        error: "Error Unvoting",
      })
      .then(() => {
        setVoted(false);
      })
      .catch((err) => {
        console.log(err);
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
                <Menu.Items className="absolute right-0 z-50 mt-4 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {user._id === post.user._id ? (
                      <>
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
                                setOpen({ ...open, poll: !open.poll })
                              }
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="h-[15px]"
                              />
                              Edit Post
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
                              onClick={() => handleDeletePost(post._id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="h-[15px]"
                              />
                              Delete Post
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <>
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
                              <FontAwesomeIcon
                                icon={faCopy}
                                className="h-[15px]"
                              />
                              Copy Link
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
                              <FontAwesomeIcon
                                icon={faBan}
                                className="h-[15px]"
                              />
                              Not Interested
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
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
                          <FontAwesomeIcon
                            icon={faShare}
                            className="h-[15px]"
                          />
                          &nbsp; Share Via
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div
          className={`relative w-full text-xs sm:text-sm flex items-center pt-2  px-2  ${
            showSeeMore ? "pb-2" : "pb-0"
          } `}
        >
          <div
            ref={textRef}
            id={`post-${post._id}-text`}
            dangerouslySetInnerHTML={{ __html: post.text }}
            className={`tiptap transition-all w-full ease-in-out duration-300 block
                        ${
                          seeMore
                            ? "block"
                            : "max-h-[80px] overflow-hidden mb-2 "
                        }`}
          ></div>
          {showSeeMore && (
            <div
              className=" absolute  bottom-0 right-0 text-blue-500 cursor-pointer hover:underline h-3"
              onClick={() => {
                setSeeMore(!seeMore);
              }}
            >
              {seeMore ? "See Less" : "..See More"}
            </div>
          )}
        </div>
        {post.images && post.images.length > 0 && (
          <>
            <div className="my-2 flex   bg-gray-300 rounded-lg justify-center items-center w-full h-full ">
              {post.images.length === 1 && (
                <div className="grid w-full max-h-[450px] min-h-[250px]">
                  <button className="h-full" onClick={handleOpen}>
                    <div className="relative h-full">
                      <Image
                        src={post.images[0]}
                        alt="post-image"
                        width={500}
                        height={500}
                        className="w-full h-full rounded-xl object-cover filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
                      />
                    </div>
                  </button>
                </div>
              )}
              {post.images.length === 2 && (
                <>
                  <div className="grid grid-cols-2 max-h-[450px] w-full min-h-[250px]">
                    <button className="h-full" onClick={handleOpen}>
                      <div className="relative h-full">
                        <Image
                          src={post.images[0]}
                          width={500}
                          alt="post-image"
                          height={500}
                          className="rounded-l-lg object-cover aspect-w-1 aspect-h-1 h-full filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
                        />
                      </div>
                    </button>
                    <button className="h-full" onClick={handleOpen}>
                      <div className="relative h-full">
                        <Image
                          src={post.images[1]}
                          width={500}
                          alt="post-image"
                          height={500}
                          className="rounded-r-lg object-cover aspect-w-1 aspect-h-1 h-full filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
              {post.images.length > 2 && (
                <ThreeImage images={post.images} handleOpen={handleOpen} />
              )}
            </div>
            <PostImageModal
              open={open}
              handleOpen={handleOpen}
              postInfo={post}
            />
          </>
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
          <div className="flex flex-col gap-2 border border-blue-500 shadow-lg rounded-lg p-2">
            <div className="w-full font-semibold">{post.poll.question}</div>
            {post.poll.options.map((option, index) => (
              <div
                key={index}
                className={`relative w-full h-full flex flex-row items-center gap-2 p-2 rounded-lg bg-gray-200 ${
                  option.votes.includes(user._id)
                    ? "border-2 border-blue-500"
                    : ""
                }`}
              >
                <div
                  id={`poll-${post._id}-${index}-bar`}
                  className={`absolute w-[${
                    percentage[index] ? percentage[index] : 0
                  }%] h-full bg-blue-400 opacity-50 z-0 left-0 top-0 rounded-lg  ${
                    voted == false ? "invisible" : "visible"
                  } transition-all duration-500 ease-in-out `}
                ></div>
                <div
                  className={`absolute bg-opacity-50 h-full right-1 top-0 z-10 flex items-center  ${
                    voted == false ? "invisible" : "visible"
                  } transition-all duration-500 ease-in-out text-blue-400`}
                >
                  {getPercentage(option.votes.length, post.poll.totalVotes)}%
                </div>
                <div className="w-full h-full rounded-full flex items-center gap-1 left-0 top-0 z-10">
                  <div className="w-6 h-6 rounded-full">
                    <input
                      type="radio"
                      className="w-full h-full cursor-pointer"
                      name={`poll-${post._id}`}
                      onChange={() => {
                        handleVote({ postId: post._id, optionId: option._id });
                      }}
                      checked={option.votes.includes(user._id) ? true : false}
                      disabled={voted}
                    />
                  </div>
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-full text-sm">{option.text}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex flex-row items-center justify-start gap-2">
              <div className="text-xs text-gray-500">
                {post.poll.totalVotes} votes
              </div>
              <button
                className="text-xs text-blue-500 hover:underline cursor-pointer"
                onClick={handleUnvote}
              >
                Unvote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
