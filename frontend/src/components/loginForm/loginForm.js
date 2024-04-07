import React from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import { Switch } from "@headlessui/react";
import { themes } from "@/theme";
export default function LoginForm() {
  const { state, toggleTheme } = useGeneralContext();
  const { theme, themes } = state;
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p>Login to your account</p>
      {/* Google Login Button */}
      <div class="inline-flex items-center justify-center w-full relative">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span class="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
          or continue with
        </span>
      </div>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-2"
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Switch
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className={`${rememberMe ? "bg-blue-500" : "bg-gray-200"}
          relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${rememberMe ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            &nbsp;
            <span
              className=""
              style={{
                color: themes.secondaryText,
              }}
            >
              Remember me
            </span>
          </div>
          <Link
            href="/forgotpassword"
            className=" text-sm"
            style={{ color: themes.warningColor }}
          >
            Forgot password?
          </Link>
        </div>
        <button
          className="text-white p-2 rounded"
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
