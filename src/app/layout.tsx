import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import { Header } from "@/components/blocks/header/header";

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
  variable: "--font-brand",
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
      className="gutter-stable bg-background text-foreground"
    >
      <body className={`${fontPrimary.className} antialiased font-normal`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
