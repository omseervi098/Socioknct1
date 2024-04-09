import React, { useEffect } from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "@/context/authcontext";
import { toast } from "react-hot-toast";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/validations/validations";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
export default function SignupForm() {
  const { state, toggleTheme } = useGeneralContext();
  const { signup, googleLogin, sendOtp } = useAuthContext();
  const { theme, themes } = state;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const check = localStorage.getItem("signup");
    if (check) {
      const data = JSON.parse(check);
      setForm({
        name: data.name,
        email: data.email,
      });
    }
  }, []);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const check = await validateEmail(form.email);
    // const check1 = await validatePassword(form.password);
    const check2 = await validateName(form.name);
    if (!check) {
      return toast.error("Invalid email");
    }
    // if (!check1) {
    //   return toast.error("Invalid password");
    // }

    if (!check2) {
      return toast.error("Invalid name");
    }
    localStorage.setItem("signup", JSON.stringify(form));
    toast.promise(sendOtp(form), {
      loading: "Sending OTP...",
      success: "OTP sent",
      error: "Failed to send OTP",
    });

    router.push("/verify");
  };
  const handleGoogleLogin = (response) => {
    toast
      .promise(googleLogin(response), {
        loading: "Logging in...",
        success: "Login successful",
        error: "Login failed",
      })
      .then(() => router.push("/feed"));
  };
  return (
    <div className=" flex flex-col items-center justify-center gap-2">
      <div className="text-center">
        <h1 className="text-2xl font-bold pt-2">Create Your Account</h1>
        <p className="text-sm pt-1" style={{ color: themes.secondaryText }}>
          sign up to your account
        </p>
      </div>
      <div className="py-3 pb-0">
        <GoogleLogin
          onSuccess={(response) => {
            console.log(response);
            handleGoogleLogin(response);
          }}
          onError={(error) => {
            toast.error("Login Failed");
          }}
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID}
          useOneTap
        />
      </div>
      <div className="inline-flex items-center justify-center w-full relative">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0" />
        <span className="absolute px-3 text-gray-900 text-sm  bg-white  ">
          or continue with
        </span>
      </div>
      <form className="w-full flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            id="name"
            className="w-full rounded-lg p-2 border border-gray-300  peer"
            placeholder=" "
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label
            htmlFor="name"
            style={{ color: themes.secondaryText }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg p-2 border border-gray-300  peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            style={{ color: themes.secondaryText }}
            className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="w-full rounded-lg p-2 border border-gray-300  peer"
            placeholder=" "
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
          <button
            type="button"
            className="absolute top-0 end-0 p-3.5"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {!passwordVisible ? (
              <svg
                className="flex-shrink-0 text-gray-400 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
                />
                <path
                  className="hidden hs-password-active:block"
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                />
                <path
                  className="hidden hs-password-active:block"
                  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                />
              </svg>
            ) : (
              <svg
                className="flex-shrink-0 text-gray-400 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
            )}
          </button>
          <label
            htmlFor="password"
            style={{ color: themes.secondaryText }}
            className="absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>
        <p className="text-xs" style={{ color: themes.secondaryText }}>
          By signing up you agree to our{" "}
          <span style={{ color: themes.primaryColor }}>Terms of Service</span>{" "}
          and <span style={{ color: themes.primaryColor }}>Privacy policy</span>{" "}
          and confirm that you are at least 18 years old
        </p>
        <button
          className="text-white p-2 rounded"
          style={{
            background: themes.primaryColor,
          }}
          onClick={handleSignup}
        >
          NEXT
        </button>
      </form>
    </div>
  );
}
