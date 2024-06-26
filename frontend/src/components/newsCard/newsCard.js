import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGeneralContext } from "@/context/generalcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faDotCircle,
  faListDots,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
export default function NewsCard() {
  const { news } = useGeneralContext();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg p-3 shadow-lg">
      <div className="flex justify-between w-full">
        <div className="font-semibold">News</div>
        <FontAwesomeIcon icon={faNewspaper} />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full pt-3 gap-2 px-2">
        {news &&
          news.map((article, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-full h-full relative 
              ${
                index === news.length - 1
                  ? ""
                  : "border-b-2 border-slate-300 pb-1"
              }
                hover:text-blue-400 transition duration-300 ease-in-out `}
            >
              <div className="flex items-center justify-center w-full ">
                <FontAwesomeIcon icon={faCircle} className="mr-2 h-2" />
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="max-h-[51px] text-xs overflow-hidden font-semibold"
                >
                  {article.title}
                </Link>
              </div>
            </div>
          ))}
        {!news && (
          <div className="rounded-md max-w-sm w-full mx-auto p-1">
            <div className="animate-pulse flex space-x-4 pb-2 border-b-2 border-slate-300">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse flex space-x-4 py-2 border-b-2 border-slate-300">
              <div className="flex-1 space-y-6 py-1 ">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                  </div>
                  <div className="h-2 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse flex space-x-4 py-2 border-b-2 border-slate-300">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                  </div>
                  <div className="h-2 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse flex space-x-4 py-2 border-b-2 border-slate-300">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
