import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Settings() {
  const { auth } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    //check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <h1>Settings</h1>
    </div>
  );
}
