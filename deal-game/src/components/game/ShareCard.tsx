"use client";

import { forwardRef } from "react";
import { Handshake, Star } from "lucide-react";

interface Props {
    score: number;
    correct: number;
    total: number;
    hintsUsed: number;
    skipped: number;
    verdict: { label: string; sub: string; quote: string };
    date: string;
    lang: string;
}

const ShareCard = forwardRef<HTMLDivElement, Props>(({ score, correct, total, hintsUsed, skipped, verdict, date, lang }, ref) => {
    return (
        <div
            ref={ref}
            className="w-[540px] h-[960px] flex flex-col items-center relative overflow-hidden text-[#e5e1d8]"
            style={{
                fontFamily: "'Inter', sans-serif",
                background: "radial-gradient(circle at top, #2a1f0d 0%, #080604 100%)",
            }}
        >
            {/* Texture Overall - Inline SVG (Base64) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScgbnVtT2N0YXZlcz0nMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==")` }} />

            {/* Visible Top Bar */}
            <div className="w-full h-14 flex items-center px-6 justify-between border-b relative z-30"
                style={{ backgroundColor: "rgba(19, 17, 16, 0.95)", borderBottomColor: "rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-2">
                    <Star size={12} fill="#FF6B00" stroke="none" />
                    <span className="font-barlow font-black text-[11px] tracking-[0.3em] uppercase text-white/90">CONFIDENTIAL DOSSIER</span>
                </div>
                <div className="font-barlow font-black text-[11px] tracking-[0.3em] uppercase text-[#FF6B00]">
                    INTEL CAPTURE • {date.toUpperCase()}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex items-center justify-center p-8 relative">
                {/* Background Shadow */}
                <div className="absolute w-[440px] h-[680px] bg-black/40 rotate-2 translate-y-2 translate-x-1 pointer-events-none blur-md" />

                {/* The Paper */}
                <div className="relative w-[440px] h-[720px] shadow-2xl p-10 flex flex-col items-center rotate-[-0.5deg]"
                    style={{ backgroundColor: "#F5E6C8", color: "#131313" }}>

                    {/* Paper Texture (Base64) */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{ backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjAwIDIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScgbnVtT2N0YXZlcz0nMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScvPjwvc3ZnPg==")` }} />

                    {/* Top Headers */}
                    <div className="w-full flex justify-between items-start mb-10">
                        <div className="border-[3px] border-danger-red/80 px-2 py-0.5 rotate-[-5deg] bg-white/10">
                            <span className="font-yatra text-danger-red/80 text-xl font-black uppercase tracking-widest leading-none">TOP SECRET</span>
                        </div>
                        <div className="text-right flex flex-col items-end opacity-40">
                            <span className="font-special-elite text-[10px] uppercase">PROJECT: DEAL</span>
                            <span className="font-special-elite text-[10px] uppercase">STATUS: ARCHIVED</span>
                        </div>
                    </div>

                    {/* CLEAN MAIN TITLE */}
                    <div className="w-full mb-12 flex flex-col items-center">
                        <div className="w-16 h-1 bg-black/10 mb-4" />
                        <h1 className="font-playfair font-black text-center uppercase tracking-tighter leading-[0.85]"
                            style={{ fontSize: "56px" }}>
                            CONGRESS-BJP<br />DEAL REPORT
                        </h1>
                        <div className="w-16 h-1 bg-black/10 mt-4" />
                    </div>

                    {/* STATS LIST */}
                    <div className="w-full space-y-6 px-2 mb-12 relative z-10">
                        <div className="flex justify-between items-end border-b-2 border-dashed border-black/10 pb-2">
                            <span className="font-special-elite text-sm uppercase opacity-60">Defectors Identified</span>
                            <span className="font-special-elite text-3xl font-bold">{correct} / {total}</span>
                        </div>
                        <div className="flex justify-between items-end border-b-2 border-dashed border-black/10 pb-2">
                            <span className="font-special-elite text-sm uppercase opacity-60">Cases Skipped</span>
                            <span className="font-special-elite text-3xl font-bold">{skipped}</span>
                        </div>
                        <div className="flex justify-between items-end border-b-2 border-dashed border-black/10 pb-2">
                            <span className="font-special-elite text-sm uppercase opacity-60">Mission Intel Score</span>
                            <span className="font-special-elite text-4xl font-bold">{score}</span>
                        </div>

                        {/* DEAL DONE STAMP - MOVED HIGHER */}
                        <div className="absolute right-[-40px] top-[-140px] rotate-[-12deg] opacity-80 pointer-events-none origin-center">
                            <div className="border-[7px] border-danger-red/60 px-8 py-3 bg-white/5 flex flex-col items-center shadow-2xl">
                                <span className="font-yatra text-danger-red/60 text-5xl font-black uppercase tracking-tight">DEAL DONE</span>
                            </div>
                        </div>
                    </div>

                    {/* ANALYST VERDICT SEAL (ROUND) - MOVED HIGHER */}
                    <div className="absolute right-[-20px] top-[40px] flex flex-col items-center border-[5px] border-orange-500/40 rounded-full w-36 h-36 justify-center p-4 rotate-12 bg-white/5 z-20">
                        <Star size={16} color="rgba(255,107,0,0.4)" className="mb-1" />
                        <span className="font-yatra text-orange-600/70 text-2xl font-bold uppercase leading-tight text-center">
                            {verdict.label.split(' ')[0]}<br />{verdict.label.split(' ')[1] || 'ANALYST'}
                        </span>
                        <div className="w-full h-px bg-orange-500/20 my-1" />
                        <span className="font-special-elite text-[8px] uppercase opacity-40">CERTIFIED INTEL</span>
                    </div>

                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="w-full h-20 flex items-center px-10 border-t relative z-10 mb-2"
                style={{ backgroundColor: "#131110", borderTopColor: "rgba(255,255,255,0.05)" }}>
                <div className="flex flex-col">
                    <span className="font-barlow font-black text-3xl leading-none uppercase tracking-tighter" style={{ color: "#e5e1d8" }}>THE DEAL</span>
                    <span className="font-barlow font-black text-[9px] uppercase tracking-[0.4em] leading-none mt-1" style={{ color: "#FF6B00" }}>KERALA POLITICAL INTEL</span>
                </div>
                <div className="flex-1 flex justify-center">
                    <Handshake size={32} color="rgba(255,255,255,0.1)" />
                </div>
                <div className="flex flex-col items-end">
                    <span className="font-barlow font-black text-[10px] uppercase tracking-widest leading-none mb-1 opacity-40">PLAY AT</span>
                    <span className="font-barlow font-black text-xl uppercase leading-none tracking-tight">THE-DEAL.SITE</span>
                </div>
            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20"
                style={{ background: "radial-gradient(circle at top, transparent 50%, rgba(0,0,0,0.85) 100%)" }} />
        </div>
    );
});

ShareCard.displayName = "ShareCard";

export default ShareCard;
