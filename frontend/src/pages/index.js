import { useAuthContext } from "@/context/authcontext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { auth } = useAuthContext();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      {auth === false && (
        <div className="flex gap-3 items-center">
          <Link href="/login">
            {" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login{" "}
            </button>
          </Link>

          <Link href="/signup">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Signup{" "}
            </button>
          </Link>
        </div>
      )}
      {auth === true && (
        <div className="flex flex-col items-center gap-5">LANDING PAGE</div>
      )}
    </div>
  );
}
