"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import Image from "next/image";
import { Defector } from "@/data/defectors";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface Props {
    defector: Defector;
    pointsGained: number;
    totalScore: number;
    round: number;
    onNext: () => void;
    onEndGame?: () => void;
}

export default function DealConfirmedOverlay({ defector, pointsGained, totalScore, round, onNext, onEndGame }: Props) {
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
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
            style={{ background: "#131313" }}
        >
            {/* Background dossier papers image */}
            <div className="absolute inset-0 z-0">
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
            <header className="relative z-10 flex justify-between items-center px-6 h-16 bg-[#131313] border-b-4 border-congress-blue">
                <div className="flex items-center gap-3">
                    <Shield size={20} className="text-saffron" fill="#FF6B00" />
                    <h1 className="font-barlow font-black uppercase tracking-widest text-saffron text-lg">
                        INTEL RECOVERED
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bebas text-saffron italic tracking-wider">D.C.X</span>
                    <span className="text-saffron text-xl">💰</span>
                </div>
            </header>

            {/* Floating ₹ Coins */}
            {[
                { top: "20%", left: "8%", size: "w-12 h-12", rotate: "-rotate-12", blur: "blur-[1px]", text: "text-2xl" },
                { top: "30%", right: "8%", size: "w-10 h-10", rotate: "rotate-45", blur: "blur-[2px]", text: "text-xl" },
                { bottom: "25%", left: "12%", size: "w-14 h-14", rotate: "rotate-12", blur: "", text: "text-3xl" },
                { top: "60%", right: "12%", size: "w-11 h-11", rotate: "-rotate-45", blur: "blur-[0.5px]", text: "text-2xl" },
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
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 gap-6 overflow-y-auto">
                {/* Score Counter */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="bg-[#0e0e0e] px-4 py-1 border-2 border-saffron/30">
                        <span className="font-bebas text-saffron text-xl tracking-widest">+{pointsGained} POINTS</span>
                    </div>
                    <div className="flex gap-1">
                        {scoreDigits.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ rotateX: -90 }}
                                animate={{ rotateX: 0 }}
                                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 200 }}
                                className="bg-[#2a2a2a] px-3 py-1 font-bebas text-5xl text-white border-b-4 border-black"
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
                    className="relative w-full max-w-lg bg-[#F5E6C8] p-8 flex flex-col gap-3"
                    style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5), 8px 8px 0px 0px #1b1b1b" }}
                >
                    {/* Grainy paper */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />

                    <div className="text-center space-y-2 relative">
                        {/* Hindi heading */}
                        <h2 className="font-playfair text-[#131313] text-5xl font-bold">सही जवाब</h2>
                        <p className="font-barlow font-black text-congress-blue text-xl tracking-widest uppercase">
                            ROUND {round}: ALLIANCE CONFIRMED
                        </p>

                        <div className="my-4 border-y border-[#131313]/10 py-4 italic font-special-elite text-[#131313]/70 text-sm leading-relaxed">
                            "The asset has flipped. Intelligence confirms the defection. Deal is formalised."
                        </div>

                        {/* Defector revealed */}
                        <div className="flex gap-4 items-start bg-[#131313]/5 px-4 py-3 border-l-4 border-saffron text-left">
                            {defector.photo_url && (
                                <div className="relative bg-white p-1 pb-5 shadow-md transform rotate-1 flex-shrink-0 border border-black/10">
                                    <div className="relative w-20 h-20 overflow-hidden">
                                        <Image
                                            src={defector.photo_url}
                                            alt={defector.name}
                                            fill
                                            className="object-cover object-top"
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-special-elite text-[7px] text-zinc-400 whitespace-nowrap">
                                        ID CONFIRMED
                                    </div>
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="font-special-elite text-[10px] text-black/40 uppercase mb-1">Identity Confirmed:</div>
                                <div className="font-playfair font-black text-2xl text-[#131313] leading-tight">{defector.name}</div>
                                <div className="font-special-elite text-xs text-black/50 mt-1">
                                    {defector.position} · {defector.state} · {defector.year}
                                </div>
                                <div className="font-special-elite text-xs text-saffron mt-1">{defector.outcome}</div>
                            </div>
                        </div>

                        {/* DEAL CONFIRMED Rubber Stamp */}
                        <motion.div
                            initial={{ scale: 4, opacity: 0, rotate: -25 }}
                            animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 18 }}
                            className="absolute -top-2 left-1/2 -translate-x-1/2 pointer-events-none border-8 border-danger-red px-6 py-2 flex flex-col items-center justify-center bg-white/30"
                        >
                            <div className="font-yatra text-danger-red text-3xl leading-none uppercase">DEAL CONFIRMED</div>
                            <span className="text-danger-red text-4xl">✓</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col w-full max-w-lg gap-4 relative z-30">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        className="w-full bg-saffron text-near-black font-barlow font-black text-2xl py-4 uppercase tracking-wider shadow-xl active:scale-95 transition-transform"
                    >
                        Proceed to Extraction →
                    </motion.button>

                    {onEndGame && (
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={onEndGame}
                            className="w-full border-2 border-white/20 text-white/60 font-barlow font-black text-lg py-3 uppercase tracking-widest hover:bg-white/5 transition-colors"
                        >
                            End Mission Early
                        </motion.button>
                    )}
                </div>
            </main>
        </motion.div>
    );
}
