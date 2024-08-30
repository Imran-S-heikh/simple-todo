"use client";

import IconMoon from "@/assets/icons/IconMoon";
import IconSun from "@/assets/icons/IconSun";
import Hide from "@/components/Hide";
import { useTheme } from "next-themes";
import React from "react";

function ThemeSwitch() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button onClick={toggleTheme} className="active:opacity-50 group">
      <Hide open={theme === "dark"} fallback={<IconSun />}>
        <IconMoon className="" />
      </Hide>
    </button>
  );
}

export default ThemeSwitch;
