import { ReactElement, ReactNode } from "react";

interface Props {
  open: boolean | undefined | null | string;
  children: ReactNode;
  fallback?: ReactElement;
}

function Hide({ children, open, fallback }: Props) {
  if (open) {
    return children;
  } else if (fallback) {
    return fallback;
  }
  return null;
}

export default Hide;
