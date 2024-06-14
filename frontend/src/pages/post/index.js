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
import PostPage from "@/components/post/PostPage";

export default function Page() {
  const router = useRouter();
  return <PostPage id={router.query.id} />;
}
