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
  display: "swap",
});
import { pdfjs } from "react-pdf";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.js",
      import.meta.url
    ).toString();
  }, []);
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
                <div className="fixed top-0 w-full z-0">
                  <Navbar1 />
                </div>
              </div>
              <div className="pt-[60px] md:pb-0 pb-[60px]">
                <Component {...pageProps} />
              </div>
              <div className="md:hidden">
                <div className="fixed bottom-0 w-full">
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
