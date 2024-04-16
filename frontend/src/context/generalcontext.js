import React from "react";
import { themes } from "@/theme";
import axios from "axios";
const SET_THEME = "SET_THEME";
const SET_WIDTH = "SET_WIDTH";
const SET_THEMES = "SET_THEMES";
const SET_SIGNUP = "SET_SIGNUP";
const SET_LOCATION = "SET_LOCATION";
const SET_WEATHER = "SET_WEATHER";
const SET_NEWS = "SET_NEWS";
const SET_LOADING = "SET_LOADING";
const SET_TOUCH = "SET_TOUCH";
export const GeneralContext = React.createContext();
const initialState = {
  theme: "light",
  width: 0,
  themes: themes["light"],
  signupform: {
    name: "",
    email: "",
    password: "",
  },
  location: {
    city: "Thane",
    country: "",
    lat: 0,
    lon: 0,
  },
  loading: false,
  weather: null,
  news: null,
  touch: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_WIDTH:
      return { ...state, width: action.payload };
    case SET_THEMES:
      return { ...state, themes: action.payload };
    case SET_SIGNUP:
      return { ...state, signupform: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_NEWS:
      return { ...state, news: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_TOUCH:
      return { ...state, touch: action.payload };
    default:
      return state;
  }
};
export const GeneralProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    if (document !== undefined) {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    dispatch({ type: SET_THEME, payload: newTheme });
    dispatch({ type: SET_THEMES, payload: themes[newTheme] });
  };
  const toggleLoading = () => {
    dispatch({ type: SET_LOADING, payload: !state.loading });
  };
  const setLocation = (data) => {
    getWeather(data);
    dispatch({ type: SET_LOCATION, payload: data });
  };
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/weather/get";
      const res = await axios.post(
        url,
        {
          lat,
          lon,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      dispatch({ type: SET_WEATHER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  const getWeatherByCity = async (city) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/weather/get";
      const res = await axios.post(
        url,
        {
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      dispatch({ type: SET_WEATHER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  const getWeather = async (data) => {
    if (data.lat == 0 && data.lon == 0) getWeatherByCity(data.city);
    else getWeatherByCoords(data.lat, data.lon);
  };
  const getNews = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/news";
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data;
      dispatch({ type: SET_NEWS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches;
  }
  React.useEffect(() => {
    // Get the theme from local storage
    if (localStorage.getItem("theme")) {
      dispatch({ type: SET_THEME, payload: localStorage.getItem("theme") });
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
      dispatch({
        type: SET_THEMES,
        payload: themes[localStorage.getItem("theme")],
      });
    }
    // Get the width of the window
    dispatch({ type: SET_WIDTH, payload: window.innerWidth });
    window.addEventListener("resize", () =>
      dispatch({ type: SET_WIDTH, payload: window.innerWidth })
    );
    //check if the user is using a touch device
    if (isTouchDevice()) {
      dispatch({ type: SET_TOUCH, payload: true });
    } else {
      dispatch({ type: SET_TOUCH, payload: false });
    }
  }, []);
  const setSignup = (data) => {
    dispatch({ type: SET_SIGNUP, payload: data });
  };
  return (
    <GeneralContext.Provider
      value={{
        ...state,
        toggleTheme,
        setSignup,
        setLocation,
        getWeatherByCity,
        getWeatherByCoords,
        getNews,
        getWeather,
        toggleLoading,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
export const useGeneralContext = () => {
  const context = React.useContext(GeneralContext);
  if (!context) {
    console.error("useGeneralContext must be used within a GeneralProvider");
  }
  return context;
};
