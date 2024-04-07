import "@/styles/globals.css";
import React from "react";
import { Poppins } from "next/font/google";
import { GeneralProvider } from "@/context/generalcontext";
import { useGeneralContext } from "@/context/generalcontext";
import Navbar from "@/components/navbar/navbar";
import Navbar1 from "@/components/navbar/navbar1";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <div className={`bg-gray h-screen ${poppins.className} `}>
        <div className="hidden md:block fixed z-50 top-0 w-full ">
          <Navbar />
        </div>
        <div className="md:hidden">
          <div className="fixed top-0 w-full z-50">
            <Navbar1 />
          </div>
        </div>
        <div className="pt-20">
          <Component {...pageProps} />
        </div>
        <div className="md:hidden">
          <div className="fixed bottom-0 w-full">
            <Navbar />
          </div>
        </div>
      </div>
    </GeneralProvider>
  );
}
