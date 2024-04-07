import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-3 items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/login">Login</Link>
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/signup">Signup</Link>
        </button>
      </div>
    </div>
  );
}
