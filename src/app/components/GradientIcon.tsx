import IconCheck from "@/assets/icons/IconCheck";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ClassNameValue } from "tailwind-merge";

function GradientIcon({
  className,
  childClass,
  active,
  onClick,
}: {
  className?: ClassNameValue;
  childClass?: ClassNameValue;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-7 h-7 hover:bg-gradient-to-br relative from-skyblue group to-lightpurple rounded-full mx-5 my-auto",
        active && "bg-gradient-to-br",
        className
      )}
    >
      <span
        className={cn(
          "h-full w-full border-2 rounded-full flex justify-center items-center transition-all duration-150 bg-clip-padding group-hover:border-transparent bg-card",
          active && "border-transparent bg-transparent duration-150",
          childClass
        )}
      >
        <IconCheck className={cn("opacity-0", active && "opacity-100")} />
      </span>
    </button>
  );
}

export default GradientIcon;
