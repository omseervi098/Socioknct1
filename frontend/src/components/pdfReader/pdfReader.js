"use client";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faDownload,
  faExpand,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { Dialog, Transition } from "@headlessui/react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Poppins } from "next/font/google";
import { useGeneralContext } from "@/context/generalcontext";
import { useSwipeable } from "react-swipeable";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function PdfReader({ file, height, info }) {
  const { themes, touch } = useGeneralContext();
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    if (!fullScreen) setPageNumber(1);
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("swiped left");
      handleNext();
    },
    onSwipedRight: () => {
      console.log("swiped right");
      handlePrev();
    },
    swipeDuration: 500,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const handler1 = useSwipeable({
    onSwipedLeft: () => {
      console.log("swiped left");
      handleNext();
    },
    onSwipedRight: () => {
      console.log("swiped right");
      handlePrev();
    },
    swipeDuration: 500,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    //render the pdf in the height of the container
    const pdfContainer = document.querySelector(".react-pdf__Page__canvas");
    if (pdfContainer) {
      pdfContainer.style.height = `${height}px `;
    }
  }, [height]);
  const handleNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  return (
    <>
      {!touch ? (
        <div
          className={`w-full flex flex-col  bg-gray-200 relative p-0 justify-center items-center transition-all duration-300 group rounded-lg overflow-hidden`}
        >
          <div className="w-full px-2 text-xs sm:text-sm  flex absolute w-full h-10 bg-gray-700 bg-opacity-70 z-10 top-0 flex justify-start items-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="max-w-4/5 truncate text-white">
              {info.name.split(".pdf")[0]}&nbsp;
            </div>
            <div className="w-[180px] flex items-center">
              <FontAwesomeIcon icon={faCircle} className="text-white h-[5px]" />
              <div className=" text-white">&nbsp;{numPages} pages</div>
            </div>
          </div>
          {pageNumber > 1 && (
            <div
              className="absolute left-2 hidden group-hover:flex p-2 bg-gray-700 bg-opacity-70 z-10 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
              onClick={handlePrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
            </div>
          )}
          {pageNumber < numPages && (
            <div
              className="absolute right-2 hidden group-hover:flex p-2 bg-gray-700 bg-opacity-70 z-10 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-white" />
            </div>
          )}
          <div className="max-w-max py-3 ">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className={`h-[${height}px] w-auto`}
              loading="Loading..."
            >
              <Page
                pageNumber={pageNumber}
                //height={height}
                {...handler1}
                loading="Loading Page..."
              />
            </Document>
          </div>
          <div className="absolute text-xs w-full hidden group-hover:flex h-10 bg-gray-700 bg-opacity-50 z-10 bottom-0 flex justify-center items-center gap-2 px-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="text-white">
              {pageNumber}/{numPages}
            </div>
            <div className="flex-grow mx-auto">
              <input
                id="range"
                type="range"
                maxLength={numPages}
                min="1"
                max={numPages}
                value={pageNumber}
                onChange={(e) => {
                  setPageNumber(parseInt(e.target.value));
                }}
                className="block w-full  bg-white border rounded-md  focus:outline-none"
              />
            </div>
            <button
              className="text-white"
              onClick={() => setFullScreen(!fullScreen)}
            >
              <FontAwesomeIcon icon={faExpand} className="h-[20px]" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gray-100 rounded-lg py-3  ">
          <div className="w-full px-3 pb-2 text-xs sm:text-sm  flex justify-start items-center">
            <div className="w-auto truncate text-blue-500">
              {info.name.split(".pdf")[0]}&nbsp;
            </div>
            <div className="w-[180px] text-blue-500 flex items-center">
              <FontAwesomeIcon icon={faCircle} className=" h-[5px]" />
              <div className=" ">&nbsp;{numPages} pages</div>
            </div>
          </div>
          <div className="w-full h-max  py-2 overflow-auto ">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className={`h-[250px] w-max mx-auto px-3 flex justify-center items-center gap-3`}
              loading="Loading..."
            >
              {/* repeat page numPages times */}
              {[...Array(numPages)].map((e, i) => (
                <button
                  className="w-[250px] h-[250px] bg-gray-200 rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300"
                  onClick={() => {
                    setFullScreen(true);
                    setPageNumber(i + 1);
                  }}
                  key={i + 1}
                >
                  <Page
                    pageNumber={i + 1}
                    className={`rounded-lg h-[250px]`}
                    height={250}
                    loading="<h1>Loading...</h1>"
                  />
                </button>
              ))}
            </Document>
          </div>
        </div>
      )}
      {fullScreen && (
        <Transition appear show={fullScreen} as={Fragment}>
          <Dialog
            as="div"
            className={`fixed inset-0 z-50 bg-gray-200 bg-opacity-90 ${poppins.className}`}
            onClose={() => setFullScreen(false)}
          >
            <div className=" w-screen h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className=" bg-gray-200 inline-block w-full h-full relative overflow-hidden  transition-all transform shadow-xl ">
                  <div className="px-2 absolute w-full py-2 bg-gray-700 bg-opacity-70 z-50 top-0 flex justify-between items-center">
                    <div className="w-4/5 flex items-center">
                      <div className="max-w-4/5 text-white text-left truncate">
                        {info.name.split(".pdf")[0]}&nbsp;
                      </div>
                      <div className="w-1/5 flex items-center">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="text-white h-[5px] hidden sm:block"
                        />
                        <div className="text-white hidden sm:block">
                          &nbsp;{numPages} pages
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-white border border-white p-1 rounded-lg flex items-center hover:bg-gray-300"
                        onClick={() => window.open(file)}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="h-[15px]"
                        />

                        <span className="text-xs hidden sm:block">
                          &nbsp; Download
                        </span>
                      </button>
                      <button
                        className="text-white"
                        onClick={() => setFullScreen(false)}
                      >
                        <FontAwesomeIcon icon={faX} className="h-[20px]" />
                      </button>
                    </div>
                  </div>
                  {pageNumber > 1 && (
                    <div
                      className="absolute left-2 top-1/2 p-2 bg-gray-700 bg-opacity-70 z-50 rounded-full cursor-pointer"
                      onClick={handlePrev}
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-white"
                      />
                    </div>
                  )}
                  {pageNumber < numPages && (
                    <div
                      className="absolute right-2 top-1/2 p-2 bg-gray-700 bg-opacity-70 z-50 rounded-full cursor-pointer"
                      onClick={handleNext}
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-white"
                      />
                    </div>
                  )}
                  <div className="h-full max-w-max flex justify-center items-center  py-3 mx-auto">
                    <Document
                      file={file}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className={`h-auto w-[95vw] sm:w-auto sm:h-[90vh]`}
                      loading="Loading..."
                    >
                      <div {...handlers} className="w-full h-full">
                        <Page
                          pageNumber={pageNumber}
                          loading="Loading Page..."
                        />
                      </div>
                    </Document>
                  </div>
                  <div className="absolute w-full h-10 bg-gray-700 bg-opacity-50 z-50 bottom-0 flex justify-center items-center gap-2 px-2">
                    <div className="text-white">
                      {pageNumber}/{numPages}
                    </div>
                    <div className="flex-grow mx-auto">
                      <input
                        id="range"
                        type="range"
                        maxLength={numPages}
                        min="1"
                        max={numPages}
                        value={pageNumber}
                        onChange={(e) => {
                          setPageNumber(parseInt(e.target.value));
                        }}
                        className="block w-full  bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                    <button
                      className="text-white"
                      onClick={() => setFullScreen(!fullScreen)}
                    >
                      <FontAwesomeIcon icon={faExpand} className="h-[20px]" />
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
