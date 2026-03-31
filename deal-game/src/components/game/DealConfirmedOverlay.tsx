"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import Image from "next/image";
import type { DefectorDisplay } from "@/types/game";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    defector: any; // Accept both Defector and DefectorDisplay to circumvent TS cache/conflicts
    revealedName: string;
    pointsGained: number;
    totalScore: number;
    round: number;
    onNext: () => void;
    onEndGame?: () => void;
}

export default function DealConfirmedOverlay({ defector, revealedName, pointsGained, totalScore, round, onNext, onEndGame }: Props) {
    const { t, lang } = useTranslation();
    const launched = useRef(false);

    useEffect(() => {
        if (launched.current) return;
        launched.current = true;
        // Burst confetti in saffron, white, green
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.3 }, colors: ["#FF6B00", "#FFFFFF", "#1A237E", "#FFD600"] });
        setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.5, x: 0.2 }, colors: ["#FF6B00", "#FFD600", "#FFFFFF"] }), 300);
        setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.5, x: 0.8 }, colors: ["#FF6B00", "#FFD600", "#FFFFFF"] }), 500);
    }, []);

    const scoreDigits = String(totalScore).padStart(4, "0").split("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[#131313] overscroll-none"
        >
            {/* Background dossier papers image */}
            <div className="fixed inset-0 z-0 bg-[#0e0e0e]">
                <div
                    className="w-full h-full"
                    style={{
                        background: "linear-gradient(135deg, #1b1b1b 0%, #0e0e0e 50%, #1b1b1b 100%)",
                    }}
                />
                {/* Success green vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle, transparent 20%, rgba(46,125,50,0.35) 100%)",
                    }}
                />
                {/* Grainy overlay */}
                <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Top App Bar */}
            <header className="relative z-10 flex justify-between items-center px-4 sm:px-6 h-14 sm:h-16 bg-[#131313] border-b-4 border-congress-blue shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 max-w-[65%]">
                    <Shield size={20} className="text-saffron shrink-0" fill="#FF6B00" />
                    <h1 className={`font-barlow font-black uppercase tracking-widest text-saffron ${lang === 'ml' ? 'text-[10px] leading-tight' : 'text-sm sm:text-lg'}`}>
                        {t.dealConfirmed.deal_discovered}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bebas text-saffron italic tracking-wider">D.C.X</span>
                    <span className="text-saffron text-lg sm:text-xl">💰</span>
                </div>
            </header>

            {/* Floating ₹ Coins */}
            {[
                { top: "20%", left: "8%", size: "w-10 h-10 sm:w-12 sm:h-12", rotate: "-rotate-12", blur: "blur-[1px]", text: "text-xl sm:text-2xl" },
                { top: "30%", right: "8%", size: "w-8 h-8 sm:w-10 sm:h-10", rotate: "rotate-45", blur: "blur-[2px]", text: "text-lg sm:text-xl" },
                { bottom: "25%", left: "12%", size: "w-12 h-12 sm:w-14 sm:h-14", rotate: "rotate-12", blur: "", text: "text-2xl sm:text-3xl" },
                { top: "60%", right: "12%", size: "w-9 h-9 sm:w-11 sm:h-11", rotate: "-rotate-45", blur: "blur-[0.5px]", text: "text-xl sm:text-2xl" },
            ].map((coin, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0, rotate: 0 }}
                    animate={{ y: [0, -8, 0], opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute pointer-events-none z-20 ${coin.blur}`}
                    style={{ top: coin.top, bottom: coin.bottom, left: coin.left, right: coin.right }}
                >
                    <div
                        className={`${coin.size} ${coin.rotate} rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-200`}
                        style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)" }}
                    >
                        <span className={`font-bebas text-yellow-900 ${coin.text}`}>₹</span>
                    </div>
                </motion.div>
            ))}

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-6 sm:py-8 gap-4 sm:gap-6">
                {/* Score Counter */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col items-center gap-1 sm:gap-2"
                >
                    <div className="bg-[#0e0e0e] px-3 sm:px-4 py-0.5 sm:py-1 border-2 border-saffron/30">
                        <span className="font-bebas text-saffron text-lg sm:text-xl tracking-widest">{t.dealConfirmed.points(pointsGained)}</span>
                    </div>
                    <div className="flex gap-1">
                        {scoreDigits.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ rotateX: -90 }}
                                animate={{ rotateX: 0 }}
                                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 200 }}
                                className="bg-[#2a2a2a] px-2 sm:px-3 py-0.5 sm:py-1 font-bebas text-3xl sm:text-5xl text-white border-b-2 sm:border-b-4 border-black"
                            >
                                {d}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Dossier Card */}
                <motion.div
                    initial={{ y: 40, opacity: 0, rotate: 3 }}
                    animate={{ y: 0, opacity: 1, rotate: -1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
                    className="relative w-full max-w-[280px] sm:max-w-lg bg-[#F5E6C8] p-4 sm:p-8 flex flex-col gap-2 sm:gap-3"
                    style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5), 8px 8px 0px 0px #1b1b1b" }}
                >
                    {/* Grainy paper */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <div className="text-center space-y-1 sm:space-y-2 relative">
                        {/* Heading */}
                        <h2 className={`font-playfair text-[#131313] font-bold ${lang === 'ml' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'}`}>{t.dealConfirmed.correct_answer}</h2>
                        <p className={`font-barlow font-black text-congress-blue tracking-widest uppercase ${lang === 'ml' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                            {t.dealConfirmed.round_confirmed(round)}
                        </p>

                        <div className="my-2 sm:my-4 border-y border-[#131313]/10 py-2 sm:py-4 italic font-special-elite text-[#131313]/70 text-[11px] sm:text-sm leading-relaxed">
                            {t.dealConfirmed.asset_flipped}
                        </div>

                        {/* Defector revealed */}
                        <div className="flex gap-3 sm:gap-4 items-start bg-[#131313]/5 px-3 sm:px-4 py-2 sm:py-3 border-l-4 border-saffron text-left">
                            {defector.photo_url && (
                                <div className="relative bg-white p-1 pb-4 sm:pb-5 shadow-md transform rotate-1 flex-shrink-0 border border-black/10">
                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                                        <Image
                                            src={defector.photo_url}
                                            alt={revealedName}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 640px) 64px, 80px"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-special-elite text-[6px] sm:text-[7px] text-zinc-400 whitespace-nowrap">
                                        {t.dealConfirmed.id_confirmed}
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="font-special-elite text-[8px] sm:text-[10px] text-black/40 uppercase mb-0.5 sm:mb-1">{t.dealConfirmed.identity_confirmed}</div>
                                <div className={`font-playfair font-black text-[#131313] leading-tight ${lang === 'ml' ? 'text-lg sm:text-2xl' : 'text-xl sm:text-2xl'}`}>{revealedName}</div>
                                <div className="font-special-elite text-[10px] sm:text-xs text-black/50 mt-0.5">
                                    {defector.position} · {defector.state} · {defector.year}
                                </div>
                                <div className="font-special-elite text-[10px] sm:text-xs text-saffron mt-0.5">{defector.outcome}</div>
                            </div>
                        </div>

                        {/* DEAL CONFIRMED Rubber Stamp */}
                        <motion.div
                            initial={{ scale: 4, opacity: 0, rotate: -25 }}
                            animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 18 }}
                            className="absolute -top-1 sm:-top-2 left-1/2 -translate-x-1/2 pointer-events-none border-4 sm:border-8 border-danger-red px-4 sm:px-6 py-1 sm:py-2 flex flex-col items-center justify-center bg-white/40 shadow-xl z-30"
                        >
                            <div className={`font-yatra text-danger-red leading-none uppercase ${lang === 'ml' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>{t.dealConfirmed.deal_confirmed}</div>
                            <span className="text-danger-red text-2xl sm:text-4xl">✓</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col w-full max-w-[280px] sm:max-w-lg gap-2 sm:gap-4 relative z-30">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        className={`w-full bg-saffron text-near-black font-barlow font-black uppercase tracking-wider shadow-xl active:scale-95 transition-transform ${lang === 'ml' ? 'text-lg sm:text-xl py-2.5 sm:py-3' : 'text-xl sm:text-2xl py-3 sm:py-4'}`}
                    >
                        {t.dealConfirmed.proceed}
                    </motion.button>

                    {onEndGame && (
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={onEndGame}
                            className="w-full border-2 border-white/20 text-white/60 font-barlow font-black text-base sm:text-lg py-2 sm:py-3 uppercase tracking-widest hover:bg-white/5 transition-colors"
                        >
                            {t.common.end_mission_early}
                        </motion.button>
                    )}
                </div>
            </main>
        </motion.div>
    );
}
