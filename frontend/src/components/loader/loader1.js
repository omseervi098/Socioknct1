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
      className={`h-screen flex gap-2 flex-col items-center justify-center ${poppins.className}`}
    >
      <div class="flex items-center justify-center">
        <div class="relative">
          <div class="h-20 w-20 flex items-center justify-center rounded-full border-t-8 border-b-8 border-gray-200">
            <Image
              src="/logo2.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full animate-pulse"
            />
          </div>

          <div class="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        </div>
      </div>
      <div className="logo flex items-center justify-center animate-pulse duration-1000">
        <div className="text-2xl  text-blue-600 flex items-center justify-center">
          &nbsp;Socioknct
        </div>
      </div>
    </div>
  );
}
