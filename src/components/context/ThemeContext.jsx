"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const value = localStorage.getItem("theme");
      return value || "light";
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error.message);
  }
  return "light";
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return getFromLocalStorage();
    } catch (error) {
      console.error("Error initializing theme:", error.message);
      return "light";
    }
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("theme", theme);
      }
    } catch (error) {
      // console.error("Error updating localStorage:", error.message);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
