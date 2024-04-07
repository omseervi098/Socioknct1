import "@/styles/globals.css";
import React from "react";
import { GeneralProvider } from "@/context/generalcontext";
import Navbar from "@/components/navbar/navbar";
export default function App({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <div className="bg-gray h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </GeneralProvider>
  );
}
