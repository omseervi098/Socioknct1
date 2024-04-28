import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
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
export default function PostImageModal(props) {
  const cancelButtonRef = useRef(null);
  const { postInfo, open, handleOpen } = props;
  const [seeMore, setSeeMore] = useState(false);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          handleOpen();
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen max-w-xxl md:mx-4 lg:mx-10 xl:mx-20">
                <div className="grid sm:grid-cols-3 gap-0 h-full max-h-screen">
                  <div className="sm:col-span-2 h-[50vh] sm:h-auto flex items-center justify-center bg-gray-800">
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
                            className="max-h-[45vh] sm:max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] object-contain"
                          />
                        </div>
                      ))}
                    </Carousel>
                    <div className="right-1 top-1 absolute p-0 sm:hidden">
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-white cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                        onClick={() => {
                          props.handleOpen();
                        }}
                      />
                    </div>
                  </div>
                  <div className="h-[50vh] sm:h-full w-full flex flex-col overflow-y-auto">
                    <div className="w-full pt-3 pb-3 px-4 flex flex-row justify-between ">
                      <div className="flex items-center gap-2">
                        <Image
                          src={postInfo.user.avatar}
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-md font-semibold">
                            {postInfo.user.name}
                          </span>
                          <span className="text-xs text-gray-500"></span>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faX}
                          className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                          onClick={() => {
                            props.handleOpen();
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-4">
                      <div className="relative w-full text-xs sm:text-sm flex items-center pt-2 pb-2 px-2  ">
                        <div
                          dangerouslySetInnerHTML={{ __html: postInfo.text }}
                          className={`tiptap transition-all w-full ease-in-out duration-300
                        ${
                          seeMore
                            ? "block"
                            : "max-h-[80px] overflow-hidden mb-2"
                        }`}
                        ></div>
                        {postInfo.text.length > 200 && (
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
