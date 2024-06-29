import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faExchange,
  faExclamationTriangle,
  faMap,
  faMapLocation,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import TextEditor from "../textEditor/textEditor";
import { Poppins } from "next/font/google";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function EditUserInfoModal(props) {
  const cancelButtonRef = useRef(null);
  const { user, updateUserData } = useAuthContext();
  const { themes } = useGeneralContext();
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio,
    phone: user.phone,
    dob: user.dob,
    location: user.location,
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        //get exact location
        axios
          .get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${
              process.env.NEXT_PUBLIC_WEATHER_API_KEY
            }`
          )
          .then((response) => {
            console.log(
              response.data[0].name +
                " , " +
                response.data[0].state +
                " , " +
                response.data[0].country
            );
            setForm({
              ...form,
              location: {
                lat: lat,
                lon: lon,
                name: response.data[0].name,
                state: response.data[0].state,
                country: response.data[0].country,
              },
            });
          });
      });
    } else {
      console.log("GeoLocation not supported by browser");
    }
  };

  const handleSubmit = async (e) => {
    toast
      .promise(updateUserData({ ...form, username: user.username }), {
        loading: "Updating Avatar...",
        success: "Avatar Updated",
        error: "Failed to Update Avatar",
      })
      .then((res) => {
        console.log(res);
      });
    props.handleOpen("info");
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
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen w-full md:h-auto md:max-w-xl flex flex-col gap-2">
                <div className="pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className=" flex flex-row items-center gap-2">
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <span className=" font-semibold">Edit User Info</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("info");
                      }}
                    />
                  </div>
                </div>
                {/* Editable Field */}
                <div className=" px-4 pb-4 pt-0 relative flex flex-col items-center justify-center gap-3">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name"
                      className="w-full text-sm rounded-lg p-2 border border-gray-300  peer"
                      placeholder=" "
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="name"
                      style={{ color: themes.secondaryText }}
                      className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative w-full -mb-1">
                    <textarea
                      type="text"
                      id="bio"
                      className="w-full text-sm rounded-lg p-2 border border-gray-300  peer"
                      placeholder=" "
                      rows={2}
                      value={form.bio}
                      onChange={(e) => {
                        setForm({ ...form, bio: e.target.value });
                      }}
                    />
                    <label
                      htmlFor="bio"
                      style={{ color: themes.secondaryText }}
                      className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Bio
                    </label>
                  </div>
                  <div className="flex flex-col md:flex-row w-full gap-3">
                    <div className="md:w-1/2 flex gap-0">
                      <button className="w-[50px] bg-gray-200 rounded-l-lg">
                        +91
                      </button>
                      <div className="relative flex-grow">
                        <input
                          type="number"
                          id="phone"
                          className="w-full text-sm rounded-r-lg p-2 border border-gray-300  peer"
                          placeholder=" "
                          value={form.phone}
                          onChange={(e) => {
                            if (e.target.value.length <= 10)
                              setForm({ ...form, phone: e.target.value });
                          }}
                        />
                        <label
                          htmlFor="phone"
                          style={{ color: themes.secondaryText }}
                          className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>
                    <div className="relative md:w-1/2">
                      <input
                        type="date"
                        id="dob"
                        className="w-full text-sm rounded-lg p-2 border border-gray-300  peer"
                        placeholder=" "
                        value={form.dob}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setForm({ ...form, dob: e.target.value });
                        }}
                      />
                      <label
                        htmlFor="dob"
                        style={{ color: themes.secondaryText }}
                        className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Date of Birth
                      </label>
                    </div>
                  </div>
                  <div className="w-full flex gap-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        id="location"
                        className="w-full text-sm rounded-lg p-2 border border-gray-300  peer"
                        placeholder=" "
                        value={
                          form.location
                            ? form.location.name +
                              " , " +
                              form.location.state +
                              " , " +
                              form.location.country
                            : form.location
                        }
                        readOnly="true"
                      />
                      <label
                        htmlFor="location"
                        style={{ color: themes.secondaryText }}
                        className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                        Location
                      </label>
                    </div>

                    <button
                      className="p-2 w-1/5 md:w-1/4 bg-blue-500 rounded-md text-sm"
                      onClick={handleGetLocation}
                    >
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        className="text-white md:hidden"
                      />
                      <span className="text-white hidden md:block">
                        Get Location
                      </span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-200 p-2 flex justify-end items-center gap-2">
                  <button
                    className="rounded-md bg-gray-400 p-2 "
                    onClick={() => {
                      setForm({
                        name: user.name,
                        bio: user.bio,
                        phone: user.phone,
                        dob: user.dob,
                        location: user.location,
                      });
                      props.handleOpen("info");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="rounded-md bg-blue-500 p-2 text-white"
                    onClick={handleSubmit}
                  >
                    Submit
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
