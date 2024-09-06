"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/ThemeProvider";
import RecoilProvider from "@/components/RecoilProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Fragment, Suspense } from "react";

const App = dynamic(() => import("./components/App"), { ssr: false });

function Home() {
  return (
    <Fragment>
      <RecoilProvider>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <App />
          </ThemeProvider>
        </TooltipProvider>
      </RecoilProvider>
      <Toaster />
    </Fragment>
  );
}

export default Home;
