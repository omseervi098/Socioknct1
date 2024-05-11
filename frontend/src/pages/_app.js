"use client";
import "react-h5-audio-player/lib/styles.css";
import "@/styles/globals.css";
import React, { useEffect } from "react";
import { Poppins } from "next/font/google";
import { GeneralProvider } from "@/context/generalcontext";
import Navbar from "@/components/navbar/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar1 from "@/components/navbar/navbar1";
import { AuthProvider } from "@/context/authcontext";
import { Toaster } from "react-hot-toast";
import { PostProvider } from "@/context/postcontext";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});
import { pdfjs } from "react-pdf";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader1 from "@/components/loader/loader1";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();
  }, []);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    //check if user is logged in and check prev path
    if (router.pathname === "/feed" || router.pathname === "/") {
      if (localStorage.getItem("user")) {
        router.push("/feed");
      } else {
        router.push("/"); //redirect to landing page
      }
    }
    if (localStorage.getItem("user")) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
    return () => {
      setLoading(false);
    };
  }, []);
  if (loading) {
    return <Loader1 />;
  }
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}>
      <GeneralProvider>
        <AuthProvider>
          <PostProvider>
            <div className={`bg-gray h-screen ${poppins.className} `}>
              <div className="hidden md:block fixed z-50 top-0 w-full ">
                <Navbar />
              </div>
              <div className="md:hidden">
                <div className="fixed top-0 w-full z-50">
                  <Navbar1 />
                </div>
              </div>
              <div className="pt-[60px] md:pb-10 pb-[80px]">
                <Component {...pageProps} />
              </div>
              <div className="md:hidden">
                <div className="fixed bottom-0 w-full z-50">
                  <Navbar />
                </div>
              </div>
            </div>
            <Toaster position="bottom-left" />
          </PostProvider>
        </AuthProvider>
      </GeneralProvider>
    </GoogleOAuthProvider>
  );
}
