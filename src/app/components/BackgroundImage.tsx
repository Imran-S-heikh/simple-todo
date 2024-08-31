"use client";

import Image from "next/image";
import darkImage from "@/assets/images/bg-desktop-dark.jpg";
import lightImage from "@/assets/images/bg-desktop-light.jpg";
import { useTheme } from "next-themes";

function BackgroundImage() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="absolute w-full">
      <Image
        src={resolvedTheme === "dark" ? darkImage : lightImage}
        width={1400}
        height={900}
        className="w-full sm:min-h-0 min-h-[30vh] object-cover"
        alt="Backgournd Image"
      />
    </div>
  );
}

export default BackgroundImage;
