import React, {
  Fragment,
  createRef,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import InfoCard from "@/components/infoCard/infoCard";
import AddPost from "@/components/addPost/addPost";
import WeatherCard from "@/components/weatherCard/weatherCard";
import NewsCard from "@/components/newsCard/newsCard";
import { useGeneralContext } from "@/context/generalcontext";
import axios from "axios";
import Post from "@/components/post/Post";
import { usePostContext } from "@/context/postcontext";
import SuggestionsCard from "@/components/suggestionsCard/suggestionsCard";
import Footer from "@/components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Loader1 from "@/components/loader/loader1";
import PostSkeleton from "@/components/post/PostSkeleton";
import Loader2 from "@/components/loader/loader2";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteAlert from "@/components/modals/deleteAlert";
import MiniPost from "@/components/post/MiniPost";
import toast from "react-hot-toast";
export default function Feed() {
  const { auth, user } = useAuthContext();
  const { themes, deleteAlert, setDeleteAlert } = useGeneralContext();
  const { removeBookmark, getBookmarkedPosts } = usePostContext();
  const router = useRouter();
  const [bookMarkedPosts, setBookMarkedPosts] = useState([]);
  useEffect(() => {
    getBookmarkedPosts().then((res) => {
      setBookMarkedPosts(res);
    });
  }, []);

  if (!auth) {
    return null;
  }
  const handleDelete = (id) => {
    removeBookmark({ postId: id })
      .then((res) => {
        if (res) {
          setBookMarkedPosts(bookMarkedPosts.filter((post) => post._id !== id));
          toast.success("Post removed from bookmarks");
        }
      })
      .catch((err) => {
        toast.error("Error removing post from bookmarks");
      });
  };
  return (
    <div className="relative flex flex-row justify-between items-start w-full h-full md:mt-2 md:px-10 xl:px-20">
      <div className="h-full w-full md:w-2/3 py-2 rounded-lg lg:px-5">
        <div className="bg-white mb-2 mt-0 text-start md:mx-1 lg:mx-4 p-2 rounded-lg text-lg font-semibold">
          Saved Posts
        </div>

        <div className="flex flex-col gap-3 w-full">
          {bookMarkedPosts &&
            bookMarkedPosts.map((post, index) => {
              return (
                <MiniPost key={index} post={post} handleDelete={handleDelete} />
              );
            })}
        </div>
      </div>
      <div className="hidden relative  md:flex flex-col gap-3 md:w-1/3 px-5">
        <div className="" id="footerCard">
          <Footer />
        </div>
      </div>
      <button
        id="scrollToTop"
        className="hidden md:block fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => {
          //add smooth scroll
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <DeleteAlert
        text={deleteAlert.text}
        id={deleteAlert.id}
        open={deleteAlert.open}
        setOpen={setDeleteAlert}
        handleDelete={deleteAlert.handleDelete}
      />
    </div>
  );
}
