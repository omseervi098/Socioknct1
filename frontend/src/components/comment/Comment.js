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
import Reply from "./Reply";
import EmojiPicker from "emoji-picker-react";
import { Fragment, useRef, useState } from "react";
import EmojiPickerModal from "../modals/emojiPickerModal";
import { usePostContext } from "@/context/postcontext";
import { Menu, Transition } from "@headlessui/react";
import DeleteAlert from "../modals/deleteAlert";
import toast from "react-hot-toast";
export default function Comment(props) {
  const { postId, comment, postUser } = props;
  const { touch, themes, setDeleteAlert } = useGeneralContext();
  const { user } = useAuthContext();
  const { addReply, editComment, deleteComment } = usePostContext();
  const [openReply, setOpenReply] = useState(false);
  const [expandReply, setExpandReply] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [editable, setEditable] = useState(false);
  const editText = useRef();
  const replyRef = useRef();
  const handleAddReply = () => {
    console.log("Add reply");
    addReply({
      postId,
      commentId: comment._id,
      content: replyRef.current.value,
    });
    replyRef.current.value = "";
  };
  const handleDeleteComment = (id) => {
    console.log("Delete comment", id);
    toast.promise(deleteComment({ postId, commentId: id }), {
      loading: "Deleting comment...",
      success: "Comment deleted successfully",
      error: "Comment not deleted",
    });
  };
  const handleEditComment = (id, text) => {
    console.log("Edit comment", id, text);
    if (text.trim() === "" || text.trim() === comment.text) {
      return;
    }
    toast.promise(editComment({ postId, commentId: id, text }), {
      loading: "Editing comment...",
      success: "Comment edited successfully",
      error: "Edit comment failed",
    });
  };
  return (
    <>
      <div className="w-full flex flex-row items-start justify-start gap-0">
        <Image
          src={comment.user.avatar}
          alt="avatar"
          width={50}
          height={50}
          className="w-[40px] h-auto rounded-full"
        />
        <div className="w-[calc(100%-40px)] flex flex-col items-start gap-1 pl-2">
          <div
            className="bg-gray-200 w-full flex flex-col items-start justify-between gap-1 px-2 pt-1 pb-2  rounded-lg"
            style={{ borderTopLeftRadius: "0px" }}
          >
            <div className="w-full flex flex-row items-start justify-between gap-1">
              <div className="w-full flex flex-col flex-wrap items-start justify-start gap-0">
                <div className="w-full text-xs font-semibold flex flex-row flex-wrap items-start gap-0">
                  <span className="text-xs font-semibold">
                    {comment.user.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    &nbsp;{props.parseDate(comment.createdAt)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 line-clamp-1">
                  {comment.user.bio}
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
                  <Menu.Items className="absolute right-0 z-30 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <>
                        {comment.user._id !== user._id ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }
                                flex px-2 py-1 text-sm w-full text-left gap-1`}
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
                        ) : null}
                      </>
                      {comment.user._id === user._id ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }
                                flex px-2 py-1 text-sm w-full text-left gap-1`}
                              onClick={() => {
                                //check if post has poll
                                setEditable(!editable);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="h-[15px]"
                              />
                              &nbsp;Edit Comment
                            </button>
                          )}
                        </Menu.Item>
                      ) : null}
                      {comment.user._id === user._id ||
                      postUser._id === user._id ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }
                                flex px-2 py-1 text-sm w-full text-left gap-1`}
                              onClick={() => {
                                setDeleteAlert({
                                  open: true,
                                  id: comment._id,
                                  text: "comment",
                                  handleDelete: handleDeleteComment,
                                });
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="h-[15px]"
                              />
                              &nbsp;Delete Comment
                            </button>
                          )}
                        </Menu.Item>
                      ) : null}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <div
                className={`w-full flex flex-col items-start gap-1 ${
                  editable ? "py-2 px-1 border border-gray-400 rounded-lg" : ""
                }`}
              >
                {editable ? (
                  <div
                    contentEditable={true}
                    ref={editText}
                    suppressContentEditableWarning={true}
                    className=" p-2 relative w-full text-xs b rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                    style={{ fontSize: "13px" }}
                  >
                    {comment.text}
                  </div>
                ) : (
                  <span className="text-sm ">{comment.text}</span>
                )}
                {editable ? (
                  <div className="w-full flex flex-row items-center justify-between gap-2 pt-1">
                    <div className="w-full flex flex-row items-center justify-start gap-2">
                      <button
                        className="text-blue-500 p-1 px-3 rounded-full text-xs border border-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          const text = editText.current.innerText;
                          handleEditComment(comment._id, text);
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
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <button className="text-xs font-semibold text-gray-700 hover:text-blue-500">
                  <FontAwesomeIcon icon={faThumbsUp} className="h-[12px]" />{" "}
                  Like ({comment.likes.length})
                </button>
                |
                <button
                  className="text-xs font-semibold text-gray-700 hover:text-blue-500"
                  onClick={() => setOpenReply(!openReply)}
                >
                  Reply ({comment.replies.length})
                </button>
              </div>
            </div>
          </div>
          <Transition
            show={openReply}
            className="w-full"
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className=" w-full flex flex-row items-start justify-center py-2 px-0">
              <div className="min-w-[40px] w-[40px] h-auto max-h-12 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="w-[40px] h-auto rounded-full"
                />
              </div>
              <div className="relative w-[calc(100%-40px)] flex flex-col items-start gap-1 pl-2">
                <div className="relative w-full">
                  <Textarea
                    placeholder="Write a reply"
                    className={`textareacommentreply p-2 relative w-full text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 ${
                      touch ? "" : "pe-8"
                    } min-h-[35px] max-h-[90px] `}
                    style={{ fontSize: "13px" }}
                    rows={1}
                    ref={replyRef}
                  ></Textarea>
                  {!touch && (
                    <button
                      className=" absolute right-1 bottom-1 text-gray-500  rounded-full flex items-center justify-center gap-1  p-1 px-2"
                      onClick={() => setShowEmoji(!showEmoji)}
                    >
                      <FontAwesomeIcon icon={faSmile} className="h-[18px]" />
                    </button>
                  )}
                </div>
                <button
                  className="bg-blue-500 flex items-center justify-center gap-1 hover:bg-blue-700 p-1 px-2  rounded-full"
                  onClick={handleAddReply}
                >
                  <span className="text-xs text-white">Reply</span>
                </button>
              </div>
            </div>
          </Transition>
          {comment.replies.length > 0 && (
            <>
              {comment.replies.slice(0, 1).map((reply, index) => (
                <Reply
                  key={index}
                  postId={postId}
                  commentId={comment._id}
                  reply={reply}
                  postUser={postUser}
                  parseDate={props.parseDate}
                />
              ))}

              <Transition
                show={expandReply}
                className="w-full"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {comment.replies.slice(1).map((reply, index) => (
                  <Reply
                    key={index}
                    postId={postId}
                    commentId={comment._id}
                    reply={reply}
                    parseDate={props.parseDate}
                    postUser={postUser}
                  />
                ))}
              </Transition>
              {comment.replies.length > 1 ? (
                <button
                  className="w-full flex text-xs flex-col items-start gap-2 pt-1 pb-0 px-1 text-gray-500 hover:text-blue-500"
                  onClick={() => setExpandReply(!expandReply)}
                >
                  View {expandReply ? "less" : "more"} replies ...
                </button>
              ) : (
                ""
              )}
            </>
          )}
          <EmojiPickerModal
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            replyRef={replyRef}
          />
        </div>
      </div>
    </>
  );
}
