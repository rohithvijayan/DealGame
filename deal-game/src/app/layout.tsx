import type { Metadata } from "next";
import { inter, specialElite, playfairDisplay, barlowCondensed, bebasNeue, yatraOne, notoSans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Congress BJP Deal",
  description: "A Political Expose Mobile Game",
  manifest: "/manifest.json",
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
    `}>
      <body suppressHydrationWarning className="antialiased min-h-dvh flex flex-col font-noto overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
