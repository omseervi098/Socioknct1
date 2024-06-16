import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
export default function ThreeImage(props) {
  console.log(props);
  return (
    <div className="grid grid-cols-3 max-h-[450px] w-full min-h-[250px]">
      <button className="max-h-[450px] col-span-2">
        <div className="relative h-full" onClick={props.handleOpen}>
          <Image
            src={props.images[0]}
            width={500}
            alt="post-image"
            height={500}
            className="rounded-l-lg object-cover aspect-w-1 aspect-h-1 h-full filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
          />
        </div>
      </button>
      <div className="grid grid-rows-2 col-span-1 max-h-[450px]">
        <button className="h-full" onClick={props.handleOpen}>
          <div className="relative h-full">
            <Image
              src={props.images[1]}
              width={300}
              height={400}
              alt="post-image"
              className=" object-cover  h-full rounded-r-lg filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
              style={{
                borderBottomRightRadius: "0",
              }}
            />
          </div>
        </button>
        <button className="h-full" onClick={props.handleOpen}>
          <div className="relative h-full">
            <Image
              src={props.images[2]}
              width={300}
              alt="post-image"
              height={400}
              className="rounded-r-lg object-cover h-full n filter-none hover:filter  blur-xs brightness-75 transition-all duration-500 ease-in-out"
              style={{
                borderTopRightRadius: "0",
              }}
            />
            {props.images.length > 3 && (
              <div
                className="h-full w-full absolute bottom-0 right-0 bg-black bg-opacity-50 text-white rounded-r-lg flex justify-center items-center hover:bg-opacity-75 transition-all duration-500 ease-in-out"
                style={{ borderTopRightRadius: "0" }}
              >
                <p>+{props.images.length - 3}&nbsp;more</p>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
