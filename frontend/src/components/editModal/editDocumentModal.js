"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import { Poppins } from "next/font/google";
import { Dropzone, FileInputButton } from "@files-ui/react";
import TextEditor from "../textEditor/textEditor";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
import Image from "next/image";
import PdfReader from "../pdfReader/pdfReader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});

export default function EditDocumentModal(props) {
  const cancelButtonRef = useRef(null);
  const { post } = props;
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();
  const { updatePost, uploadToCloud } = usePostContext();
  const [files, setFiles] = useState(
    post.document && [
      {
        name: post.document.name,
        size: post.document.size,
        url: post.document.url,
      },
    ]
  );
  const [content, setContent] = useState(post.text);
  const [documentSrc, setDocumentSrc] = useState(
    post.document ? post.document.url : ""
  );
  const [documentURL, setDocumentURL] = useState(post.document);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(false);
  const updateFile = (files) => {
    console.log(files);
    if (files.length > 1) {
      toast.error("You can only upload one file at a time");
      return;
    }
    console.log(files);
    if (files.length == 0) return;
    if (files[0].valid) {
      setFiles(files);

      setDocumentSrc(URL.createObjectURL(files[0].file));
    } else {
      toast.error("Invalid file type");
    }
  };
  const handleUpload = async () => {
    setLoading(true);
    try {
      // If files are already uploaded
      if (files[0].url) {
        setLoading(false);
        setNext(true);
        return;
      }
      const resp = await uploadToCloud({
        file: files[0].file,
        type: { general: "raw", type: "document" },
      });
      console.log(resp);
      setDocumentURL(resp);
      setLoading(false);
      setNext(true);
    } catch (err) {
      console.log(err);
      toast.error("Error uploading Document");
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    toast.promise(
      updatePost(post._id, {
        content: content,
        type: "document",
        document: {
          url: documentURL,
          name: files[0].name,
          size: files[0].size,
        },
      }),
      {
        loading: "Posting...",
        success: (data) => {
          setFiles(
            data.document && [
              {
                name: data.document.name,
                size: data.document.size,
                url: data.document.url,
              },
            ]
          );
          setContent(data.text);
          setDocumentSrc(data.document ? data.document.url : "");
          setDocumentURL(data.document);
          setLoading(false);
          setNext(false);
          props.handleOpen("document");
          return "Posted";
        },
        error: (err) => {
          setLoading(false);
          setNext(false);
          setFiles(
            post.document && [
              {
                name: post.document.name,
                size: post.document.size,
                url: post.document.url,
              },
            ]
          );
          setContent(post.text);
          setDocumentSrc(post.document ? post.document.url : "");
          setDocumentURL(post.document);
          props.handleOpen("document");
          return "Error Posting";
        },
      }
    );
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          // props.handleOpen("document");
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
              <Dialog.Panel className="relative transform flex flex-col justify-between rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen md:h-auto sm:my-8 md:w-full sm:w-[600px] md:w-[700px] lg:w-[900px] overflow-y-auto">
                <div className=" pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex  items-center gap-2">
                    <Image
                      src={user.avatar}
                      width={50}
                      alt="avatar"
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        Editing a Document
                      </span>
                    </div>
                  </div>

                  {!loading && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                        onClick={() => {
                          props.handleOpen("document");
                          setFiles(
                            post.document && [
                              {
                                name: post.document.name,
                                size: post.document.size,
                                url: post.document.url,
                              },
                            ]
                          );
                          setContent(post.text);
                          setDocumentURL(post.document);
                          setDocumentSrc(
                            post.document ? post.document.url : ""
                          );
                          setNext(false);
                          setLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="bg-white px-4 pb-4 pt-0 w-full">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2 w-full h-[300px]">
                      <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                      <span>Uploading Your Document...</span>
                    </div>
                  ) : !next ? (
                    <div className="flex items-center flex-col md:flex-row gap-4 w-full ">
                      <>
                        <div className="flex bg-gray-200 flex-col gap-2 justify-center items-center w-full md:w-2/3">
                          {/* <iframe
                              src={documentSrc}
                              width="100%"
                              height={300}
                            ></iframe> */}
                          <PdfReader
                            file={documentSrc}
                            height={300}
                            info={files[0]}
                          />
                        </div>
                        <div className="flex flex-col   gap-3 w-full md:w-1/3">
                          <div className="flex flex-col justify-center gap-2 bg-gray-100 p-2 rounded-lg">
                            <div className="text-xs md:text-sm flex">
                              Name:
                              <div className="font-semibold px-2">
                                {files[0].name}
                              </div>
                            </div>
                            <div className="text-xs md:text-sm flex">
                              Size :
                              <div className="font-semibold px-2">
                                {Math.round(
                                  (files[0].size / (1024 * 1024)) * 100
                                ) / 100}{" "}
                                mb
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center gap-2">
                            <button
                              className="bg-red-600 text-white font-semibold rounded-md p-2 hover:bg-red-500 transition-all"
                              onClick={() => setFiles([])}
                            >
                              Remove
                            </button>
                            <FileInputButton
                              onChange={updateFile}
                              accept="application/pdf"
                              multiple={false}
                              maxFiles={1}
                              maxFileSize={10485760}
                            >
                              Replace
                            </FileInputButton>
                          </div>
                        </div>
                      </>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 flex-wrap rounded-lg">
                      <TextEditor
                        className="w-full"
                        content={content}
                        setContent={setContent}
                      />
                    </div>
                  )}
                </div>
                {!loading && (
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {!next ? (
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto
                      ${
                        files.length == 0
                          ? "cursor-not-allowed bg-blue-100"
                          : "cursor-pointer bg-blue-500 hover:bg-blue-400 transition-all"
                      }
                      `}
                        onClick={() => handleUpload()}
                        disabled={files.length == 0}
                        // style={{ backgroundColor: themes.primaryColor }}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto
                          ${
                            content.substring(3, content.length - 4).trim() ===
                              "Write something here..." ||
                            content.substring(3, content.length - 4).trim() ===
                              ""
                              ? "cursor-not-allowed bg-blue-100"
                              : "cursor-pointer bg-blue-500 hover:bg-blue-400 transition-all"
                          }
                          `}
                        onClick={() => handleSubmit()}
                        disabled={
                          content.substring(3, content.length - 4).trim() ===
                            "Write something here..." ||
                          content.substring(3, content.length - 4).trim() === ""
                            ? true
                            : false
                        }
                      >
                        Submit
                      </button>
                    )}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        props.handleOpen("document");
                        setFiles(
                          post.document && [
                            {
                              name: post.document.name,
                              size: post.document.size,
                              url: post.document.url,
                            },
                          ]
                        );
                        setContent(post.text);
                        setDocumentURL(post.document);
                        setDocumentSrc(post.document ? post.document.url : "");
                        setLoading(false);
                        setNext(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
