import { cn } from "@/lib/utils";

function IconCircleHalf({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={cn(className)}
    >
      <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
    </svg>
  );
}

export default IconCircleHalf;
