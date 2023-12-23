"use client";

import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const  ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
    className="cursor-pointer px-7  "
      onClick={toggle}
    >
<div >

      {theme === "dark" ? 
<HiSun className="text-4xl "           />
      : 
<HiMoon className="text-4xl "           />      
    }
    </div>
    </div>
  );
};

export default ThemeToggle;
