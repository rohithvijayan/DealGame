import type { Metadata, Viewport } from "next";
import { inter, specialElite, playfairDisplay, barlowCondensed, bebasNeue, yatraOne, notoSans, notoSansMalayalam, anekMalayalam } from "@/styles/fonts";
import "./globals.css";
import LangWatcher from "@/components/common/LangWatcher";

const BASE_URL = "https://thecongressbjpdeal.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "The Congress BJP Deal — Political Exposé Game",
    template: "%s | The Congress BJP Deal",
  },
  description: "Can you identify the Congress leaders who crossed the floor to join BJP? Play the political exposé quiz game — 10 rounds, real politicians, real deals.",
  keywords: ["Congress BJP defectors", "political quiz India", "BJP Congress crossover", "Indian politics game", "party defection India"],
  authors: [{ name: "The Congress BJP Deal" }],
  manifest: "/manifest.json",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "The Congress BJP Deal",
    title: "The Congress BJP Deal — Political Exposé Game",
    description: "Can you identify the Congress leaders who crossed the floor to join BJP? Play the political exposé quiz — 10 rounds, real politicians, real deals.",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Congress BJP Deal — Political Exposé Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Congress BJP Deal — Political Exposé Game",
    description: "Can you identify the Congress leaders who crossed the floor to join BJP? 10 rounds, real politicians, real deals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`
      ${inter.variable} 
      ${specialElite.variable} 
      ${playfairDisplay.variable} 
      ${barlowCondensed.variable} 
      ${bebasNeue.variable} 
      ${yatraOne.variable}
      ${notoSans.variable}
      ${notoSansMalayalam.variable}
      ${anekMalayalam.variable}
    `}>
      <body suppressHydrationWarning className="antialiased min-h-dvh flex flex-col font-noto overflow-x-hidden">
        <LangWatcher />
        {children}
      </body>
    </html>
  );
}
