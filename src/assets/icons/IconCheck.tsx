import { cn } from "@/lib/utils";
import React from "react";

function IconCheck({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg className={cn("fill-white", className)} width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
}

export default IconCheck;
