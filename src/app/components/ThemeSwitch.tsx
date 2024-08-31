"use client";

import IconMoon from "@/assets/icons/IconMoon";
import IconSun from "@/assets/icons/IconSun";
import Hide from "@/components/Hide";
import useIsMounted from "@/hooks/useIsMounted";
import { useTheme } from "next-themes";
import React from "react";

function ThemeSwitch() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const isMounted = useIsMounted();

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  if (!isMounted) return null;

  return (
    <button onClick={toggleTheme} className="active:opacity-50 group">
      <Hide open={theme === "dark"} fallback={<IconSun />}>
        <IconMoon className="" />
      </Hide>
    </button>
  );
}

export default ThemeSwitch;
