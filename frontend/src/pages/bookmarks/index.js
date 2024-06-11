import React, { createRef, use, useCallback, useEffect } from "react";
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
import { socket } from "@/utils/socket";
export default function Feed() {
  const { auth, user } = useAuthContext();
  const { deleteAlert, setDeleteAlert } = useGeneralContext();
  const {
    posts,
    toggleLikeClient,
    addCommentClient,
    editCommentClient,
    deleteCommentClient,
    addReplyClient,
    editReplyClient,
    deleteReplyClient,
    setPosts,
    getBookmarkedPosts,
  } = usePostContext();
  const router = useRouter();

  useEffect(() => {
    getBookmarkedPosts();

    return () => {
      setPosts([]);
    };
  }, []);
  useEffect(() => {
    // window.onscroll = function () {
    //   console.log(window.scrollY);
    //   const suggestionsCard = document.getElementById("suggestionsCard");
    //   const newsCard = document.getElementById("newsCard");
    //   if (!suggestionsCard || !newsCard) return;
    //   const suggestionsCardWidth = suggestionsCard.offsetWidth;
    //   const newsCardWidth = newsCard.offsetWidth;
    //   if (window.scrollY > 1000) {
    //     suggestionsCard.style.position = "fixed";
    //     suggestionsCard.style.width = `${suggestionsCardWidth}px`;
    //     newsCard.style.position = "fixed";
    //     newsCard.style.width = `${newsCardWidth}px`;
    //   } else if (window.scrollY < 1000) {
    //     suggestionsCard.style.position = "sticky";
    //     suggestionsCard.style.width = "100%";
    //     newsCard.style.position = "sticky";
    //     newsCard.style.width = "100%";
    //   }
    // };
    // socket.on("user:liked", (data) => {
    //   toggleLikeClient(data);
    // });
    // socket.on("user:comment", (data) => {
    //   const { comment, type } = data;
    //   console.log(comment, type);
    //   if (type === "new") {
    //     addCommentClient(comment);
    //   } else if (type === "edit") {
    //     editCommentClient(comment);
    //   } else if (type === "delete") {
    //     deleteCommentClient(comment);
    //   }
    // });
    // socket.on("user:reply", (data) => {
    //   const { reply, type } = data;
    //   console.log(reply, type);
    //   if (type === "new") {
    //     addReplyClient(reply);
    //   } else if (type === "edit") {
    //     editReplyClient(reply);
    //   } else if (type === "delete") {
    //     deleteReplyClient(reply);
    //   }
    // });
    // return () => {
    //   socket.off("user:liked");
    //   socket.off("user:comment");
    //   socket.off("user:reply");
    //   window.onscroll = function () {};
    // };
  }, [posts]);
  if (!auth) {
    return null;
  }

  return (
    <div className="relative flex flex-row justify-between items-start w-full h-full md:mt-5 md:px-10 xl:px-16">
      {/* <div className="fixed left-0 w-full z-10 flex items-center justify-center top-20 transform -translate-y-1/2">
        <button className="bg-blue-500 text-sm text-white p-1 px-4 rounded-full shadow-lg">
          New Posts
        </button>
      </div> */}
      <div
        className={`hidden relative h-[2000px] m-0 p-0 md:flex flex-col w-1/3 lg:w-1/4 xl:w-1/5`}
      >
        <div className=" mb-3 m-0 p-0">
          <InfoCard />
        </div>
      </div>
      <div className="h-full w-full md:w-2/3 lg:w-1/2 px-1 md:px-4">
        <div className="mb-4 hidden md:block">
          <AddPost />
        </div>
        <hr className="hidden sm:block border-1 border-gray-400 mx-4" />

        <div className="flex flex-col gap-3 w-full md:pt-4">
          {posts &&
            posts.map((post, index) => {
              return <Post key={index} post={post} />;
            })}
        </div>
      </div>
      <div className="hidden relative h-[2500px] lg:flex flex-col gap-3 lg:w-1/4 xl:w-1/4 px-0">
        <div className="" id="newsCard">
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
