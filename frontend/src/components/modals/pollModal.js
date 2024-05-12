import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faX } from "@fortawesome/free-solid-svg-icons";
import TextEditor from "../textEditor/textEditor";
import { Poppins } from "next/font/google";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Image from "next/image";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function PollModal(props) {
  const cancelButtonRef = useRef(null);
  const { user } = useAuthContext();
  const { themes } = useGeneralContext();
  const { createPost } = usePostContext();
  const [content, setContent] = useState("<p>Write something here...</p>");

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    question: "",
    options: ["", ""],
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);
  const handleAddOption = () => {
    // check if options are more than 4
    if (form.options.length >= 4) {
      toast.error("You can only add 4 options");
      return;
    }
    setForm({ ...form, options: [...form.options, ""] });
  };
  const handleRemoveOption = () => {
    if (form.options.length <= 2) {
      toast.error("You must have at least 2 options");
      return;
    }
    setForm({
      ...form,
      options: form.options.slice(0, form.options.length - 1),
    });
  };
  const handleValidation = () => {
    if (form.question.trim() === "") {
      setError("Question is required");
      return false;
    }
    for (let option of form.options) {
      if (option.trim() === "") {
        setError("Options cannot be empty");
        return false;
      }
    }
    setError(null);
    setStep(2);
    return true;
  };
  const handleSubmit = async (e) => {
    toast
      .promise(
        createPost({
          content: content,
          type: "poll",
          question: form.question,
          options: form.options,
        }),
        {
          loading: "Posting...",
          success: "Posted successfully",
          error: "Failed to post",
        }
      )
      .then(() => {
        setContent("<p>Write something here...</p>");
        props.handleOpen("poll");
        setForm({
          question: "",
          options: ["", ""],
        });
        setStep(1);
      });
  };
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className}`}
        initialFocus={cancelButtonRef}
        onClose={() => {
          props.handleOpen("poll");
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all h-screen w-screen md:h-auto sm:my-8 md:w-full sm:max-w-xl">
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
                        Add a new Poll
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faX}
                      className="text-gray-500 cursor-pointer hover:text-red-600 transition-all hover:border rounded-full p-1"
                      onClick={() => {
                        props.handleOpen("poll");
                        setContent("<p>Write something here...</p>");
                      }}
                    />
                  </div>
                </div>
                <div className="bg-white px-4 pb-4 pt-0 w-full">
                  {step == 1 ? (
                    <div className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          id="question"
                          className="w-full rounded-lg p-2 border border-gray-300  peer"
                          placeholder=" "
                          value={form.question}
                          onChange={(e) =>
                            setForm({ ...form, question: e.target.value })
                          }
                        />
                        <label
                          htmlFor="question"
                          style={{ color: themes.secondaryText }}
                          className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                          Question
                        </label>
                      </div>
                      {form.options.map((option, index) => (
                        <div className="relative" key={index}>
                          <input
                            type="text"
                            id={`option-${index}`}
                            className="w-full rounded-lg p-2 border border-gray-300  peer"
                            placeholder=" "
                            value={form.options[index]}
                            onChange={(e) => {
                              let newOptions = [...form.options];
                              newOptions[index] = e.target.value;
                              setForm({ ...form, options: newOptions });
                            }}
                          />
                          <label
                            htmlFor={`option-${index}`}
                            style={{ color: themes.secondaryText }}
                            className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                          >
                            Option {index + 1}
                          </label>
                        </div>
                      ))}
                      {error && (
                        <div className="flex items-center gap-2 text-red-500">
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                          <span>{error}</span>
                        </div>
                      )}
                      <div className="flex flex gap-2">
                        <button
                          className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-all p-1 hover:rounded-full"
                          onClick={handleAddOption}
                        >
                          Add Option
                        </button>
                        <button
                          className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-all p-1 hover:rounded-full"
                          onClick={handleRemoveOption}
                        >
                          Remove Option
                        </button>
                      </div>
                    </div>
                  ) : (
                    <TextEditor content={content} setContent={setContent} />
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {step == 1 ? (
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto
                    bg-blue-500 hover:bg-blue-400 transition-all
                      `}
                      onClick={() => {
                        handleValidation() && setStep(2);
                      }}
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
                      disabled={
                        content.substring(3, content.length - 4).trim() ===
                          "Write something here..." ||
                        content.substring(3, content.length - 4).trim() === ""
                          ? true
                          : false
                      }
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      props.handleOpen("poll");
                      setContent("<p>Write something here...</p>");
                      setForm({
                        question: "",
                        options: ["", ""],
                      });
                      setStep(1);
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
