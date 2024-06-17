import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faExchange, faX } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";
import getCroppedImg, { urltoImage } from "@/utils/cropImage";
import { RangeSlider } from "flowbite-react";
import { Avatar } from "@files-ui/react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function EditAvatarModal(props) {
  const cancelButtonRef = useRef(null);
  const { avatar } = props;
  const { user, updateUserData } = useAuthContext();
  const { themes } = useGeneralContext();
  const { uploadToCloud } = usePostContext();
  const [open, setOpen] = useState({
    edit: false,
    replace: false,
    view: true,
    crop: false,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSource, setImageSource] = useState(user?.avatar);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSource,
        croppedAreaPixels,
        rotation
      );
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeSource = (selectedFile) => {
    setImageSource(URL.createObjectURL(selectedFile));
  };
  const handleSubmitImage = async (image) => {
    toast.promise(updateUserData({ avatar: image, username: user.username }), {
      loading: "Updating Avatar...",
      success: "Avatar Updated",
      error: "Failed to Update Avatar",
    });
  };

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {}}
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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen w-full md:h-auto md:w-[70vw] flex flex-col justify-between">
                <div className="pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className=" flex flex-col">
                      <span className=" font-semibold">
                        {open.view && "Profile Picture"}
                        {open.edit && "Edit Picture"}
                        {open.replace && "Replace Picture"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("avatar");
                        setOpen({
                          ...open,
                          edit: false,
                          view: true,
                          replace: false,
                        });
                        setImageSource(user.avatar);
                        setZoom(1);
                        setRotation(0);
                      }}
                    />
                  </div>
                </div>

                {open.view && (
                  <>
                    <div className="bg-white px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        width={240}
                        height={240}
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-sm  flex flex-row justify-center items-center gap-4">
                      <div className=" px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                        <button
                          className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none`}
                          onClick={() => {
                            setOpen({
                              ...open,
                              edit: true,
                              view: false,
                              replace: false,
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} /> &nbsp; Edit Picture
                        </button>
                      </div>
                      <div className=" px-4 pb-4 pt-0 relative flex flex-col items-center justify-center">
                        <button
                          className={`bg-blue-500 text-white  px-4 py-2 rounded-md focus:outline-none`}
                          onClick={() => {
                            setOpen({
                              ...open,
                              edit: false,
                              view: false,
                              replace: true,
                            });
                          }}
                        >
                          <FontAwesomeIcon icon={faExchange} />
                          &nbsp; Replace Picture
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {open.edit && (
                  <>
                    <div className="bg-white px-4 pb-4 pt-0 flex flex-col relative  gap-4 justify-center items-center w-full h-[250px]">
                      <div className="">
                        <Cropper
                          image={imageSource}
                          crop={crop}
                          rotation={rotation}
                          zoom={zoom}
                          aspect={1}
                          cropSize={{ width: 230, height: 230 }}
                          cropShape="round"
                          onCropChange={setCrop}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="w-full flex gap-4 justify-evenly items-center py-3">
                        <div className="flex flex-col gap-4 w-1/3 justify-center items-center">
                          Zoom
                          <RangeSlider
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-4 w-1/3 justify-center items-center">
                          Rotation
                          <RangeSlider
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(e) => setRotation(e.target.value)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-2 flex flex-row relative  gap-4 justify-end items-center w-full">
                      <button
                        className={`bg-gray-300 px-4 py-2 rounded-md focus:outline-none`}
                        onClick={() => {
                          setOpen({
                            ...open,
                            edit: false,
                            view: false,
                            replace: true,
                          });
                        }}
                      >
                        Back
                      </button>
                      <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none`}
                        onClick={async () => {
                          const croppedImage = await showCroppedImage();
                          const image = await urltoImage(croppedImage);
                          const res = await uploadToCloud({
                            file: image,
                            type: {
                              type: "image",
                              general: "image",
                            },
                          });
                          console.log(res);
                          setImageSource(res);
                          handleSubmitImage(res);
                          setOpen({
                            ...open,
                            edit: false,
                            view: true,
                            replace: false,
                          });
                          setZoom(1);
                          setRotation(0);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
                {open.replace && (
                  <>
                    <div className="bg-white px-4 pb-4 pt-0 flex flex-col relative  gap-4 justify-center items-center w-full h-[250px]">
                      <Avatar
                        src={imageSource}
                        onChange={handleChangeSource}
                        changeLabel="Change"
                        emptyLabel="Empty"
                        variant="circle"
                        size="lg"
                      />
                      <span className="text-xs text-gray-500">
                        You can change your profile picture by tapping the
                        profile picture above
                      </span>
                    </div>
                    <div className="bg-gray-100 p-2 flex flex-row relative  gap-4 justify-end items-center w-full">
                      <button
                        className={`bg-gray-300 px-4 py-2 rounded-md focus:outline-none`}
                        onClick={() => {
                          setOpen({
                            ...open,
                            edit: false,
                            view: true,
                            replace: false,
                          });
                          props.handleOpen("avatar");
                          setImageSource(user.avatar);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none`}
                        onClick={async () => {
                          setOpen({
                            ...open,
                            edit: true,
                            view: false,
                            replace: false,
                          });
                          // const res=await uploadToCloud({file:imageSource, type:"image"})
                          // console.log(res)
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
