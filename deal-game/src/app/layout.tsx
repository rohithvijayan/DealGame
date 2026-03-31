import type { Metadata, Viewport } from "next";
import { inter, specialElite, playfairDisplay, barlowCondensed, bebasNeue, yatraOne, notoSans, notoSansMalayalam, anekMalayalam } from "@/styles/fonts";
import "./globals.css";
import LangWatcher from "@/components/common/LangWatcher";
import Script from 'next/script';
import { headers } from 'next/headers';

const BASE_URL = "https://dealers.cjp.info";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? '';

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
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1283860547013976');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1283860547013976&ev=PageView&noscript=1"
            alt="fb-pixel-noscript"
          />
        </noscript>
      </head>
      <body suppressHydrationWarning className="antialiased min-h-dvh flex flex-col font-noto overflow-x-hidden">
        <LangWatcher />{children}
      </body>
    </html>
  );
}

