"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { Play, Info } from "lucide-react";
import Image from "next/image";

const TICKER_ITEMS = [
    "SECRET ADVISOR PACT REVEALED",
    "UNPUBLISHED DEFECTION LISTS SPOTTED",
    "INSIDER ALLIANCE DETECTED",
    "CLASSIFIED DOCUMENTS LEAKED TO INTELLIGENCE",
    "60+ CONGRESS MEMBERS CROSSED THE FLOOR",
    "THE DEAL NOBODY IN POWER TALKS ABOUT",
    "SILENT CROSSOVERS SHAKE THE OPPOSITION",
    "WHISTLEBLOWER EXPOSES SILENT TRANSFERS",
];

export default function SplashScreen() {
    const router = useRouter();
    const { startNewGame } = useGameStore();
    const [stampActive, setStampActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStampActive(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleStart = () => {
        startNewGame();
        router.push("/game");
    };

    return (
        <div className="relative min-h-dvh flex flex-col overflow-hidden splash-root">

            {/* Film grain noise overlay */}
            <div className="grain-overlay pointer-events-none" />

            {/* ── Background Images (responsive) ───────────── */}
            <div className="fixed inset-0 z-0 md:hidden">
                <Image src="/HomeBgMobile.webp" alt="" fill priority className="object-cover object-top" sizes="100vw" />
            </div>
            <div className="fixed inset-0 z-0 hidden md:block">
                <Image src="/HomeBgDesktop.webp" alt="" fill priority className="object-cover object-center" sizes="100vw" />
            </div>

            {/* Solid black dimming overlay — sits above bg image */}
            <div className="fixed inset-0 z-[1] pointer-events-none bg-black/60" />

            {/* Gradient: further darken top + bottom edges */}
            <div className="fixed inset-0 z-[2] pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.75) 100%)",
                }}
            />

            {/* Subtle dark-matter texture over everything */}
            <div className="fixed inset-0 z-[3] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none" />

            {/* ── TOP TICKER BAR ──────────────────────────────── */}
            <header className="relative z-30 w-full overflow-hidden bg-[#0c0804]/90 border-b-2 border-saffron/60 py-[6px] shadow-[0_2px_12px_rgba(255,107,0,0.2)]">
                <div className="flex items-center">
                    <span className="shrink-0 bg-danger-red text-white font-barlow font-black text-[11px] uppercase tracking-[0.2em] px-3 py-[3px] z-10">
                        BREAKING
                    </span>
                    {/* Chevron tail */}
                    <span className="shrink-0 relative w-3 h-full z-10">
                        <span className="absolute inset-y-0 left-0 w-3 bg-danger-red [clip-path:polygon(0_0,100%_0,0_100%)]" />
                    </span>
                    <div className="overflow-hidden flex-1">
                        <div className="whitespace-nowrap animate-ticker inline-block text-white text-[11px] font-barlow font-black uppercase tracking-[0.18em] pl-4">
                            {TICKER_ITEMS.map((item, i) => (
                                <span key={i}>&nbsp;★&nbsp;{item}</span>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {TICKER_ITEMS.map((item, i) => (
                                <span key={`d${i}`}>&nbsp;★&nbsp;{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT (flex, top-to-bottom) ──────────── */}
            <main className="relative z-10 flex flex-col items-center flex-1 px-6 pt-16 pb-6 md:pt-10 md:pb-10 justify-between">

                {/* ─── TITLE BLOCK — sits above the graphic ─── */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center w-full max-w-lg"
                >
                    {/* EXPOSED stamp */}
                    {stampActive && (
                        <motion.div
                            initial={{ scale: 3.5, opacity: 0, rotate: -30 }}
                            animate={{ scale: 1, opacity: 0.92, rotate: -14 }}
                            transition={{ type: "spring", stiffness: 280, damping: 18 }}
                            className="inline-block mb-[-8px]"
                        >
                            <div className="exposed-stamp">EXPOSED</div>
                        </motion.div>
                    )}

                    <h1
                        className="font-bebas leading-[0.9] tracking-tight"
                        style={{
                            fontSize: "clamp(4rem, 14vw, 8rem)",
                            color: "#FF6B00",
                            textShadow: "0 3px 0 #7a3000, 0 0 50px rgba(255,107,0,0.55), 3px 3px 12px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,0.8)",
                        }}
                    >
                        THE CONGRESS<br />BJP DEAL
                    </h1>

                    {/* Classified badge row */}
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <div className="h-px flex-1 bg-saffron/30" />
                        <span
                            className="font-barlow font-black text-[10px] uppercase tracking-[0.3em] px-3 py-1 border border-saffron/30"
                            style={{ color: "#d4a96a", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                        >
                            CLASSIFIED DOSSIER · INTERNAL USE ONLY
                        </span>
                        <div className="h-px flex-1 bg-saffron/30" />
                    </div>
                </motion.div>

                {/* ─── GRAPHIC AREA — let bg image breathe ─── */}
                <div className="flex-1 flex items-center justify-center min-h-[100px] md:min-h-0">
                    {/* Spacer that gives the central graphic room */}
                </div>

                {/* ─── BOTTOM SECTION — fine print + buttons ─── */}
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.55 }}
                    className="w-full max-w-md flex flex-col gap-2 md:gap-3"
                >
                    {/* Thin classified divider — bridges gap between graphic and copy */}
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex-1 h-px bg-saffron/25" />
                        <span
                            className="font-barlow font-black text-[9px] uppercase tracking-[0.35em] px-2"
                            style={{ color: "rgba(255,180,80,0.55)" }}
                        >
                            ⬛ CLASSIFIED ⬛
                        </span>
                        <div className="flex-1 h-px bg-saffron/25" />
                    </div>

                    {/* Sub-copy — cream, larger */}
                    <p
                        className="font-special-elite text-center mb-1"
                        style={{
                            color: "#F5E6C8",
                            textShadow: "0 1px 6px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.8)",
                            fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
                        }}
                    >
                        60+ Congress leaders crossed the floor.
                        <br />Can you identify them from classified intel?
                    </p>

                    {/* Game metadata badge */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {["10 ROUNDS", "60+ DEFECTORS", "CLASSIFIED"].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span
                                    className="font-barlow font-black text-[10px] uppercase tracking-widest"
                                    style={{ color: "rgba(245,230,200,0.5)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                                >
                                    {item}
                                </span>
                                {i < 2 && <span style={{ color: "rgba(255,107,0,0.35)", fontSize: "0.5rem" }}>◆</span>}
                            </span>
                        ))}
                    </div>

                    {/* BEGIN MISSION */}
                    <motion.button
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.97, y: 3 }}
                        onClick={handleStart}
                        className="w-full bg-saffron text-near-black py-4 font-barlow font-black text-2xl uppercase tracking-wider flex items-center justify-center gap-3 active:translate-y-1 transition-all"
                        style={{
                            boxShadow: "0 5px 0 0 #7a3000, inset 0 1px 0 rgba(255,200,120,0.35)",
                        }}
                    >
                        <Play fill="currentColor" size={22} />
                        Begin Mission
                    </motion.button>

                    {/* HOW TO PLAY — demoted to secondary text link */}
                    <button
                        className="w-full font-barlow font-black text-sm uppercase tracking-[0.22em] py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-100"
                        style={{
                            color: "rgba(255,180,80,0.55)",
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            textDecorationColor: "rgba(255,180,80,0.25)",
                        }}
                    >
                        <Info size={14} />
                        How to Play
                    </button>

                    {/* Footer tagline — promoted with blinking cursor */}
                    <p
                        className="font-special-elite text-center mt-1"
                        style={{
                            color: "#F5E6C8",
                            textShadow: "0 1px 6px rgba(0,0,0,0.95)",
                            fontSize: "clamp(0.85rem, 3vw, 1rem)",
                            letterSpacing: "0.18em",
                        }}
                    >
                        &ldquo;Congress Today. BJP Tomorrow.&rdquo;
                        <span className="blink-cursor">▌</span>
                    </p>
                </motion.div>
            </main>

            <style jsx global>{`
        /* ── Splash root bg — dark fallback ── */
        .splash-root {
          background-color: #0e0a06;
        }

        /* ── Film grain — defined globally in globals.css as grain-anim ── */
        .grain-overlay { opacity: 0.032; }

        /* ── News ticker ── */
        @keyframes ticker {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }

        /* ── EXPOSED stamp ── */
        .exposed-stamp {
          display: inline-block;
          border: 8px solid rgba(185, 28, 28, 0.88);
          color: rgba(185, 28, 28, 0.88);
          padding: 4px 24px 2px;
          font-size: 2.6rem;
          font-family: var(--font-special-elite);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          text-shadow: 0 2px 6px rgba(0,0,0,0.8);
          box-shadow: inset 0 0 20px rgba(185,28,28,0.08);
        }
        .exposed-stamp::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 3px,
            rgba(185,28,28,0.04) 3px,
            rgba(185,28,28,0.04) 4px
          );
          pointer-events: none;
        }

        /* ── Hide Next.js dev overlay ── */
        #__next-build-watcher,
        /* ── Blinking cursor ── */
        .blink-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1.1s step-end infinite;
          color: rgba(255, 107, 0, 0.7);
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Hide Next.js dev overlay ── */
        nextjs-portal {
          display: none !important;
        }
      `}</style>
        </div>
    );
}
