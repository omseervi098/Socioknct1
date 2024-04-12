import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExclamationTriangle,
  faList,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview,
  FileCard,
  FileInputButton,
} from "@files-ui/react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import TextEditor from "../textEditor/textEditor";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export default function PhotoModal(props) {
  const cancelButtonRef = useRef(null);
  const { user } = useAuthContext();
  const { state } = useGeneralContext();
  const { themes } = state;
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [viewall, setViewAll] = useState(false);
  const [content, setContent] = useState("<p>Write something here...</p>");
  const compressFiles = async (files) => {
    try {
      const compressedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i].file;
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        compressedFiles.push({
          file: compressedFile,
          id: files[i].id,
          valid: files[i].valid,
          name: files[i].name,
          type: files[i].type,
          size: compressedFile.size,
        });
      }
      return compressedFiles;
    } catch (e) {
      console.log(e);
    }
  };
  const updateFiles = async (incommingFiles) => {
    //do something with the files
    console.log("incomming files", incommingFiles);
    //change id of file
    for (let i = 0; i < incommingFiles.length; i++) {
      incommingFiles[i].id = i + 1;
    }
    //get all valid files
    const validFiles = incommingFiles.filter((file) => file.valid);
    // now select the first 5
    incommingFiles = validFiles.slice(0, 5);
    ///set the image src
    if (validFiles.length > 0)
      setImageSrc(URL.createObjectURL(validFiles[0].file));
    setFiles(validFiles);
    // append the files to the existing files
    //even your own upload implementation
  };
  const onAdd = (file) => {
    //check if the files is valid or not
    if (!file[0].valid) {
      alert("Invalid file");
      return;
    }
    if (files.length >= 5) {
      alert("You can only upload 5 images");
      return;
    }
    console.log("file", files);
    file[0].id = files.length + 1;
    console.log("file", file[0]);
    setFiles([...files, file[0]]);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleStart = (filesToUpload) => {
    console.log("advanced demo start upload", filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log("advanced demo finish upload", uploadedFiles);
  };
  const handleAbort = (id) => {
    setFiles(
      files.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleUpload = async () => {
    //Compress Files and then convert to base64
    const compressedFiles = await compressFiles(files);
    for (let i = 0; i < compressedFiles.length; i++) {
      console.log("compressed file", compressedFiles[i]);
    }
    //convert to base64
    const base64Files = await Promise.all(
      compressedFiles.map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.file);
        return new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
        });
      })
    );
    await setBase64Files(base64Files);
  };
  const hanleSubmit = async () => {
    //send the base64 files with content to the server
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/post/create",
        {
          user,
          images: base64Files,
          content,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (id) => {
    setFiles(
      files.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          // props.handleOpen("photo");
        }}
        // data-dialog-backdrop="false"
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full  sm:w-[500px] lg:w-[900px]">
                <div className=" pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src={user.avatar}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        Add a new Photo
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("photo");
                        setFiles([]);
                        setBase64Files([]);
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-0 w-full">
                  {base64Files.length == 0 ? (
                    <div className="flex items-center flex-col sm:flex-row gap-4 w-full ">
                      {files.length == 0 ? (
                        <Dropzone
                          onChange={updateFiles}
                          minHeight="300px"
                          className={`max-h-[270px] overflow-y-auto`}
                          value={files}
                          accept="image/*"
                          maxFiles={5}
                          maxFileSize={10 * 1024 * 1024}
                          label="Drag'n drop files here or click to browse"
                          onUploadStart={handleStart}
                          onUploadFinish={handleFinish}
                        ></Dropzone>
                      ) : (
                        <>
                          <div
                            className={`${
                              viewall
                                ? "hidden lg:block flex-grow h-[300px] rounded-lg bg-gray-200 relative"
                                : "flex-grow h-[300px] rounded-lg bg-gray-200 relative"
                            }
                          "`}
                          >
                            <div className="flex flex gap-2 justify-center items-center">
                              <Image
                                src={imageSrc}
                                width={500}
                                height={500}
                                className="rounded-lg object-cover h-[270px] mt-2"
                              />
                              {!viewall && (
                                <button
                                  className="lg:hidden absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1 transition-all text-xs "
                                  style={{
                                    backgroundColor: themes.primaryColor,
                                  }}
                                  onClick={() => setViewAll(true)}
                                >
                                  <FontAwesomeIcon icon={faList} />
                                  <span> View All</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <div
                            className={`
                            ${viewall ? "block" : "hidden"}
                            lg:flex flex-col flex-grow h-[300px] rounded-lg w-[300px]`}
                          >
                            {viewall && (
                              <button
                                className="lg:hidden rounded-full p-1 transition-all text-xs "
                                // style={{ backgroundColor: themes.primaryColor }}
                                onClick={() => setViewAll(false)}
                              >
                                <FontAwesomeIcon icon={faArrowLeft} />{" "}
                                <span> Back</span>
                              </button>
                            )}
                            <div className="flex items-center justify-center gap-2 flex-wrap h-[230px] lg:h-[250px]  overflow-y-auto bg-gray-200 p-2 rounded-lg">
                              {files.map((file) => (
                                <FileMosaic
                                  {...file}
                                  key={file.id}
                                  onDelete={onDelete}
                                  className="w-20"
                                  onSee={handleSee}
                                  // onWatch={handleWatch}
                                  onAbort={handleAbort}
                                  onCancel={handleCancel}
                                  resultOnTooltip
                                  alwaysActive
                                  preview
                                />
                              ))}
                            </div>
                            <div className="h-[40px] p-1 flex items-center justify-between">
                              <FileInputButton
                                onChange={onAdd}
                                className="h-full mt-2"
                                disabled={files.length >= 5}
                                maxFiles={1}
                                accept="image/*"
                                maxFileSize={10 * 1024 * 1024}
                                label="Add More"
                              ></FileInputButton>
                              <button
                                onClick={() => setFiles([])}
                                className="h-full bg-red-600 text-white rounded-md px-2 mt-2"
                              >
                                Delete All
                              </button>
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
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {base64Files.length == 0 ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleUpload()}
                      style={{ backgroundColor: themes.primaryColor }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => hanleSubmit()}
                      style={{ backgroundColor: themes.warningColor }}
                    >
                      Submit
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      props.handleOpen("photo");
                      setFiles([]);
                      setBase64Files([]);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
