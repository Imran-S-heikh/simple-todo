import { cn } from "@/lib/utils";
import React from "react";

function IconCross({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" className={cn(className)}>
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
}

export default IconCross;
