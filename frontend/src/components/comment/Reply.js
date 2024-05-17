import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import {
  faEdit,
  faEllipsisH,
  faHandDots,
  faListDots,
  faSmile,
  faThumbsUp,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea } from "flowbite-react";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import EmojiPickerModal from "../modals/emojiPickerModal";
import { Menu, Transition } from "@headlessui/react";
import { usePostContext } from "@/context/postcontext";
import toast from "react-hot-toast";
export default function Reply(props) {
  const { commentId, postId, reply, postUser } = props;
  const { touch, themes, setDeleteAlert } = useGeneralContext();
  const { user } = useAuthContext();
  const { deleteReply, editReply } = usePostContext();
  const [editable, setEditable] = useState(false);
  const editRef = useRef();
  const handleDeleteReply = async (id) => {
    console.log("delete reply", id);
    toast.promise(deleteReply({ postId, commentId, replyId: id }), {
      loading: "Deleting...",
      success: "Reply Deleted",
      error: "Failed to delete reply",
    });
  };
  const handleEditReply = async (id, text) => {
    console.log("edit reply", id, text);
    if (text.trim() === "" || text.trim() === reply.text) return;
    toast.promise(
      editReply({ replyId: id, content: text, postId, commentId }),
      {
        loading: "Updating...",
        success: "Reply Updated",
        error: "Failed to update reply",
      }
    );
  };
  return (
    <>
      <div className="w-full flex flex-row items-start justify-start gap-2 py-2 ">
        <Image
          src={reply.user.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="w-[40px] h-auto rounded-full"
        />

        <div
          className="bg-gray-200 w-full flex flex-col items-start justify-between gap-1 px-2 pt-1 pb-2  rounded-lg"
          style={{ borderTopLeftRadius: "0px" }}
        >
          <div className="w-full flex flex-row items-start justify-between gap-2">
            <div className="w-full flex flex-col flex-wrap items-start justify-start gap-0">
              <div className="w-full text-xs font-semibold flex flex-row flex-wrap items-start gap-0">
                <span className="text-xs font-semibold">{reply.user.name}</span>
                <span className="text-xs text-gray-500">
                  &nbsp;{props.parseDate(reply.createdAt)}
                </span>
              </div>
              <span className="text-xs text-gray-500 line-clamp-1">
                {reply.user.bio}
              </span>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className="inline-flex w-full justify-center rounded-md px-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300"
                  style={{
                    backgroundColor: themes.body,
                    color: themes.primaryText,
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="h-[20px]" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-30 mt-0 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <>
                      {user._id !== reply.user._id && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }
                                flex px-3 py-1 text-sm w-full text-left gap-2`}
                              onClick={() => {
                                //check if post has poll
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faUserPlus}
                                className="h-[15px]"
                              />
                              Connect
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user._id === reply.user._id && (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }
                                flex px-3 py-1 text-sm w-full text-left gap-3`}
                              onClick={() => {
                                //check if post has poll
                                setEditable(!editable);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="h-[15px]"
                              />
                              Edit Reply
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      {user._id === reply.user._id ||
                      postUser._id === user._id ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }
                                flex px-3 py-1 text-sm w-full text-left gap-3`}
                              onClick={() => {
                                setDeleteAlert({
                                  open: true,
                                  id: reply._id,
                                  text: "Reply",
                                  handleDelete: handleDeleteReply,
                                });
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="h-[15px]"
                              />
                              Delete Reply
                            </button>
                          )}
                        </Menu.Item>
                      ) : null}
                    </>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full flex flex-col items-start gap-1">
              <div
                className={`w-full flex flex-col items-start gap-1 ${
                  editable ? "py-2 px-1 border border-gray-400 rounded-lg" : ""
                }`}
              >
                {editable ? (
                  <div
                    contentEditable={true}
                    ref={editRef}
                    suppressContentEditableWarning={true}
                    className=" p-2 relative w-full text-xs b rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                    style={{ fontSize: "13px" }}
                  >
                    {reply.text}
                  </div>
                ) : (
                  <span className="text-sm ">{reply.text}</span>
                )}
                {editable ? (
                  <div className="w-full flex flex-row items-center justify-between gap-2 pt-1">
                    <div className="w-full flex flex-row items-center justify-start gap-2">
                      <button
                        className="text-blue-500 p-1 px-3 rounded-full text-xs border border-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          const text = editRef.current.innerText;
                          handleEditReply(reply._id, text);
                          setEditable(false);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-300 text-white p-1 px-3 rounded-full text-xs hover:bg-red-500"
                        onClick={() => {
                          setEditable(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start gap-3">
              <button className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                <FontAwesomeIcon icon={faThumbsUp} className="h-[12px]" /> Like
                ({reply.likes.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
