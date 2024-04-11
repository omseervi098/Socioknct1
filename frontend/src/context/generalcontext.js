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
  weather: null,
  news: [],
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
  const setLocation = (data) => {
    if (data.lat && data.lon) {
      getWeatherByCoords(data.lat, data.lon);
    } else {
      getWeatherByCity(data.city);
    }
    dispatch({ type: SET_LOCATION, payload: data });
  };
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/weather/get";
      const res = await axios.post(url, {
        lat,
        lon,
      });
      const data = res.data;
      localStorage.setItem("weather", JSON.stringify(data));
      dispatch({ type: SET_WEATHER, payload: data });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getWeatherByCity = async (city) => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/weather/get";
      const res = await axios.post(url, {
        city,
      });
      const data = res.data;
      localStorage.setItem("weather", JSON.stringify(data));
      dispatch({ type: SET_WEATHER, payload: data });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getNews = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/news";
      const res = await axios.get(url);
      const data = res.data;
      console.log(data);
      dispatch({ type: SET_NEWS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
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
    console.log(state.location);
    dispatch({ type: SET_WIDTH, payload: window.innerWidth });
    window.addEventListener("resize", () =>
      dispatch({ type: SET_WIDTH, payload: window.innerWidth })
    );
    if (localStorage.getItem("weather")) {
      console.log("getting weather from local storage");
      dispatch({
        type: SET_WEATHER,
        payload: JSON.parse(localStorage.getItem("weather")),
      });
    } else {
      console.log("sending request to get weather");
      if (state.location.lat == 0 && state.location.lon == 0)
        getWeatherByCity(state.location.city);
      else getWeatherByCoords(state.location.lat, state.location.lon);
    }

    getNews();
  }, []);
  const setSignup = (data) => {
    dispatch({ type: SET_SIGNUP, payload: data });
  };
  return (
    <GeneralContext.Provider
      value={{
        state,
        toggleTheme,
        setSignup,
        setLocation,
        getWeatherByCity,
        getWeatherByCoords,
        getNews,
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
