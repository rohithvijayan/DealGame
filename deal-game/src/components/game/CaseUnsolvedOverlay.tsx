"use client";

import { motion } from "framer-motion";
import { Shield, SkipForward } from "lucide-react";
import Image from "next/image";
import { Defector } from "@/data/defectors";

interface Props {
    defector: Defector;
    score: number;
    round: number;
    onNext: () => void;
    onEndGame?: () => void;
}

export default function CaseUnsolvedOverlay({ defector, score, round, onNext, onEndGame }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#131313]"
        >
            {/* Background — desaturated hatching */}
            <div className="fixed inset-0 z-0 opacity-15" style={{ filter: "grayscale(1) contrast(1.2) brightness(0.4)" }}>
                <div
                    className="w-full h-full"
                    style={{
                        background: "repeating-linear-gradient(-45deg, #252525 0px, #252525 2px, #131313 2px, #131313 14px)",
                    }}
                />
            </div>
            {/* Grey vignette */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ background: "radial-gradient(circle, transparent 20%, rgba(40,40,40,0.6) 100%)" }}
            />
            {/* Grainy overlay */}
            <div
                className="fixed inset-0 z-0 opacity-[0.07] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top AppBar */}
            <header className="relative z-10 flex justify-between items-center w-full px-4 h-14 bg-[#131313]">
                <div className="flex items-center gap-2">
                    <Shield size={18} className="text-mid-grey" />
                    <h1 className="font-barlow font-black tracking-widest uppercase text-mid-grey text-lg">
                        DOSSIER: CASE SKIPPED
                    </h1>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-end">
                        <span className="font-barlow text-[10px] leading-none opacity-60 uppercase">Score</span>
                        <span className="font-bebas text-xl leading-none text-saffron">{score.toLocaleString()}</span>
                    </div>
                    <div className="h-8 w-px bg-mid-grey/30" />
                    <div className="flex flex-col items-end">
                        <SkipForward size={14} className="text-mid-grey ml-auto" />
                        <span className="font-bebas text-xl leading-none text-mid-grey">ROUND {round}</span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-mid-grey/30 h-1 w-full" />
            </header>

            {/* Main */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-4 gap-4">
                <motion.div
                    initial={{ y: 30, opacity: 0, rotate: -4 }}
                    animate={{ y: 0, opacity: 1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="relative w-full max-w-md bg-[#F5E6C8] shadow-2xl"
                    style={{
                        boxShadow: "4px 4px 0 rgba(0,0,0,0.5), 8px 8px 0 #1b1b1b",
                        filter: "grayscale(0.35) brightness(0.95)",
                    }}
                >
                    {/* Paper noise */}
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />
                    {/* Coffee stains */}
                    <div className="absolute top-10 left-6 w-20 h-20 rounded-full opacity-10 blur-3xl bg-[#4a3728]" />
                    <div className="absolute bottom-12 right-4 w-24 h-24 rounded-full opacity-5 blur-2xl bg-[#5d4037]" />
                    {/* Hole punches */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-12">
                        <div className="w-4 h-4 rounded-full bg-[#131313]/20 border border-[#131313]/10 shadow-inner" />
                        <div className="w-4 h-4 rounded-full bg-[#131313]/20 border border-[#131313]/10 shadow-inner" />
                    </div>
                    {/* Fold line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#131313]/5" />

                    {/* Content */}
                    <div className="relative h-full p-8 pl-10 flex flex-col items-center text-[#131313] gap-4">
                        {/* Label */}
                        <div className="self-start font-barlow text-xs tracking-widest opacity-40 uppercase">
                            CLASSIFIED // EYES ONLY
                        </div>

                        {/* Photo zone — REVEALED in greyscale */}
                        <div className="relative w-40 h-48 bg-[#131313]/10 border-4 border-white/80 shadow-md -rotate-1 flex-shrink-0 overflow-hidden">
                            {defector.photo_url ? (
                                <Image
                                    src={defector.photo_url}
                                    alt={defector.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="160px"
                                    style={{ filter: "grayscale(1) brightness(0.7) contrast(1.1)" }}
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex items-center justify-center"
                                    style={{ background: "linear-gradient(160deg, #4a4a4a 0%, #1e1e1e 100%)", filter: "brightness(0.6)" }}
                                >
                                    <div className="text-white/20 text-center">
                                        <div className="text-5xl">👤</div>
                                        <div className="font-special-elite text-[9px] text-white/30 mt-1">FILE CLOSED</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CASE CLOSED Stamp */}
                        <motion.div
                            initial={{ scale: 4, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 0.85, rotate: -12 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 15 }}
                            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-mid-grey px-4 py-1 bg-white/10"
                        >
                            <span className="font-yatra text-mid-grey text-5xl uppercase leading-none block whitespace-nowrap">CASE CLOSED</span>
                        </motion.div>

                        {/* Defector Revealed */}
                        <div className="w-full bg-[#131313]/8 border-l-4 border-mid-grey px-4 py-3 mt-2">
                            <div className="font-special-elite text-[9px] text-black/40 uppercase mb-1">
                                Identity Was:
                            </div>
                            <div className="font-playfair font-black text-xl text-[#131313]">{defector.name}</div>
                            <div className="font-special-elite text-[10px] text-black/50 mt-0.5">
                                {defector.position} · {defector.state} · {defector.year}
                            </div>
                            <div className="font-special-elite text-[10px] text-mid-grey mt-1 leading-tight">
                                {defector.outcome}
                            </div>
                        </div>

                        {/* Intel fields — blank since skipped */}
                        <div className="w-full space-y-3">
                            {["POSITION:", "STATE:", "YEAR OF DEAL:"].map((label) => (
                                <div key={label} className="flex items-end gap-3">
                                    <span className="font-special-elite text-xs font-bold w-24 flex-shrink-0 opacity-40">{label}</span>
                                    <div className="flex-1 border-b border-dotted border-[#131313]/20 h-5 relative">
                                        {/* half-redacted */}
                                        <div className="absolute bottom-1 left-0 h-3 w-1/2 bg-[#131313] opacity-50 rounded-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message */}
                        <div className="text-center mt-1">
                            <p className="font-special-elite text-mid-grey text-sm tracking-tight">
                                ASSET WENT DARK. MOVING TO NEXT TARGET.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer Controls */}
            <footer className="relative z-10 bg-[#131313] px-6 pb-8 pt-4 border-t border-white/5">
                <div className="max-w-md mx-auto flex flex-col gap-3">
                    <button
                        disabled
                        className="w-full py-3 bg-[#353535] text-white/20 font-barlow font-black text-xl tracking-widest uppercase flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                        🔒 CONFIRM DEAL
                    </button>
                    <motion.button
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onNext}
                        className="w-full py-4 bg-mid-grey/20 text-[#e5e2e1] border-2 border-mid-grey/40 font-barlow font-black text-2xl tracking-widest uppercase flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                        <SkipForward size={20} /> NEXT DOSSIER
                    </motion.button>
                </div>
            </footer>
        </motion.div>
    );
}
