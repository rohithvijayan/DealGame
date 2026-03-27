"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { RotateCcw, Share2, Handshake, Shield, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

// ── Verdict table ─────────────────────────────────────────────────────────────
interface Verdict { minScore: number; label: string; sub: string; quote: string; }
const VERDICTS: Verdict[] = [
    { minScore: 90, label: "VETERAN ANALYST", sub: "ELITE GRADE",  quote: "Elite grade. You have mapped the deep state." },
    { minScore: 60, label: "FIELD AGENT",     sub: "OPERATIVE",    quote: "Solid recon. Your political intel is sharp." },
    { minScore: 30, label: "TRAINEE",         sub: "IN TRAINING",  quote: "Good start, agent. There is more to uncover." },
    { minScore: 0,  label: "NEEDS CHAI",      sub: "RECRUIT",      quote: "Watch more news or join the next deal yourself." },
];

export default function ResultsScreen() {
    const router = useRouter();
    const { score, completedIds, skippedIds, reset } = useGameStore();
    const [stampActive,  setStampActive]  = useState(false);
    const [shareLabel,   setShareLabel]   = useState("SHARE RESULTS");

    const total        = 10;
    const correct      = completedIds.length;
    const skipped      = skippedIds.length;
    const pctExtracted = Math.round((correct / total) * 100);
    const verdict: Verdict = VERDICTS.find(v => score >= v.minScore) ?? VERDICTS[3];

    useEffect(() => {
        if (correct > 0) {
            confetti({ particleCount: 180, spread: 120, origin: { y: 0.35 }, colors: ["#FF6B00", "#ffffff", "#1A237E", "#FFD600"] });
            setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.5, x: 0.2 }, colors: ["#FF6B00", "#FFD600"] }), 400);
            setTimeout(() => confetti({ particleCount: 80, spread: 90, origin: { y: 0.5, x: 0.8 }, colors: ["#FF6B00", "#FFD600"] }), 700);
        }
        const t = setTimeout(() => setStampActive(true), 900);
        return () => clearTimeout(t);
    }, [correct]);

    const handleRestart = useCallback(() => { reset(); router.push("/"); }, [reset, router]);

    const handleShare = useCallback(async () => {
        const text = `I exposed ${correct}/${total} Congress-BJP defectors! Score: ${score}. Can you beat me?\n#TheDeal #CongressBJPDeal`;
        try {
            if (navigator.share) {
                await navigator.share({ title: "The Congress BJP Deal", text });
            } else {
                await navigator.clipboard.writeText(text);
                setShareLabel("COPIED!");
                setTimeout(() => setShareLabel("SHARE RESULTS"), 2200);
            }
        } catch { /* user dismissed */ }
    }, [correct, score]);

    return (
        <div className="min-h-dvh bg-[#0e0a06] flex flex-col overflow-x-hidden relative">

            {/* ── Grain + texture ─────────────────────── */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none
                bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            <div className="fixed inset-0 z-0 pointer-events-none grain-results-overlay" />

            {/* ── Newspaper collage fragments ─────────── */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] flex flex-wrap gap-6 p-10 items-start justify-center overflow-hidden">
                <div className="w-64 h-80 bg-aged-paper rotate-3 flex flex-col p-4 gap-2">
                    <div className="h-4 w-full bg-near-black/40" />
                    <div className="h-4 w-2/3 bg-near-black/30" />
                    <div className="flex-1 bg-near-black/10 mt-2" />
                </div>
                <div className="w-44 h-60 bg-aged-paper -rotate-6 flex flex-col p-3 gap-1">
                    {[1,2,3].map(i => <div key={i} className="h-2 w-full bg-near-black/25" />)}
                    <div className="flex-1 bg-near-black/8 mt-2" />
                </div>
                <div className="w-72 h-36 bg-aged-paper rotate-12" />
            </div>

            {/* ── App Bar ─────────────────────────────── */}
            <header className="fixed top-0 w-full z-50 bg-congress-blue flex justify-between items-center px-5 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3">
                    <Shield size={18} className="text-saffron" fill="#FF6B00" />
                    <h1 className="font-yatra text-aged-paper text-xl leading-none tracking-wide">MISSION BRIEFING</h1>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-saffron" />
                    <span className="font-barlow font-black text-saffron text-sm tracking-widest uppercase">Session Complete</span>
                </div>
            </header>

            {/* ── Main scroll area ────────────────────── */}
            <main className="flex-1 pt-20 pb-40 px-4 flex flex-col items-center relative z-10 gap-6">

                {/* ── Dossier card ────────────────────── */}
                <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 130, damping: 20 }}
                    className="relative w-full max-w-md bg-[#F5E6C8] text-[#131313] p-7 shadow-[4px_4px_0_#0a0705,8px_8px_0_#1a1309] overflow-hidden"
                >
                    {/* Paper noise */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                    {/* Coffee stains */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(101,67,33,0.18) 0%, transparent 70%)", filter: "blur(10px)" }} />
                    <div className="absolute bottom-16 -left-8 w-28 h-28 pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(101,67,33,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                    {/* Fold line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#131313]/5 pointer-events-none" />
                    {/* Hole punches */}
                    <div className="absolute left-2.5 inset-y-0 flex flex-col justify-around py-10 pointer-events-none">
                        {[0,1,2].map(i => <div key={i} className="w-4 h-4 rounded-full bg-[#131313]/15 border border-[#131313]/10 shadow-inner" />)}
                    </div>
                    {/* Paperclip */}
                    <div className="absolute top-4 left-7 z-20 pointer-events-none">
                        <div className="w-7 h-11 border-4 border-slate-400/45 rounded-full rotate-12" />
                        <div className="absolute top-2 left-1 w-5 h-9 border-4 border-slate-500/30 rounded-full" />
                    </div>

                    {/* ── Card header ─── */}
                    <div className="flex justify-between items-start mb-6 pl-10">
                        <div className="border-2 border-danger-red text-danger-red px-2 py-0.5 text-[9px] font-barlow font-black tracking-widest">
                            TOP SECRET
                        </div>
                        <h2 className="font-yatra text-3xl font-bold uppercase tracking-tight leading-none text-center text-[#131313]">
                            MISSION REPORT
                        </h2>
                        <div className="border-2 border-danger-red text-danger-red px-2 py-0.5 text-[9px] font-barlow font-black tracking-widest">
                            CLASSIFIED
                        </div>
                    </div>

                    {/* ── Analysis progress bar ─── */}
                    <div className="mb-8 space-y-1.5 pl-2">
                        <div className="flex justify-between font-barlow font-black text-[10px] tracking-widest text-[#131313]/50 uppercase">
                            <span>ANALYSIS PROGRESS</span>
                            <span>{pctExtracted}% EXTRACTED</span>
                        </div>
                        <div className="h-6 w-full flex bg-[#131313]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pctExtracted}%` }}
                                transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
                                className="h-full bg-danger-red relative overflow-hidden"
                            >
                                {/* Redacted stripe */}
                                <div className="absolute inset-0 opacity-30"
                                    style={{ background: "repeating-linear-gradient(90deg, #131313, #131313 10px, transparent 10px, transparent 12px)" }} />
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Stats block ─── */}
                    <div className="relative grid grid-cols-1 gap-0 pl-2">

                        {[
                            { label: "CORRECT",  value: `${correct}/${total}`, color: "text-[#131313]" },
                            { label: "SKIPPED",  value: String(skipped),       color: "text-[#131313]/60" },
                            { label: "SCORE",    value: String(score),          color: "text-saffron" },
                        ].map(({ label, value, color }, i) => (
                            <motion.div
                                key={label}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center justify-between border-b border-[#131313]/10 py-3"
                            >
                                <span className="font-barlow font-black text-lg tracking-widest text-[#131313]/50 uppercase">{label}:</span>
                                <span className={`font-bebas text-5xl leading-none ${color}`}>{value}</span>
                            </motion.div>
                        ))}

                        {/* Circular rubber stamp — centred over stats */}
                        <AnimatePresence>
                            {stampActive && (
                                <motion.div
                                    initial={{ scale: 4, opacity: 0, rotate: -25 }}
                                    animate={{ scale: 1, opacity: 0.92, rotate: -12 }}
                                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                                >
                                    <div className="w-44 h-44 border-[7px] border-dashed border-saffron rounded-full flex flex-col items-center justify-center p-3 bg-white/10">
                                        <Handshake size={44} className="text-saffron mb-1" />
                                        <div className="font-yatra text-saffron text-base leading-tight text-center">
                                            {verdict.sub}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Verdict name stamp ─── */}
                    <AnimatePresence>
                        {stampActive && (
                            <motion.div
                                initial={{ scale: 3, opacity: 0, rotate: -30 }}
                                animate={{ scale: 1, opacity: 0.88, rotate: -12 }}
                                transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
                                className="mt-6 flex justify-end pointer-events-none"
                            >
                                <div className="border-8 border-danger-red text-danger-red px-5 py-1.5 font-special-elite text-2xl font-black uppercase tracking-tight bg-white/20 shadow-md">
                                    {verdict.label}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Social card insert ─── */}
                    <motion.div
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 bg-white p-4 shadow-sm rotate-[0.8deg] flex flex-col items-center border border-[#131313]/10"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-congress-blue" />
                                <div className="w-3 h-3 rounded-full bg-saffron" />
                            </div>
                            <span className="font-barlow font-black text-[10px] tracking-widest text-[#131313]/60 uppercase">THE CONGRESS BJP DEAL</span>
                        </div>
                        <p className="font-special-elite text-sm text-center text-[#131313] mb-4 leading-relaxed">
                            &ldquo;I exposed {correct}/{total} Congress-BJP deals!&rdquo;
                        </p>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-[#131313]/40 hover:text-[#131313] transition-colors font-barlow font-black text-[11px] tracking-widest uppercase"
                        >
                            <Share2 size={16} />
                            {shareLabel}
                        </button>
                    </motion.div>

                    {/* ── Archival footer ─── */}
                    <div className="mt-6 pt-4 border-t border-[#131313]/10 flex items-center gap-2 opacity-25 justify-center">
                        <span className="font-special-elite text-[9px] uppercase tracking-widest">Archival Record — March 2026</span>
                    </div>
                </motion.div>

                {/* ── Background quote ────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-md w-full px-2"
                >
                    <p className="font-special-elite text-aged-paper/40 text-center italic leading-relaxed text-sm">
                        &ldquo;{verdict.quote}&rdquo;
                    </p>
                </motion.div>

            </main>

            {/* ── Fixed action buttons ─────────────────── */}
            <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0e0a06] border-t border-white/5 px-5 pb-8 pt-4 flex flex-col gap-3">
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileTap={{ scale: 0.97, y: 3 }}
                    onClick={handleRestart}
                    className="w-full bg-saffron text-[#131313] font-barlow font-black text-xl py-4 flex items-center justify-center gap-2 uppercase tracking-wider shadow-[0_5px_0_0_#9B3A00,inset_0_1px_0_0_rgba(255,200,120,0.35)] border border-[#FF8C2A] active:shadow-none active:translate-y-1 transition-all"
                >
                    <RotateCcw size={20} />
                    PLAY AGAIN
                </motion.button>

                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="w-full border border-aged-paper/30 text-aged-paper font-barlow font-black text-xl py-4 flex items-center justify-center gap-2 uppercase tracking-wider hover:bg-aged-paper/5 transition-colors"
                >
                    <Share2 size={20} />
                    {shareLabel}
                </motion.button>
            </div>

        </div>
    );
}
