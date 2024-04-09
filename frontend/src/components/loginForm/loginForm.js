import React, { useEffect } from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import { Switch } from "@headlessui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "@/context/authcontext";
import { toast } from "react-hot-toast";
import { validateEmail, validatePassword } from "@/validations/validations";
import { useRouter } from "next/router";
export default function LoginForm() {
  const { state, toggleTheme } = useGeneralContext();
  const { login, googleLogin } = useAuthContext();
  const { theme, themes } = state;
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const check = validateEmail(form.email);
      if (!check) {
        return toast.error("Email is required");
      }
      if (!form.password.trim()) {
        return toast.error("Password is required");
      }
      const resp = await login(form);
      console.log(resp);
      await toast.success("Logged in successfully");
      await router.push("/feed");
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  };
  const handleGoogleLogin = async (response) => {
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
        <h1 className="text-2xl font-bold pt-2">Welcome back</h1>
        <p className="text-sm" style={{ color: themes.secondaryText }}>
          Log in to your account
        </p>
      </div>
      {/* Google Login Button */}
      <div className="py-6 pb-0">
        <GoogleLogin
          onSuccess={(response) => {
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
            type="email"
            id="email"
            className="w-full rounded-lg p-2 border border-gray-300  peer"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Switch
              checked={form.rememberMe}
              onChange={() =>
                setForm({ ...form, rememberMe: !form.rememberMe })
              }
              className={`${form.rememberMe ? "bg-blue-500" : "bg-gray-200"}
          relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  form.rememberMe ? "translate-x-4" : "translate-x-0"
                }
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            &nbsp;
            <span
              className="text-xs"
              style={{
                color: themes.secondaryText,
              }}
            >
              Remember me
            </span>
          </div>
          <Link
            href="/forgotpassword"
            className=" text-xs"
            style={{ color: themes.warningColor }}
          >
            Forgot password?
          </Link>
        </div>
        <button
          className="text-white p-2 rounded"
          onClick={handleLogin}
          style={{
            background: themes.primaryColor,
          }}
        >
          LOG IN
        </button>
      </form>
    </div>
  );
}
