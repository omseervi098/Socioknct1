import InfoCard from "@/components/infoCard/infoCard";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  faEllipsisH,
  faEllipsisV,
  faMapMarkerAlt,
  faMessage,
  faPencil,
  faUserFriends,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { usePostContext } from "../../context/postcontext";

import { socket } from "@/utils/socket";
import Post from "@/components/post/Post";
import MiniPost from "@/components/post/MiniPost";
import DeleteAlert from "@/components/modals/deleteAlert";
import { useGeneralContext } from "@/context/generalcontext";
import PostSkeleton from "@/components/post/PostSkeleton";
import { set } from "lodash";
import { edit } from "@cloudinary/url-gen/actions/animated";
import EditAvatarModal from "@/components/editModal/editAvatarModal";
import EditBackgroundModal from "@/components/editModal/editBackgroundModal";
import EditUserInfoModal from "@/components/editModal/editUserInfoModal";
export default function Profile() {
  const { user, auth } = useAuthContext();
  const { deleteAlert, setDeleteAlert } = useGeneralContext();
  const {
    posts,
    getAllCommentedPostsOfUser,
    getAllLikedPostsOfUser,
    getAllPostsOfUser,
    setPosts,
    toggleLikeClient,
    addCommentClient,
    editCommentClient,
    deleteCommentClient,
    addReplyClient,
    editReplyClient,
    deleteReplyClient,
  } = usePostContext();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [media, setMedia] = useState([]);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [error, setError] = useState(null);
  const { username, tab } = router.query;
  const [openModals, setOpenModals] = useState({
    avatar: false,
    background: false,
    info: false,
    about: false,
  });
  const handleOpen = (name) => {
    setOpenModals((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };
  useEffect(() => {
    //check if user is authenticated
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    }

    const username = router.query.username
      ? router.query.username
      : JSON.parse(user)?.username;
    console.log(username);

    //fetch the user
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserDetails(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
    //fetch all media of user
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${username}/media`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMedia(response.data.media);
      })
      .catch((error) => {
        console.log(error);
      });
    if (router.query.tab === "Comments") {
      getAllCommentedPostsOfUser(username).then((response) => {
        setLoadSkeleton(false);
      });
    } else if (router.query.tab === "Liked") {
      getAllLikedPostsOfUser(username).then((response) => {
        setLoadSkeleton(false);
      });
    } else {
      getAllPostsOfUser(username).then((response) => {
        setLoadSkeleton(false);
      });
    }

    return () => {
      setPosts([]);
    };
  }, [user]);
  useEffect(() => {
    socket.on("user:liked", (data) => {
      //dont update for useriteself
      // if (data.liked.user._id === user._id || data.liked.user === user._id)
      //   return;
      toggleLikeClient(data);
    });
    socket.on("user:comment", (data) => {
      const { comment, type } = data;
      console.log(comment, type);
      if (type === "new") {
        addCommentClient(comment);
      } else if (type === "edit") {
        editCommentClient(comment);
      } else if (type === "delete") {
        deleteCommentClient(comment);
      }
    });
    socket.on("user:reply", (data) => {
      const { reply, type } = data;
      console.log(reply, type);
      if (type === "new") {
        addReplyClient(reply);
      } else if (type === "edit") {
        editReplyClient(reply);
      } else if (type === "delete") {
        deleteReplyClient(reply);
      }
    });
    return () => {
      socket.off("user:liked");
      socket.off("user:comment");
      socket.off("user:reply");
    };
  }, [posts]);
  const handleAllPosts = (name) => {
    console.log(name);
    const username = router.query.username
      ? router.query.username
      : JSON.parse(localStorage.getItem("user")).username;
    if (name === "Posts") {
      getAllPostsOfUser(username);
    } else if (name === "Comments") {
      getAllCommentedPostsOfUser(username);
    } else {
      getAllLikedPostsOfUser(username);
    }
    setTimeout(() => {
      setLoadSkeleton(false);
    }, 1000);
  };

  if (error) {
    return (
      <div className="text-red-500 flex justify-center w-full h-full">
        {error}
      </div>
    );
  }
  //if user is not found
  if (!user) {
    return <div></div>;
  }
  // if there isusername in the url then show the user profile

  return (
    <div className="flex flex-row justify-between items-start w-full h-full md:space-x-4 mt-0 md:mt-5 md:px-10 xl:px-16">
      <div className="hidden md:block w-1/3 lg:w-1/4 xl:w-1/5">
        <InfoCard />
      </div>
      <div className="sm:px-2 w-full max-w-[850px]">
        <div className="flex flex-col items-center justify-center  h-full">
          {/* 1st Component about Individual */}
          <div className="flex bg-white rounded-lg flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center w-full ">
              <div className="relative w-full">
                <Image
                  src={
                    username && user.username !== username
                      ? userDetails?.background
                      : user?.background
                  }
                  alt="Background"
                  width={800}
                  height={300}
                  className="rounded-lg w-full"
                />
                {username && user.username !== username ? null : (
                  <div className="absolute top-0 right-14  rounded-lg">
                    <button
                      className="bg-white hover:bg-gray-300 text-gray-800 font-bold p-2 md:p-3 rounded-full flex items-center justify-center absolute top-2 left-2"
                      onClick={() => handleOpen("background")}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </div>
                )}
                <div className="absolute bottom-0 left-5 md:w-full  transform translate-y-1/2 flex gap-3 items-end">
                  <Image
                    src={
                      username && user.username !== username
                        ? userDetails?.avatar
                        : user?.avatar
                    }
                    alt="Avatar"
                    onClick={() => handleOpen("avatar")}
                    width={100}
                    height={100}
                    className="rounded-full w-30 sm:w-36 md:w-36 lg:w-40 xl:w-[20%] border-4 border-white cursor-pointer"
                  />
                </div>
                {username && user.username !== username ? null : (
                  <div className="absolute bottom-0 right-14 rounded-lg">
                    <button
                      className="bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 md:p-3 rounded-full flex items-center justify-center absolute top-2 left-2"
                      onClick={() => handleOpen("info")}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col  w-full h-full p-4 pb-2 px-6 mt-3 sm:mt-10 md:mt-10 lg:mt-11">
                <div
                  className="text-lg md:text-2xl font-semibold text-gray-800 mt-6"
                  style={{ lineHeight: 1 }}
                >
                  {username && user.username !== username
                    ? userDetails?.name
                    : user?.name}

                  <span className="text-gray-500 text-xs md:text-sm ">
                    (@
                    {username && user.username !== username
                      ? userDetails?.username
                      : user?.username}
                    )
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-0">
                  {username && user.username !== username
                    ? userDetails?.bio
                    : user?.bio}{" "}
                </p>
                <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  {user.location
                    ? user.location.name +
                      " , " +
                      user.location.state +
                      " , " +
                      user.location.country
                    : "Nothing"}
                </p>{" "}
                <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-1">
                  <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                  50+ connections
                </p>
              </div>
              <div className="flex text-xs md:text-sm flex-row items-center justify-start w-full h-full gap-2 px-6 pb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col sm:flex-row items-center justify-center flex-wrap sm:gap-2">
                  <FontAwesomeIcon icon={faUserPlus} />
                  Connect
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col sm:flex-row items-center justify-center flex-wrap sm:gap-2">
                  <FontAwesomeIcon icon={faMessage} />
                  Message
                </button>
                <button className="rounded-full hover:bg-gray-300 p-1 font-bold border border-gray-800 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEllipsisH} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          {/*2nd Component About  */}
          <div className="flex flex-col items-center justify-center w-full mt-2">
            <div className="flex flex-col items-center justify-center bg-white w-full rounded-lg">
              <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
                <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                  About
                </h1>
                <button className="rounded-full hover:bg-gray-300 p-1 font-bold border border-gray-800 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEllipsisV} className="h-5 w-5" />
                </button>
              </div>
              <div className="text-xs md:text-sm flex flex-col items-start justify-start w-full p-4 pt-0">
                <p>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  a lorem nec nunc ultricies ultricies. Donec auctor, nunc nec
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd Component  */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg mt-2">
          <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
            <h1 className="text-lg md:text-xl font-semibold w-full text-gray-800">
              Media
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start w-full p-4 px-6 pt-0 ">
            <div className="max-w-[90vw] md:max-w-auto flex w-full gap-1  flex-nowrap py-2 overflow-x-auto">
              {media.images ? (
                <>
                  {media.images?.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt="Image"
                      width={250}
                      height={250}
                      objectFit="cover"
                      objectPosition="center"
                      className="w-[250px] h-[160px] md:h-[220px] rounded-lg object-cover"
                    />
                  ))}
                  {media.videos?.map((video, index) => (
                    <video
                      key={index}
                      src={video}
                      controls
                      className="w-[250px] h-[160px] md:h-[220px] rounded-lg object-cover"
                    />
                  ))}
                </>
              ) : (
                [...Array(5)].map((_, index) => (
                  <Image
                    alt="Image"
                    width={250}
                    key={index}
                    src="https://via.placeholder.com/250"
                    height={250}
                    objectFit="cover"
                    objectPosition="center"
                    className="w-[250px] h-[160px] md:h-[220px] rounded-lg object-cover bg-slate-300 animate-pulse"
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {/* Last Component Activity */}
        <div className="flex flex-col items-center justify-center w-full mt-2">
          <div className="flex flex-col items-center justify-center bg-white w-full rounded-lg pb-4">
            <div className="flex flex-row items-center justify-between w-full p-2 sm:p-4 pb-2">
              <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                Activity
              </h1>
              <button className="rounded-full hover:bg-gray-300 p-1 font-bold border border-gray-800 flex items-center justify-center">
                <FontAwesomeIcon icon={faEllipsisV} className="h-5 w-5" />
              </button>
            </div>
            {/* tabs */}{" "}
            <Tab.Group
              as="div"
              className="w-full px-1 md:px-4"
              defaultIndex={
                router.query.tab === "Comments"
                  ? 1
                  : router.query.tab === "Liked"
                  ? 2
                  : 0
              }
            >
              <Tab.List className="flex gap-2">
                {[
                  { name: "Posts" },
                  { name: "Comments" },
                  { name: "Liked" },
                ].map(({ name }) => (
                  <Tab
                    key={name}
                    as={Fragment}
                    //select the tab

                    className="rounded-full px-2 py-1 border border-gray-400 text-sm font-semibold focus:outline-none data-[selected]:bg-blue-400 data-[hover]:bg-blue-400 data-[selected]:data-[hover]:bg-blue-400 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    {({ hover, selected }) => (
                      <button
                        className={`${
                          selected
                            ? "bg-blue-600 text-white border border-blue-500"
                            : "text-gray-600  border border-gray-700"
                        } rounded-full px-2 py-1 text-sm font-semibold focus:outline-none hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all duration-300 ease-in-out`}
                        onClick={() => {
                          setLoadSkeleton(true);
                          handleAllPosts(name);
                          //not scrolling to top
                          router.push(
                            {
                              query: {
                                username: router.query.username
                                  ? router.query.username
                                  : JSON.parse(localStorage.getItem("user"))
                                      .username,
                                tab: name,
                              },
                            },
                            undefined,
                            {
                              scroll: false,
                            }
                          );
                        }}
                      >
                        {name}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel
                  key="Posts"
                  className="rounded-lg py-3 lg:p-3 flex flex-col gap-3 bg-gray-100"
                >
                  {loadSkeleton ? (
                    <div className="mx-auto w-full lg:w-[90%]">
                      <PostSkeleton />
                    </div>
                  ) : posts && posts.length === 0 ? (
                    <div className="text-gray-500 text-center">
                      No posts found
                    </div>
                  ) : (
                    posts.map((post, idx) => (
                      <div className="mx-auto w-full lg:w-[90%]" key={idx}>
                        <Post post={post} />
                      </div>
                    ))
                  )}
                </Tab.Panel>
                <Tab.Panel
                  key="Comments"
                  className="rounded-lg py-3 lg:p-3 flex flex-col gap-3 bg-gray-100"
                >
                  {loadSkeleton ? (
                    <div className="mx-auto w-full lg:w-[90%]">
                      <PostSkeleton />
                    </div>
                  ) : posts && posts.length === 0 ? (
                    <div className="text-gray-500 text-center">
                      No comments found
                    </div>
                  ) : (
                    posts.map((post, idx) => (
                      <div className="mx-auto w-full lg:w-[90%]" key={idx}>
                        <Post post={post} />
                      </div>
                    ))
                  )}
                </Tab.Panel>
                <Tab.Panel
                  key="Liked"
                  className="rounded-lg py-3 lg:p-3 flex flex-col gap-3 bg-gray-100"
                >
                  {loadSkeleton ? (
                    <div className="mx-auto w-full lg:w-[90%]">
                      <PostSkeleton />
                    </div>
                  ) : posts && posts.length === 0 ? (
                    <div className="text-gray-500 text-center">
                      No liked posts found
                    </div>
                  ) : (
                    posts.map((post, idx) => (
                      <div className="mx-auto lg:w-[90%]" key={idx}>
                        <MiniPost post={post} />
                      </div>
                    ))
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
      <DeleteAlert
        text={deleteAlert.text}
        id={deleteAlert.id}
        open={deleteAlert.open}
        setOpen={setDeleteAlert}
        handleDelete={deleteAlert.handleDelete}
      />
      <EditAvatarModal
        open={openModals.avatar}
        handleOpen={handleOpen}
        avatar={user.avatar}
      />
      <EditBackgroundModal
        open={openModals.background}
        handleOpen={handleOpen}
        background={user.background}
      />
      <EditUserInfoModal open={openModals.info} handleOpen={handleOpen} />
    </div>
  );
}
