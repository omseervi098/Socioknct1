import React from "react";
import { themes } from "@/theme";
const SET_THEME = "SET_THEME";
const SET_WIDTH = "SET_WIDTH";
const SET_THEMES = "SET_THEMES";
export const GeneralContext = React.createContext();
const initialState = {
  theme: "light",
  width: 0,
  themes: themes["light"],
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_WIDTH:
      return { ...state, width: action.payload };
    case SET_THEMES:
      return { ...state, themes: action.payload };
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

    dispatch({ type: SET_WIDTH, payload: window.innerWidth });
    window.addEventListener("resize", () =>
      dispatch({ type: SET_WIDTH, payload: window.innerWidth })
    );
  }, []);
  return (
    <GeneralContext.Provider value={{ state, toggleTheme }}>
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
