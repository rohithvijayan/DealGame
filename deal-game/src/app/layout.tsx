import type { Metadata, Viewport } from "next";
import { inter, specialElite, playfairDisplay, barlowCondensed, bebasNeue, yatraOne, notoSans, notoSansMalayalam, anekMalayalam } from "@/styles/fonts";
import "./globals.css";
import LangWatcher from "@/components/common/LangWatcher";

export const metadata: Metadata = {
  title: "The Congress BJP Deal",
  description: "A Political Expose Mobile Game",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FF6B00",
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
