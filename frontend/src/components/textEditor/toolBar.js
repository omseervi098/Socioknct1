"use client";
import { useState } from "react";
import { useGeneralContext } from "@/context/generalcontext";
import {
  faBold,
  faCode,
  faItalic,
  faListOl,
  faListUl,
  faMinus,
  faParagraph,
  faQuoteRight,
  faRedo,
  faSmile,
  faStrikethrough,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tiptap/react";
export default function ToolBar({ editor, showEmojiPicker }) {
  const { state } = useGeneralContext();
  const { themes } = state;
  if (!editor) return null;

  return (
    <div
      className="flex justify-start items-center gap-1 w-full py-1 px-1 rounded-t-md"
      style={{
        backgroundColor: themes.primaryColor,
      }}
    >
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`p-1 px-3 rounded-md text-white 
          hover:bg-white  hover:bg-opacity-30 
        `}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`p-1 px-3 rounded-md text-white 
          hover:bg-white  hover:bg-opacity-30 
        `}
      >
        <FontAwesomeIcon icon={faRedo} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("bold") ? "bg-white text-gray-500 bg-opacity-30" : ""
        } `}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FontAwesomeIcon icon={faBold} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("italic")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("strike")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faStrikethrough} />
      </button>

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("horizontalRule")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("orderedList")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faListOl} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("bulletList")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faListUl} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("codeBlock")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faCode} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 px-3 rounded-md text-white ${
          editor.isActive("blockquote")
            ? "bg-white text-gray-500 bg-opacity-30"
            : ""
        } `}
      >
        <FontAwesomeIcon icon={faQuoteRight} />
      </button>
      <button
        className="p-1 px-3 rounded-md text-white flex-grow text-right"
        onClick={showEmojiPicker}
      >
        <FontAwesomeIcon icon={faSmile} />
      </button>
    </div>
  );
}
