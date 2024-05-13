import EmojiPicker from "emoji-picker-react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
export default function EmojiPickerModal(props) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={props.showEmoji} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-50 ${poppins.className} `}
        initialFocus={cancelButtonRef}
        onClose={() => {
          props.setShowEmoji(false);
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-xxl my-auto">
                <div className=" pt-3 pb-3 px-4 flex flex-row justify-between items-center">
                  <EmojiPicker
                    disableAutoFocus={true}
                    height={"400px"}
                    width={"350px"}
                    skinTonesDisabled={true}
                    onEmojiClick={(emojiData, event) => {
                      if (props.replyRef) {
                        props.replyRef.current.value =
                          props.replyRef.current.value.slice(
                            0,
                            props.replyRef.current.selectionStart
                          ) +
                          emojiData.emoji +
                          props.replyRef.current.value.slice(
                            props.replyRef.current.selectionEnd
                          );
                        props.replyRef.current.focus();
                      } else if (props.commentRef) {
                        props.commentRef.current.value =
                          props.commentRef.current.value.slice(
                            0,
                            props.commentRef.current.selectionStart
                          ) +
                          emojiData.emoji +
                          props.commentRef.current.value.slice(
                            props.commentRef.current.selectionEnd
                          );
                        props.commentRef.current.focus();
                      }
                      props.setShowEmoji(false);
                    }}
                    lazyLoadEmojis={true}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
