import InfoCard from "@/components/infoCard/infoCard";
import Post from "@/components/post/Post";
import PostSkeleton from "@/components/post/PostSkeleton";
import { useAuthContext } from "@/context/authcontext";
import { useGeneralContext } from "@/context/generalcontext";
import { usePostContext } from "@/context/postcontext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import InfoCardSkeleton from "@/components/infoCard/infoCardSkeleton";
import InfoCard1 from "@/components/infoCard/infoCard1";
import Footer from "@/components/footer/footer";
import { socket } from "@/utils/socket";
import DeleteAlert from "@/components/modals/deleteAlert";
export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookie = context.req.cookies.token;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      }
    );
    return {
      props: {
        initialPost: res.data.post,
      },
    };
  } catch (err) {
    console.log("error");
    return {
      props: {
        initialPost: null,
      },
    };
  }
}
export default function Page({ initialPost }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { deleteAlert, setDeleteAlert } = useGeneralContext();
  const { id } = router.query;
  const {
    posts,
    getPost,
    setPosts,
    toggleLikeClient,
    addCommentClient,
    editCommentClient,
    deleteCommentClient,
    addReplyClient,
    editReplyClient,
    deleteReplyClient,
  } = usePostContext();
  const [post, setPost] = useState(initialPost);
  if (localStorage.getItem("token") === null) {
    router.push("/login");
  }
  useEffect(() => {
    async function fetchData() {
      const resp = await getPost(id);
      setPost(resp);
      setPosts([resp]);
    }
    console.log("fetching", posts, post);
    fetchData();
    return () => {
      setPost(null);
      setPosts([]);
    };
  }, []);
  useEffect(() => {
    console.log("post", posts);
    //update post
    setPost(posts[0]);
    socket.on("user:liked", (data) => {
      //dont update for useriteself
      // if (data.liked.user._id === user._id || data.liked.user === user._id)
      //   return;
      toggleLikeClient(data);
    });
    socket.on("user:comment", (data) => {
      const { comment, type } = data;
      console.log(comment, type);
      if (type === "new") {
        addCommentClient(comment);
      } else if (type === "edit") {
        editCommentClient(comment);
      } else if (type === "delete") {
        deleteCommentClient(comment);
      }
    });
    socket.on("user:reply", (data) => {
      const { reply, type } = data;
      console.log(reply, type);
      if (type === "new") {
        addReplyClient(reply);
      } else if (type === "edit") {
        editReplyClient(reply);
      } else if (type === "delete") {
        deleteReplyClient(reply);
      }
    });
    return () => {
      socket.off("user:liked");
      socket.off("user:comment");
      socket.off("user:reply");
    };
  }, [post, posts, initialPost]);
  if (router.isFallback || !post || !posts.length || !user) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-start w-full h-full md:space-x-4 md:mt-5 md:px-10 xl:px-24 gap-4 md:gap-0">
        <div className="px-2 sm:px-3 md:px-0 block w-full md:w-1/3 lg:w-1/4">
          <InfoCardSkeleton />
        </div>
        <div className="px-2 md:px-0 w-full md:w-2/3">
          <PostSkeleton one={true} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-start w-full h-full md:space-x-4 md:mt-5 md:px-10 xl:px-24 gap-4 md:gap-0">
      <div className="px-2 sm:px-3 md:px-0 block w-full md:w-1/3 lg:w-1/4">
        {user._id === post.user._id ? (
          <div className="hidden md:block">
            <InfoCard />
          </div>
        ) : (
          <InfoCard1 user={post.user} />
        )}
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>

      <div className="px-2 md:px-0 w-full md:w-2/3">
        <Post post={post} full={true} />
      </div>
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
export const dynamic = "force-dynamic";
