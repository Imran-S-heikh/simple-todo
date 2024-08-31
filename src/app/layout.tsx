import type { Metadata } from "next";
import { Josefin_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import RecoilProvider from "@/components/RecoilProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Simple Todo | Imran Shaikh",
  description:
    "A simple todo app with a clean, single-page interface to help you manage your tasks efficiently",
  manifest: "/manifest.json",
  keywords: [
    "imran shaikh",
    "javascript developer",
    "solana developer",
    "full stack developer",
    "web developer",
    "react",
    "nextjs",
    "typescript",
    "blockchain",
    "rust",
  ],
  creator: "Imran Shaikh",
  authors: [{ name: "Imran Shaikh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    countryName: "Bangladesh",
    description:
      "A simple todo app with a clean, single-page interface to help you manage your tasks efficiently",
    title: "Simple Todo | Imran Shaikh",
    alternateLocale: "bn_BD",
    siteName: "Simple Todo",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Imran_S_haikh",
    site: "@Imran_S_haikh",
    title: "Simple Todo | Imran Shaikh",
    description:
      "A simple todo app with a clean, single-page interface to help you manage your tasks efficiently",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RecoilProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
