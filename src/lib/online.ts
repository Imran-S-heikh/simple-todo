import { toast } from "@/hooks/use-toast";

export function withOnline(cb: () => void) {
  return () => {
    if (navigator.onLine) {
      cb();
    } else {
      toast({
        title: "No internet connection",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };
}
