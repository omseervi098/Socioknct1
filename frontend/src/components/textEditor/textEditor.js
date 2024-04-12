import { useEditor, EditorContent } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./toolBar";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useGeneralContext } from "@/context/generalcontext";
import Color from "@tiptap/extension-color";
import { Poppins } from "next/font/google";
import Image from "@tiptap/extension-image";
import EmojiPicker from "emoji-picker-react";
import { Selection } from "@tiptap/pm/state";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export default function TextEditor({ content, setContent }) {
  const { state } = useGeneralContext();
  const { themes } = state;
  const [showEmoji, setShowEmoji] = useState(false);
  const showEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };
  const editor = useEditor({
    extensions: [
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "h-[20px] w-[20px]",
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "h-[300px] max-h-[300px] ring-0 outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none px-2 py-2 overflow-y-scroll",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div className="relative bg-white px-0 pb-0 pt-0 sm:p-0 sm:pb-0 w-full">
      <div className="sm:flex sm:items-start flex-col">
        <ToolBar editor={editor} showEmojiPicker={showEmojiPicker} />
        <EditorContent
          editor={editor}
          className={`w-full border rounded-b-md `}
          style={{
            borderColor: themes.primaryColor,
            backgroundColor: themes.body,
          }}
        />
      </div>
      {showEmoji && (
        <div className="shadow-xl absolute top-9 right-0">
          <EmojiPicker
            disableAutoFocus={true}
            height={"280px"}
            width={"250px"}
            skinTonesDisabled={true}
            searchDisabled={true}
            onEmojiClick={(event, emojiObject) => {
              //append emoji to the editor
              console.log(emojiObject.target.src);
              console.log(emojiObject.target.alt);
              // editor.commands.insertContent(
              //   `<img src="${emojiObject.target.src}" alt="${emojiObject.target.alt}" />`
              // );
              editor
                .chain()
                .focus()
                .setImage({
                  src: emojiObject.target.src,
                  alt: emojiObject.target.alt,
                })
                .run();

              setShowEmoji(false);
            }}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}
