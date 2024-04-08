import React from "react";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
const SET_USER = "SET_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_AUTH = "SET_AUTH";
export const AuthContext = React.createContext();
const initialState = {
  user: null,
  token: null,
  auth: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_AUTH:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decode and verify token if necessary
      // For simplicity, we assume the token is valid here
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_TOKEN, payload: token });
      dispatch({ type: SET_AUTH, payload: true });
    }
  }, []);
  // Login Function
  const login = async (email, password) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/login";
      const response = await axios.post(url, { email, password });
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
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
      dispatch({ type: SET_AUTH, payload: true });
      dispatch({ type: SET_TOKEN, payload: token });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    googleLogout();
    dispatch({ type: SET_USER, payload: null });
    dispatch({ type: SET_TOKEN, payload: null });
    dispatch({ type: SET_AUTH, payload: false });
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
      value={{ ...state, login, logout, signup, googleLogin }}
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
