import React from "react";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useGeneralContext } from "./generalcontext";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
export const AuthContext = React.createContext();

const initialState = {
  user: null,
  auth: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        auth: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        auth: false,
      };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: SET_USER, payload: user });
    } else {
      window.localStorage.removeItem("user");
      dispatch({ type: LOGOUT });
    }
  }, []);
  // Login Function
  const login = async (form) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/login";
      const response = await axios.post(url, { ...form });
      const { token, user } = response.data;
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  //signup function
  const signup = async (form) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/register";
      console.log(form, url);
      const response = await axios.post(url, { ...form });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  //otp verification
  const sendOtp = async (user) => {
    try {
      console.log(user.email, user);
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/otp/send-otp";
      const response = await axios.post(url, {
        email: user.email,
        name: user.name,
      });
      const { otp } = response.data;
      console.log(otp);
      return otp;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    googleLogout();
    dispatch({ type: LOGOUT });
  };
  //google login
  const googleLogin = async (props) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/google/auth";
      const response = await axios.post(url, props);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, signup, googleLogin, sendOtp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
