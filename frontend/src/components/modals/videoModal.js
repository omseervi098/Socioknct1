import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import { Poppins } from "next/font/google";
import { Dropzone, VideoPreview, FileInputButton } from "@files-ui/react";
import TextEditor from "../textEditor/textEditor";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
import Image from "next/image";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function VideoModal(props) {
  const cancelButtonRef = useRef(null);
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();
  const { createPost, uploadToCloud } = usePostContext();
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("<p>Write something here...</p>");
  const [videoSrc, setVideoSrc] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const updateFile = (files) => {
    if (files.length > 1) {
      toast.error("You can only upload one video");
      return;
    }
    if (files[0].valid) {
      setFiles(files);
      setVideoSrc(URL.createObjectURL(files[0].file));
    } else {
      toast.error("Invalid file check size and type");
    }
  };
  const handleUpload = async () => {
    await setLoading(true);
    try {
      const resp = await uploadToCloud({
        file: files[0].file,
        type: { general: "video", type: "video" },
      });
      console.log(resp);
      await setVideoURL(resp);
      await setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error uploading video");
      await setLoading(false);
    }
  };
  const handleSubmit = async () => {
    toast.promise(
      createPost({
        content: content,
        type: "video",
        video: videoURL,
      }),
      {
        loading: "Posting...",
        success: (data) => {
          setFiles([]);
          setContent("<p>Write something here...</p>");
          setVideoURL("");
          setVideoSrc("");
          setLoading(false);
          props.handleOpen("video");
          return "Posted";
        },
        error: (err) => {
          setLoading(false);
          setFiles([]);
          setContent("<p>Write something here...</p>");
          setVideoURL("");
          setVideoSrc("");
          props.handleOpen("video");
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
          // props.handleOpen("video");
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
              <Dialog.Panel className="relative transform flex flex-col justify-between rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen md:h-auto md:w-auto  sm:w-[600px] md:w-[700px] lg:w-[900px]">
                <div className=" pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
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
                        Add a new Video Post
                      </span>
                    </div>
                  </div>
                  {!loading && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                        onClick={() => {
                          props.handleOpen("video");
                          setFiles([]);
                          setContent("<p>Write something here...</p>");
                          setVideoURL("");
                          setVideoSrc("");
                          setLoading(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="bg-white px-4 pb-4 py-4 sm:py-0 w-full">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2 w-full h-[300px]">
                      <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                      <span>Uploading Your Video...</span>
                    </div>
                  ) : videoURL == "" ? (
                    <div className="flex items-center flex-col md:flex-row gap-4 w-full ">
                      {files.length == 0 ? (
                        <Dropzone
                          onChange={updateFile}
                          accept="video/*"
                          minHeight="300px"
                          label="Drag and drop your video here"
                          multiple={false}
                          maxFiles={1}
                          maxFileSize={1024 * 1024 * 50}
                          className={`max-h-[270px] overflow-y-auto`}
                          value={files}
                        ></Dropzone>
                      ) : (
                        <>
                          <div className="flex flex gap-2 justify-center items-center w-full md:w-2/3">
                            <VideoPreview
                              src={videoSrc}
                              className="w-full h-full   rounded-lg "
                              controls
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
                                accept="video/*"
                                multiple={false}
                                maxFiles={1}
                                maxFileSize={1024 * 1024 * 50}
                                value={files}
                              >
                                Replace
                              </FileInputButton>
                            </div>
                          </div>
                        </>
                      )}
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
                  <div className=" bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {videoURL == "" ? (
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
                        props.handleOpen("video");
                        setFiles([]);
                        setContent("<p>Write something here...</p>");
                        setVideoURL("");
                        setVideoSrc("");
                        setLoading(false);
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
