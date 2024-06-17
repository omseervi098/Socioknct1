import React from "react";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { socket } from "@/utils/socket";
import { useGeneralContext } from "./generalcontext";
import Cookies from "js-cookie";
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
  const [notificationRoom, setNotificationRoom] = React.useState([]);
  const router = useRouter();
  React.useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      //wait for the socket to connect
      setTimeout(() => {
        joinRoom(`Notification-${user._id}`);
      }, 4000);
      localStorage.setItem("token", token);
      dispatch({ type: SET_USER, payload: user });
    } else {
      window.localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT });
    }
  }, []);
  // join Room
  const joinRoom = (room) => {
    //send api request to join room
    const url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/notification/join-room";
    axios
      .post(
        url,
        { roomName: room },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        //so now
        console.log(res.data.data);
        if (!notificationRoom.includes(res.data.data.name)) {
          socket.emit("join_room", res.data.data.name);

          setNotificationRoom([...notificationRoom, res.data.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      Cookies.set("token", token, { expires: form.rememberMe ? 7 : 1 });
      joinRoom(`Notification-${user._id}`);
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message);
      } else {
        throw new Error("Network Error");
      }
    }
  };
  //updateAvatar
  const updateUserData = async (form) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/v1/user" +
        "/" +
        form?.username;
      const response = await axios.put(
        url,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { user } = response.data;
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
      Cookies.set("token", token, { expires: 1 });
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
    Cookies.remove("token");
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
      Cookies.set("token", token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SET_USER, payload: user });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
        googleLogin,
        sendOtp,
        updateUserData,
      }}
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
