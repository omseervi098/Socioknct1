"use client";
import {
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
export default function PdfReader({ file, height, info }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  useEffect(() => {
    //render the pdf in the height of the container
    const pdfContainer = document.querySelector(".react-pdf__Page__canvas");
    if (pdfContainer) {
      pdfContainer.style.height = `${height}px`;
    }
  }, [height]);
  return (
    <>
      <div
        className={`w-full flex flex-col relative p-0 justify-center items-center`}
      >
        <div className="px-2 absolute w-full h-10 bg-gray-500 bg-opacity-70 z-50 top-0 flex justify-start items-center">
          <div className="text-white">{info.name.split(".pdf")[0]}&nbsp;</div>
          <FontAwesomeIcon icon={faCircle} className="text-white h-[5px]" />
          <div className="text-white">&nbsp;{numPages} pages</div>
        </div>
        <div className="max-w-max py-3">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className={`h-[${height}px] w-auto`}
            loading="Loading..."
          >
            <Page pageNumber={pageNumber} loading="Loading Page..." />
          </Document>
        </div>
        <div className="absolute w-full h-10 bg-gray-500 bg-opacity-50 z-50 bottom-0 flex justify-center items-center gap-2 px-2">
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
      {fullScreen && (
        <Transition appear show={fullScreen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 bg-gray-200 bg-opacity-90"
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
                <div className="inline-block w-full h-full relative overflow-hidden  transition-all transform bg-white shadow-xl ">
                  <div className="px-2 absolute w-full h-10 bg-gray-500 bg-opacity-70 z-50 top-0 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-white">
                        {info.name.split(".pdf")[0]}&nbsp;
                      </div>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-white h-[5px]"
                      />
                      <div className="text-white">&nbsp;{numPages} pages</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-white border border-white px-2 flex items-center hover:bg-gray-300"
                        onClick={() => window.open(file)}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="h-[15px]"
                        />
                        &nbsp;Download
                      </button>
                      <button
                        className="text-white"
                        onClick={() => setFullScreen(false)}
                      >
                        <FontAwesomeIcon icon={faX} className="h-[20px]" />
                      </button>
                    </div>
                  </div>
                  <div className="max-w-max py-3 mx-auto">
                    <Document
                      file={file}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className={`h-[100vh] w-auto`}
                      loading="Loading..."
                    >
                      <Page pageNumber={pageNumber} loading="Loading Page..." />
                    </Document>
                  </div>
                  <div className="absolute w-full h-10 bg-gray-500 bg-opacity-50 z-50 bottom-0 flex justify-center items-center gap-2 px-2">
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
