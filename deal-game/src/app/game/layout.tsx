import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play — Identify the Defectors",
  description: "10 rounds of real Congress-to-BJP political crossovers. Can you name every defector from the clues?",
  alternates: {
    canonical: "https://thecongressbjpdeal.com/game",
  },
};

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
