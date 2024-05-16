"use client";
import { useCallback, useState } from "react";
import { useGeneralContext } from "@/context/generalcontext";
import {
  faAnchor,
  faBold,
  faCode,
  faItalic,
  faLink,
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
  const { touch, themes } = useGeneralContext();
  if (!editor) return null;
  const [showAnchor, setShowAnchor] = useState(false);
  const [urlValue, setUrlValue] = useState(null);
  const setLink = useCallback(() => {
    // cancelled
    console.log("urlValue", urlValue);
    if (urlValue === null) {
      return;
    }

    // empty
    if (urlValue === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: urlValue })
      .run();
    //close the anchor
    setShowAnchor(false);
  }, [editor]);
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
      <div className="relative ">
        <button
          onClick={() => {
            console.log("quote");
            setShowAnchor(!showAnchor);
            setUrlValue(editor.getAttributes("link").href);
          }}
          className={`p-1 px-3 rounded-md text-white ${
            editor.isActive("link")
              ? "bg-white text-gray-500 bg-opacity-30"
              : ""
          } `}
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
        {showAnchor && (
          <div
            className={`${
              touch ? "hidden" : "block"
            } absolute text-xs z-50 top-9 w-[220px] bg-blue-100 p-2 rounded-md shadow-lg right-[20px] right-0`}
          >
            <input
              type="text"
              placeholder="Enter URL"
              onChange={(e) => setUrlValue(e.target.value)}
              className="w-full p-1 mb-1 rounded-md border border-gray-300 text-xs bg-blue-50"
              value={urlValue}
            />
            <button
              className="p-1 px-3 rounded-md bg-blue-500 text-white me-2"
              onClick={setLink}
            >
              Link
            </button>
            <button
              className="p-1 px-3 rounded-md bg-red-500 text-white"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();
                setShowAnchor(false);
              }}
            >
              {" "}
              Unlink
            </button>
          </div>
        )}
      </div>
      <button
        className="p-1 px-3 rounded-md text-white flex-grow text-right"
        onClick={showEmojiPicker}
      >
        <FontAwesomeIcon icon={faSmile} />
      </button>
    </div>
  );
}
