"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { Play, Info } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { LangToggle } from "@/components/ui/LangToggle";
import HowToPlayModal from "./HowToPlayModal";

export default function SplashScreen() {
    const router = useRouter();
    const { startNewGame } = useGameStore();
    const [stampActive, setStampActive] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    const { t, lang } = useTranslation();
    const { splash } = t;

    useEffect(() => {
        const timer = setTimeout(() => setStampActive(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleStart = async () => {
        await startNewGame();
        router.push("/game");
    };

    const TICKER_ITEMS = splash.tickerItems;

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

            {/* Solid black dimming overlay */}
            <div className="fixed inset-0 z-[1] pointer-events-none bg-black/60" />

            {/* Gradient */}
            <div className="fixed inset-0 z-[2] pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.75) 100%)",
                }}
            />

            {/* Dark-matter texture */}
            <div className="fixed inset-0 z-[3] bg-[url('/textures/dark-matter.png')] opacity-10 pointer-events-none" />

            {/* ── TOP TICKER BAR ──────────────────────────────── */}
            <header className="relative z-30 w-full overflow-hidden bg-[#0c0804]/90 border-b-2 border-saffron/60 py-[6px] shadow-[0_2px_12px_rgba(255,107,0,0.2)]">
                <div className="flex items-center">
                    <span className={`shrink-0 bg-danger-red text-white font-barlow font-black uppercase tracking-[0.2em] px-3 py-[3.5px] z-10 ${lang === 'ml' ? 'text-[10px]' : 'text-[11px]'}`}>
                        {splash.breaking}
                    </span>
                    {/* Chevron tail */}
                    <span className="shrink-0 relative w-3 h-full z-10">
                        <span className="absolute inset-y-0 left-0 w-3 bg-danger-red [clip-path:polygon(0_0,100%_0,0_100%)]" />
                    </span>
                    <div className="overflow-hidden flex-1">
                        <div className={`whitespace-nowrap animate-ticker inline-block text-white font-barlow font-black uppercase tracking-[0.18em] pl-4 ${lang === 'ml' ? 'text-[10px]' : 'text-[11px]'}`}>
                            {TICKER_ITEMS.map((item, i) => (
                                <span key={i}>&nbsp;★&nbsp;{item}</span>
                            ))}
                            {TICKER_ITEMS.map((item, i) => (
                                <span key={`d${i}`}>&nbsp;★&nbsp;{item}</span>
                            ))}
                        </div>
                    </div>
                    <LangToggle className="mr-2 ml-1" />
                </div>
            </header>

            {/* ── MAIN CONTENT ──────────────── */}
            <main className="relative z-10 flex flex-col items-center flex-1 px-6 pt-16 pb-6 md:pt-10 md:pb-10 justify-between">

                {/* ─── TITLE BLOCK ─── */}
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
                            className={`inline-block ${lang === 'ml' ? 'mb-1 scale-90' : 'mb-[-8px]'}`}
                        >
                            <div className="exposed-stamp">{splash.exposed}</div>
                        </motion.div>
                    )}

                    <h1
                        className={`font-bebas ${lang === 'ml' ? 'leading-[0.95] tracking-[-0.02em] mb-4' : 'leading-[0.9] tracking-tight'}`}
                        style={{
                            fontSize: lang === 'ml' ? "clamp(2.8rem, 11vw, 5.8rem)" : "clamp(4rem, 14vw, 8rem)",
                            color: "#FF6B00",
                            fontWeight: lang === 'ml' ? 800 : 'normal',
                            textShadow: "0 3px 0 #7a3000, 0 0 50px rgba(255,107,0,0.55), 3px 3px 12px rgba(0,0,0,1), -1px -1px 0 rgba(0,0,0,0.8)",
                        }}
                    >
                        {splash.title_line1}<br />{splash.title_line2}
                    </h1>

                    {/* Classified badge row */}
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <div className="h-px flex-1 bg-saffron/30" />
                        <span
                            className={`font-barlow font-black uppercase px-3 py-1 border border-saffron/30 ${lang === 'ml' ? 'text-[9px] tracking-normal' : 'text-[10px] tracking-[0.3em]'}`}
                            style={{ color: "#d4a96a", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
                        >
                            {splash.classified_badge}
                        </span>
                        <div className="h-px flex-1 bg-saffron/30" />
                    </div>
                </motion.div>

                {/* ─── GRAPHIC AREA ─── */}
                <div className="flex-1 flex items-center justify-center min-h-[100px] md:min-h-0">
                </div>

                {/* ─── BOTTOM SECTION ─── */}
                <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.55 }}
                    className="w-full max-w-md flex flex-col gap-2 md:gap-3"
                >
                    {/* Classified divider */}
                    <div className="flex items-center gap-3 mb-1">
                        <div className="flex-1 h-px bg-saffron/25" />
                        <span
                            className="font-barlow font-black text-[9px] uppercase tracking-[0.35em] px-2"
                            style={{ color: "rgba(255,180,80,0.55)" }}
                        >
                            ⬛ {t.common.classified} ⬛
                        </span>
                        <div className="flex-1 h-px bg-saffron/25" />
                    </div>

                    {/* Sub-copy */}
                    <p
                        className={`font-special-elite text-center mb-2 px-6 ${lang === 'ml' ? 'leading-[1.7] tracking-normal' : 'leading-relaxed'}`}
                        style={{
                            color: "#F5E6C8",
                            fontWeight: lang === 'ml' ? 800 : 400,
                            textShadow: "0 1px 8px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)",
                            fontSize: lang === 'ml' ? "clamp(1.05rem, 3.8vw, 1.25rem)" : "clamp(0.95rem, 3.5vw, 1.1rem)",
                        }}
                    >
                        {splash.description_line1}
                        <br />{splash.description_line2}
                    </p>

                    {/* Game metadata badge */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {[splash.badge_rounds, splash.badge_defectors, splash.badge_classified].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span
                                    className={`font-barlow font-black uppercase ${lang === 'ml' ? 'text-[8.5px] tracking-normal' : 'text-[10px] tracking-widest'}`}
                                    style={{ color: "rgba(245,230,200,0.5)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                                >
                                    {item}
                                </span>
                                {i < 2 && <span className={lang === 'ml' ? 'translate-y-[1px]' : ''} style={{ color: "rgba(255,107,0,0.35)", fontSize: "0.5rem" }}>◆</span>}
                            </span>
                        ))}
                    </div>

                    {/* BEGIN MISSION */}
                    <motion.button
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.97, y: 3 }}
                        onClick={handleStart}
                        className={`w-full bg-saffron text-near-black py-4 font-barlow font-black flex items-center justify-center transition-all ${lang === 'ml' ? 'text-lg gap-2 py-3' : 'text-2xl uppercase tracking-wider gap-3'}`}
                        style={{
                            boxShadow: "0 5px 0 0 #7a3000, inset 0 1px 0 rgba(255,200,120,0.35)",
                        }}
                    >
                        <Play fill="currentColor" size={22} className={lang === 'ml' ? 'shrink-0' : ''} />
                        {splash.begin_mission}
                    </motion.button>

                    {/* HOW TO PLAY */}
                    <button
                        onClick={() => setShowHowToPlay(true)}
                        className="w-full font-barlow font-black text-sm uppercase tracking-[0.22em] py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-100 cursor-pointer"
                        style={{
                            color: "rgba(255,180,80,0.55)",
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            textDecorationColor: "rgba(255,180,80,0.25)",
                        }}
                    >
                        <Info size={14} />
                        {splash.how_to_play}
                    </button>

                    {/* Footer tagline */}
                    <p
                        className={`font-special-elite text-center mt-3 ${lang === 'ml' ? 'leading-[1.6] tracking-normal mb-6' : 'leading-relaxed mb-0'}`}
                        style={{
                            color: "#F5E6C8",
                            fontWeight: lang === 'ml' ? 800 : 400,
                            textShadow: "0 1px 10px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.85)",
                            fontSize: lang === 'ml' ? "clamp(1.1rem, 3.5vw, 1.35rem)" : "clamp(0.85rem, 3vw, 1rem)",
                            letterSpacing: lang === 'ml' ? "normal" : "0.18em",
                        }}
                    >
                        &ldquo;{splash.tagline_line1}<br />{splash.tagline_line2}&rdquo;
                        <span className="blink-cursor ml-1">▌</span>
                    </p>
                </motion.div>
            </main>

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
