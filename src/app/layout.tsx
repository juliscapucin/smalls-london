import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import Navbar from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "London.Smalls",
  description:
    "An opinionated directory of creative small businesses in London.",
};

const fontPrimary = localFont({
  variable: "--font-pp-frama",
  src: [
    {
      path: "../../public/fonts/PPFrama-Black.otf",
      weight: "900",
    },
    {
      path: "../../public/fonts/PPFrama-Regular.otf",
      weight: "400",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-primary text-secondary gutter-stable"
    >
      <body
        className={`${fontPrimary.className} antialiased font-normal gutter-stable`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
