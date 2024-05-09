import Image from "next/image";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "auto",
});

export default function Loader1() {
  return (
    <div
      className={`h-screen flex gap-2 flex-col items-center justify-between ${poppins.className}`}
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <Image
          src="/logo2.png"
          alt="logo"
          width={30}
          height={30}
          className="rounded-full  animate-ping "
        />{" "}
        <div className="logo mt-7 flex items-center justify-center duration-1000">
          <div className="text-2xl  font-semibold text-blue-600 flex items-center justify-center">
            Socioknct
          </div>
        </div>
      </div>

      <div className="text-sm pb-2 text-blue-600 ">
        Made with ❤️ by Omprakash
      </div>
    </div>
  );
}
