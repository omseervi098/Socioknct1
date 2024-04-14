import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faList, faX } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Dropzone, FileMosaic, FileInputButton } from "@files-ui/react";
import imageCompression from "browser-image-compression";
import TextEditor from "../textEditor/textEditor";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export default function PhotoModal(props) {
  const cancelButtonRef = useRef(null);
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();
  const { createPost } = usePostContext();
  const [files, setFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [viewall, setViewAll] = useState(false);
  const [content, setContent] = useState("<p>Write something here...</p>");
  const [loading, setLoading] = useState(false);
  const compressFiles = async (files) => {
    try {
      const compressedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i].file;
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.3,
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
        console.log(
          "compressed",
          files[i].name,
          compressedFile.size / (1024 * 1024)
        );
      }

      return compressedFiles;
    } catch (e) {
      console.log(e);
    }
  };
  const updateFiles = async (incommingFiles) => {
    //set the id of the files
    for (let i = 0; i < incommingFiles.length; i++) {
      incommingFiles[i].id = i + 1;
    }
    const validFiles = incommingFiles.filter((file) => file.valid); //get all valid files
    incommingFiles = validFiles.slice(0, 5); // now select the first 5
    if (validFiles.length > 0)
      setImageSrc(URL.createObjectURL(validFiles[0].file)); ///set the image src
    setFiles(validFiles);
  };
  const onAdd = (file) => {
    if (!file[0].valid) {
      alert("Invalid file");
      return;
    }
    if (files.length >= 5) {
      alert("You can only upload 5 images");
      return;
    }
    console.log("file", files);
    // give id that is not in the files
    let id = 1;
    while (files.find((x) => x.id === id)) {
      id++;
    }
    file[0].id = id;
    console.log("file", file[0]);
    setFiles([...files, file[0]]);
  };
  const onDelete = (id) => {
    console.log("delete", id);
    setFiles(files.filter((x) => x.id !== id));
    setImageSrc(undefined);
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  const handleUpload = async () => {
    await setLoading(true);
    const compressedFiles = await compressFiles(files);
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
    await setLoading(false);
  };
  const handleSubmit = async () => {
    toast
      .promise(
        createPost({
          content: content,
          type: "image",
          images: base64Files,
        }),
        {
          loading: "Posting...",
          success: "Posted successfully",
          error: "Failed to post",
        }
      )
      .then(() => {
        props.handleOpen("photo");
        setFiles([]);
        setBase64Files([]);
        setContent("<p>Write something here...</p>");
      });
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
                      alt="avatar"
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">{user.name}</span>
                      <span className="text-xs text-gray-500">
                        Add a new Photo Post
                      </span>
                    </div>
                  </div>
                  {!loading && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faX}
                        className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                        onClick={() => {
                          props.handleOpen("photo");
                          setFiles([]);
                          setBase64Files([]);
                          setImageSrc(undefined);
                          setContent("<p>Write something here...</p>");
                          setLoading(false);
                          setViewAll(false);
                          compressFiles;
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="bg-white px-4 pb-4 pt-0 w-full">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2 w-full h-[300px]">
                      <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                      <span>Compressing images...</span>
                    </div>
                  ) : base64Files.length == 0 ? (
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
                                src={
                                  imageSrc === undefined
                                    ? URL.createObjectURL(files[0].file)
                                    : imageSrc
                                }
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
                {!loading && (
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {base64Files.length == 0 ? (
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
                        props.handleOpen("photo");
                        setFiles([]);
                        setBase64Files([]);
                        setImageSrc(undefined);
                        setContent("<p>Write something here...</p>");
                        setLoading(false);
                        setViewAll(false);
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
