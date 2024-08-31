"use client";

import IconCircleHalf from "@/assets/icons/IconCircleHalf";
import IconMoon from "@/assets/icons/IconMoon";
import IconSun from "@/assets/icons/IconSun";
import Hide from "@/components/Hide";
import useIsMounted from "@/hooks/useIsMounted";
import { useTheme } from "next-themes";
import React from "react";

function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const isLight = theme === "light";
  const isMounted = useIsMounted();

  function toggleTheme() {
    setTheme(isDark ? "light" : isLight ? "system" : "dark");
  }

  if (!isMounted) return null;

  return (
    <button onClick={toggleTheme} className="active:opacity-50 group">
      <Hide open={theme === "dark"}>
        <IconMoon className="" />
      </Hide>
      <Hide open={theme === "light"}>
        <IconSun />
      </Hide>
      <Hide open={theme === "system"}>
        <IconCircleHalf className="fill-white h-6 w-6" />
      </Hide>
    </button>
  );
}

export default ThemeSwitch;
