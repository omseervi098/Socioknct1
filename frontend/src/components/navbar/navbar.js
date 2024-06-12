"use client";
import React from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition, Dialog } from "@headlessui/react";
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faBookmark,
  faChevronDown,
  faGear,
  faHome,
  faMessage,
  faPlusCircle,
  faRightToBracket,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "flowbite-react";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { useAuthContext } from "@/context/authcontext";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { googleLogout } from "@react-oauth/google";
import PhotoModal from "../modals/photoModal";
import ArticleModal from "../modals/articleModal";
import VideoModal from "../modals/videoModal";
import DocumentModal from "../modals/documentModal";
import PollModal from "../modals/pollModal";
import AudioModal from "../modals/audioModal";

export default function Navbar() {
  const { theme, themes, toggleTheme, openDrawer, toggleDrawer } =
    useGeneralContext();
  const { auth, user, logout } = useAuthContext();
  const [openDialog, setOpenDialog] = React.useState(false);

  const router = useRouter();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [open, setOpen] = React.useState({
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
    <div
      className={`h-auto  flex justify-between items-center text-black shadow-sm ${styles.navbar}  md:px-5`}
    >
      <div
        className={`hidden md:block flex items-center text-xl ${styles.logo} mr-5`}
      >
        <Link href="/" className="flex items-center">
          <Image src="/favicon.ico" alt="logo" width={30} height={30} />
          &nbsp;Socioknct
        </Link>
      </div>
      {auth && (
        <div className="flex-grow hidden md:flex justify-center items-center md:justify-start">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-200 h-[35px] text-sm px-2 py-1 w-[220px] lg:w-[300px] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          />
        </div>
      )}
      <div className="w-full md:w-auto flex  justify-evenly md:justify-end">
        {auth === false ? (
          <>
            <Link
              href="/login"
              className="flex-grow flex justify-center md:flex-grow-0 "
            >
              <button
                className={`p-2 w-full ${
                  router.pathname === "/login"
                    ? "border-t-4 md:border-t-0 border-b-0 md:border-b-4"
                    : ""
                } px-4`}
                style={
                  router.pathname === "/login"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faRightToBracket} className="h-[20px]" />{" "}
                <div className="text-sm">Login</div>
              </button>
            </Link>
            <Link
              href="/signup"
              className="flex-grow flex justify-center md:flex-grow-0"
            >
              <button
                className={`p-2 w-full ${
                  router.pathname === "/signup"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/signup"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faUserPlus} className="h-[20px]" />{" "}
                <div className="text-sm">Join Now</div>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/feed"
              className="flex-grow flex justify-center md:flex-grow-0 w-1/5  md:min-w-[80px] md:max-w-[100px] md:w-auto"
            >
              <button
                className={`pt-2 pb-1 md:p-2 w-full  ${
                  router.pathname === "/feed"
                    ? "border-t-4 md:border-t-0 md:border-b-4 "
                    : ""
                } `}
                style={
                  router.pathname === "/feed"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faHome} className="h-[20px]" />{" "}
                <div className="text-xs">Home</div>
              </button>
            </Link>
            <Link
              href="/chat"
              className="flex-grow flex justify-center md:flex-grow-0 w-1/5  md:min-w-[80px] md:max-w-[100px] md:w-auto"
            >
              <button
                className={`pt-2 pb-1 md:p-2 w-full  ${
                  router.pathname === "/chat"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/chat"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faRocketchat} className="h-[20px]" />{" "}
                <div className="text-xs">Chat</div>
                {/* <div>Profile</div> */}
              </button>
            </Link>
            <div className="md:hidden flex-grow flex justify-center md:flex-grow-0 w-1/5  md:min-w-[80px] md:max-w-[100px] md:w-auto">
              <button
                className="pt-2 pb-1 text-white w-full hover:bg-gray-100 hover:bg-opacity-25 "
                onClick={() => toggleDrawer()}
              >
                <FontAwesomeIcon icon={faPlusCircle} className="h-[20px]" />
                <div className="text-xs">Post</div>
              </button>
            </div>
            <Drawer
              open={openDrawer}
              onClose={() => toggleDrawer()}
              position="bottom"
              className="p-0"
            >
              <Drawer.Header
                title="Add Post"
                onClick={() => toggleDrawer()}
                className="cursor-pointer px-4 pt-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              />
              <Drawer.Items className="p-3 px-5">
                <div className="grid grid-cols-3 gap-4 p-2 lg:grid-cols-4">
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setOpen({ ...open, photo: !open.photo })}
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/photo.png"
                        width={20}
                        height={20}
                        alt="photo-icon"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Photo
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 px-2 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() =>
                      setOpen({ ...open, document: !open.document })
                    }
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/document.png"
                        width={20}
                        height={20}
                        alt="document-icon"
                      />
                    </div>
                    <div className="text-center  text-gray-500 dark:text-gray-400 text-sm">
                      Document
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 lg:block dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setOpen({ ...open, video: !open.video })}
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/video.png"
                        width={20}
                        height={20}
                        alt="video-icon"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Video
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setOpen({ ...open, poll: !open.poll })}
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/poll.png"
                        width={20}
                        height={20}
                        alt="poll-icon"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Poll
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setOpen({ ...open, audio: !open.audio })}
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/music.png"
                        width={20}
                        height={20}
                        alt="audio-icon"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Audio
                    </div>
                  </div>
                  <div
                    className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => setOpen({ ...open, article: !open.article })}
                  >
                    <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                      <Image
                        src="/icons/article.png"
                        width={20}
                        height={20}
                        alt="article-icon"
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Article
                    </div>
                  </div>
                </div>
              </Drawer.Items>
            </Drawer>
            <div className="md:hidden">
              <PhotoModal open={open.photo} handleOpen={handleOpen} />
              <ArticleModal open={open.article} handleOpen={handleOpen} />
              <VideoModal open={open.video} handleOpen={handleOpen} />
              <DocumentModal open={open.document} handleOpen={handleOpen} />
              <PollModal open={open.poll} handleOpen={handleOpen} />
              <AudioModal open={open.audio} handleOpen={handleOpen} />
            </div>
            <Link
              href="/notification"
              className=" flex-grow flex justify-center md:flex-grow-0 w-1/5  md:min-w-[80px] md:max-w-[100px] md:w-auto"
            >
              <button
                className={`pt-2 pb-1 md:p-2 w-full ${
                  router.pathname === "/notification"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/notification"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <FontAwesomeIcon icon={faBell} className="h-[20px]" />
                <div className="text-xs">Notification</div>
                {/* <div>Profile</div> */}
              </button>
            </Link>
            <div className="flex-grow flex justify-center md:flex-grow-0  w-1/5  md:min-w-[80px] md:max-w-[100px] md:w-auto">
              <button
                onClick={() => setOpenDialog(true)}
                className={`pt-2 pb-1 md:p-2 w-full md:hidden ${
                  router.pathname === "/profile" ||
                  router.pathname === "/settings"
                    ? "border-t-4 md:border-t-0 md:border-b-4"
                    : ""
                } `}
                style={
                  router.pathname === "/profile" ||
                  router.pathname === "/settings"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={22}
                  height={22}
                  className="rounded-full mx-auto"
                />
                <div className="text-xs mt-1">Profile</div>
              </button>

              <Menu
                as="div"
                className={`hidden md:inline-block relative text-left p-2 h-full  w-full ${
                  router.pathname === "/profile" ||
                  router.pathname === "/settings"
                    ? "border-t-4 md:border-t-0 md:border-b-4 pb-1"
                    : ""
                } `}
                style={
                  router.pathname === "/profile" ||
                  router.pathname === "/settings"
                    ? {
                        background: themes.secondaryColorHover,
                        color: themes.primaryText,
                        borderBottomColor: themes.secondaryColor,
                        borderTopColor: themes.secondaryColor,
                      }
                    : {
                        color: themes.alternativeText,
                      }
                }
              >
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={22}
                  height={22}
                  className="rounded-full mx-auto"
                />
                <Menu.Button className="w-full justify-center text-xs">
                  Profile <FontAwesomeIcon icon={faChevronDown} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-4 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <div className="flex items-center gap-2 px-4 py-2">
                            <div>
                              <Image
                                src={user.avatar}
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full mx-auto"
                              />
                            </div>
                            <div className="font-semibold text-sm">
                              <div style={{ color: themes.primaryColor }}>
                                {user.name}
                              </div>
                              <div style={{ color: themes.secondaryText }}>
                                @{user.username}
                              </div>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4  text-sm border rounded-full mx-3 text-center mb-2 "
                            )}
                            style={{
                              borderColor: themes.primaryColor,
                              color: themes.primaryColor,
                            }}
                          >
                            View Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/bookmarks"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faBookmark}
                              className="me-2"
                            />
                            &nbsp;Bookmarks
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <FontAwesomeIcon icon={faGear} className="me-2" />
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            onClick={(e) => {
                              logout();
                              googleLogout();
                              router.push("/login");
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightFromBracket}
                              className="me-2"
                            />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                      <hr />
                      <Menu.Item>
                        <div className="hidden md:flex items-center w-full px-4 py-2 text-left text-sm">
                          <div className="me-2 text-gray-900">
                            {theme === "dark" ? "Light" : "Dark"} Mode
                          </div>
                          <Switch
                            checked={theme === "dark" ? true : false}
                            onChange={toggleTheme}
                            className={`${
                              theme === "dark" ? "bg-black" : "bg-gray-200"
                            }
          relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={`${
                                theme === "dark"
                                  ? "translate-x-6"
                                  : "translate-x-0"
                              }
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                            />
                          </Switch>
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </>
        )}
      </div>
      <Transition.Root show={openDialog} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpenDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen ">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute right-5 top-0 -ml-8 flex pr-0 pt-4 sm:-ml-10 sm:pr-0">
                        <button
                          type="button"
                          className="relative rounded-md z-50 text-white hover:text-white"
                          onClick={() => setOpenDialog(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                          <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-0 shadow-xl justify-between">
                      <div className="relative mb-2">
                        {user ? (
                          <>
                            <Image
                              src="/login.jpg"
                              alt="avatar"
                              width={200}
                              height={100}
                              className="w-full object-cover h-36 "
                            />
                            <div
                              className="w-20 p-1 rounded-full absolute top-28 left-1"
                              style={{ background: themes.primaryColor }}
                            >
                              <Image
                                src={user.avatar}
                                alt="avatar"
                                width={100}
                                height={100}
                                className="w-full rounded-full mx-auto object-cover"
                              />
                            </div>
                            <div className="px-4 sm:px-6 absolute top-36 left-20">
                              {user ? (
                                <Dialog.Title className="text-md font-semibold leading-6 ">
                                  <div style={{ color: themes.primaryColor }}>
                                    {user.name}
                                  </div>
                                  <div
                                    className="text-sm"
                                    style={{ color: themes.secondaryText }}
                                  >
                                    @{user.username}
                                  </div>
                                </Dialog.Title>
                              ) : (
                                <Dialog.Title className="text-base font-semibold leading-6">
                                  User
                                </Dialog.Title>
                              )}
                            </div>
                          </>
                        ) : null}
                        <Link
                          href="/profile"
                          onClick={() => setOpenDialog(false)}
                          className={classNames(
                            "block px-4 py-1 text-sm border font-semibold rounded-full mx-3 text-center mb-2 mt-14 hover:bg-blue-100"
                          )}
                          style={{
                            borderColor: themes.primaryColor,
                            color: themes.primaryColor,
                          }}
                        >
                          View Profile
                        </Link>
                        <hr />
                        <div className="flex flex-col space-y-2">
                          <Link
                            href="/settings"
                            onClick={() => setOpenDialog(false)}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FontAwesomeIcon icon={faGear} className="me-2" />
                            Settings
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              googleLogout();
                              setOpenDialog(false);
                            }}
                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightFromBracket}
                              className="me-2"
                            />
                            Sign out
                          </button>
                        </div>
                      </div>

                      <div className="flex w-full px-4 py-2 text-left items-center">
                        <span className="mb-1 me-2">
                          {theme === "dark" ? "Light" : "Dark"} Mode
                        </span>
                        <Switch
                          checked={theme === "dark" ? true : false}
                          onChange={toggleTheme}
                          className={`${
                            theme === "dark" ? "bg-black" : "bg-gray-200"
                          }
          relative inline-flex h-[24px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                        >
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              theme === "dark"
                                ? "translate-x-6"
                                : "translate-x-0"
                            }
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
