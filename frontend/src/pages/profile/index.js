import InfoCard from "@/components/infoCard/infoCard";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import InfoCard1 from "@/components/infoCard/infoCard1";
import ThreeImage from "@/components/image/threeimage";
import { Carousel } from "react-responsive-carousel";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function Profile() {
  const { user, auth } = useAuthContext();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [media, setMedia] = useState([]);
  const { username } = router.query;

  useEffect(() => {
    //check if user is authenticated
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    }
    const username = router.query.username
      ? router.query.username
      : JSON.parse(user).username;
    if (username) {
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
    }
  }, [user]);
  if (!auth) {
    return <div>Loading...</div>;
  }
  //if user is not found
  if (!user) {
    return <div>User not found</div>;
  }
  // if there isusername in the url then show the user profile
  if (username && user.username !== username) {
    return (
      <div className="flex flex-row justify-center items-start w-full h-full md:space-x-4 mt-5 md:px-10 xl:px-16">
        <div className="hidden md:block w-1/3 lg:w-1/4 xl:w-1/5">
          <InfoCard />
        </div>
        <div className="px-2 max-w-[800px]">
          <div className="flex flex-col items-center justify-center  h-full">
            {/* 1st Component about Individual */}
            <div className="flex bg-white rounded-lg flex-col items-center justify-center ">
              <div className="flex flex-col items-center justify-center w-full ">
                <div className="relative">
                  <Image
                    src={userDetails?.background}
                    alt="Background"
                    width={800}
                    height={300}
                    className="rounded-lg"
                  />

                  <div className="absolute bottom-0 md:w-full left-5 transform translate-y-1/2 flex gap-3 items-end">
                    <Image
                      src={userDetails?.avatar}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="rounded-full w-30 sm:w-36 md:w-36 lg:w-40 xl:w-[20%] border-4 border-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col  w-full h-full p-4 pb-2 px-6 mt-3 sm:mt-10 md:mt-10 lg:mt-11">
                  <h1 className="text-lg md:text-2xl font-semibold text-gray-800 mt-5">
                    {userDetails?.name}
                  </h1>
                  <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-0">
                    {userDetails?.bio} | {userDetails?.bio}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                    Thane, Maharashtra, India
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
                  <button className="rounded-full hover:bg-gray-300  font-bold border-2 border-gray-800 flex items-center justify-center">
                    <FontAwesomeIcon icon={faEllipsisH} className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            {/*2nd Component About  */}
            <div className="flex flex-col items-center justify-center max-w-[800px] mt-5">
              <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
                  <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                    About
                  </h1>
                  <button className="rounded-full hover:bg-gray-300  font-bold border border-gray-800 flex items-center justify-center">
                    <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-col items-start justify-start w-full p-4 pt-0">
                  <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec a lorem nec nunc ultricies ultricies. Donec auctor,
                    nunc nec
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* 3rd Component  */}
          <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg mt-5">
            <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
              <h1 className="text-lg md:text-2xl font-semibold w-full text-gray-800">
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
          {/* 3rd Component Activity */}
          <div className="flex flex-col items-center justify-center max-w-[800px] mt-5">
            <div className="flex flex-col items-center justify-center bg-white w-full rounded-lg">
              <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
                <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                  Activity
                </h1>
                <button className="rounded-full hover:bg-gray-300  font-bold border border-gray-800 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col items-start justify-start w-full p-4 pt-0">
                {/* Liked Post Short Summary +  */}
                <div className="flex text-sm flex-row items-start justify-start w-full  pt-0 gap-2">
                  <button className="text-white rounded-full hover:bg-blue-600 px-2 bg-blue-500 ">
                    Post
                  </button>
                  <button className="text-white rounded-full hover:bg-blue-600 px-2  border bg-blue-500 ">
                    Comments
                  </button>
                  <button className="text-white rounded-full hover:bg-blue-600 px-2  border bg-blue-500 ">
                    Likes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center items-start w-full h-full md:space-x-4 mt-5 md:px-10 xl:px-16">
      <div className="hidden md:block w-1/3 lg:w-1/4 xl:w-1/5">
        <InfoCard />
      </div>
      <div className="px-2 max-w-[800px]">
        <div className="flex flex-col items-center justify-center  h-full">
          {/* 1st Component about Individual */}
          <div className="flex bg-white rounded-lg flex-col items-center justify-center ">
            <div className="flex flex-col items-center justify-center w-full ">
              <div className="relative">
                <Image
                  src={user?.background}
                  alt="Background"
                  width={800}
                  height={300}
                  className="rounded-lg"
                />
                <div className="absolute top-0 right-14  rounded-lg">
                  <button className="bg-white hover:bg-gray-300 text-gray-800 font-bold p-2 md:p-3 rounded-full flex items-center justify-center absolute top-2 left-2">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-5 w-full  transform translate-y-1/2 flex gap-3 items-end">
                  <Image
                    src={user?.avatar}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="rounded-full w-30 sm:w-36 md:w-36 lg:w-40 xl:w-[20%] border-4 border-white"
                  />
                </div>
                <div className="absolute bottom-0 right-14 rounded-lg">
                  <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold p-2 md:p-3 rounded-full flex items-center justify-center absolute top-2 left-2">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col  w-full h-full p-4 pb-2 px-6 mt-3 sm:mt-10 md:mt-10 lg:mt-11">
                <h1 className="text-lg md:text-2xl font-semibold text-gray-800 mt-5">
                  {user?.name}
                </h1>
                <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-0">
                  {user?.bio} | {user?.bio}
                </p>
                <p className="text-xs md:text-sm font-semibold text-gray-600 m-0 p-0 mt-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Thane, Maharashtra, India
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
                <button className="rounded-full hover:bg-gray-300  font-bold border-2 border-gray-800 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEllipsisH} className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          {/*2nd Component About  */}
          <div className="flex flex-col items-center justify-center max-w-[800px] mt-5">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg">
              <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
                <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                  About
                </h1>
                <button className="rounded-full hover:bg-gray-300  font-bold border border-gray-800 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-col items-start justify-start w-full p-4 pt-0">
                <p>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  a lorem nec nunc ultricies ultricies. Donec auctor, nunc nec
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 3rd Component  */}
        <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg mt-5">
          <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
            <h1 className="text-lg md:text-2xl font-semibold w-full text-gray-800">
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
        <div className="flex flex-col items-center justify-center max-w-[800px] mt-5">
          <div className="flex flex-col items-center justify-center bg-white w-full rounded-lg">
            <div className="flex flex-row items-center justify-between w-full p-4 pb-2">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
                Activity
              </h1>
              <button className="rounded-full hover:bg-gray-300  font-bold border border-gray-800 flex items-center justify-center">
                <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-start justify-start w-full p-4 pt-0">
              {/* Liked Post Short Summary +  */}
              <div className="flex text-sm flex-row items-start justify-start w-full  pt-0 gap-2">
                <button className="text-white rounded-full hover:bg-blue-600 px-2 bg-blue-500 ">
                  Post
                </button>
                <button className="text-white rounded-full hover:bg-blue-600 px-2  border bg-blue-500 ">
                  Comments
                </button>
                <button className="text-white rounded-full hover:bg-blue-600 px-2  border bg-blue-500 ">
                  Likes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
