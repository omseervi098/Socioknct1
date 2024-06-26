import React, { useEffect } from "react";
import Link from "next/link";
import { useGeneralContext } from "@/context/generalcontext";
import { useAuthContext } from "@/context/authcontext";
import { useRouter } from "next/router";
import { OTPInput, SlotProps } from "input-otp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
export default function VerifyForm() {
  const { theme, themes, signupform, toggleTheme } = useGeneralContext();
  const { signup, sendOtp } = useAuthContext();
  const [form, setForm] = React.useState({
    name: signupform.name,
    email: signupform.email,
    password: signupform.password,
    otp: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (!signupform.email) {
      router.push("/signup");
    }
  }, []);
  const handleVerify = async (e) => {
    e.preventDefault();
    const check = form.otp.length === 6;
    if (!check) {
      return toast.error("Invalid OTP");
    }
    toast
      .promise(signup(form), {
        loading: "Verifying OTP...",
        success: "Account Verified",
        error: "Invalid OTP",
      })
      .then(() => router.push("/feed"))
      .catch((err) => {
        console.log(err);
      });
  };
  function Slot(props) {
    return (
      <div
        className={`"relative w-10 h-14 text-[2rem] flex items-center justify-center transition-all duration-300 border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20 outline outline-0 outline-accent-foreground/20 
          ${props.isActive && "outline-4 outline-accent-foreground"}
        `}
      >
        {props.char !== null && <div>{props.char}</div>}
        {props.hasFakeCaret && <FakeCaret />}
      </div>
    );
  }
  function FakeCaret() {
    return (
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
        <div className="w-px h-8 bg-white" />
      </div>
    );
  }
  function FakeDash() {
    return (
      <div className="flex w-10 justify-center items-center ">
        <div className="w-5 h-1 rounded-full bg-border bg-gray-400" />
      </div>
    );
  }
  return (
    <div className=" flex flex-col justify-center gap-2 py-0">
      <button
        style={{ maxWidth: "fit-content", color: themes.primaryColor }}
        className=" text-md ml-3 sm:ml-0 hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="text-center pt-4 space-y-1 pb-10">
        <h1 className="text-2xl font-bold pb-3">Verify your account</h1>
        <p className="text-sm" style={{ color: themes.secondaryText }}>
          Enter the OTP sent to your email
        </p>
        <p className="text-sm" style={{ color: themes.primaryColor }}>
          {form.email.substring(0, 3)}****
          {form.email.substring(7, form.email.length)}
        </p>
      </div>
      <form className="flex flex-col justify-center gap-2">
        <OTPInput
          maxLength={6}
          value={form.otp}
          onChange={(otp) => setForm({ ...form, otp })}
          containerClassName="group flex items-center justify-center has-[:disabled]:opacity-30 pb-4"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        <div className="text-center">
          <span className="text-sm" style={{ color: themes.secondaryText }}>
            Didn't receive the OTP?{" "}
          </span>
          <button
            className="text-sm"
            style={{ color: themes.primaryColor }}
            onClick={(e) => {
              e.preventDefault();
              toast
                .promise(sendOtp(form), {
                  loading: "Resending OTP...",
                  success: "OTP sent",
                  error: "wait before sending OTP",
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Resend OTP
          </button>
        </div>
        <button
          className="text-white p-2 rounded max-w-max mx-auto px-5"
          style={{
            background: themes.primaryColor,
          }}
          onClick={handleVerify}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
