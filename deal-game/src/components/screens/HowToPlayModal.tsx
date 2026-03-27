import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function HowToPlayModal({ isOpen, onClose }: Props) {
    const { t } = useTranslation();
    const h = t.howToPlay;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-near-black/85 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-[#F5E6C8] shadow-2xl overflow-hidden flex flex-col"
                        style={{
                            boxShadow: "0 20px 50px rgba(0,0,0,0.8), 10px 10px 0px #1b1b1b",
                            filter: "contrast(1.05) brightness(0.98)",
                            maxHeight: "90dvh"
                        }}
                    >
                        {/* Paper Texture Overlay */}
                        <div
                            className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                zIndex: 1
                            }}
                        />

                        {/* Header */}
                        <div className="relative z-10 px-6 py-4 bg-[#131313] flex items-center justify-between border-b-2 border-saffron/30">
                            <div className="flex items-center gap-2">
                                <Shield className="text-saffron" size={20} fill="#FF6B00" />
                                <h2 className="font-barlow font-black text-xl text-saffron tracking-[0.1em] uppercase">{h.title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 text-mid-grey hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8 text-[#131313]">
                            {/* Introduction */}
                            <div className="space-y-2">
                                <p className="font-special-elite text-sm leading-relaxed opacity-80 border-l-4 border-[#131313]/20 pl-4 py-1 italic">
                                    {h.intro}
                                </p>
                            </div>

                            {/* Instructions List */}
                            <div className="space-y-6">
                                {/* 1. Review Dossier */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 flex-shrink-0 bg-near-black text-saffron flex items-center justify-center font-bebas text-2xl shadow-md rotate-[-3deg]">1</div>
                                    <div className="space-y-1">
                                        <h3 className="font-barlow font-black text-lg uppercase tracking-tight">{h.step1_title}</h3>
                                        <p className="font-special-elite text-xs leading-snug opacity-90">
                                            {h.step1_desc}
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Decipher Hints */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 flex-shrink-0 bg-near-black text-saffron flex items-center justify-center font-bebas text-2xl shadow-md rotate-[2deg]">2</div>
                                    <div className="space-y-1">
                                        <h3 className="font-barlow font-black text-lg uppercase tracking-tight">{h.step2_title}</h3>
                                        <p className="font-special-elite text-xs leading-snug opacity-90">
                                            {h.step2_desc}
                                        </p>
                                    </div>
                                </div>

                                {/* 3. Identify */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 flex-shrink-0 bg-near-black text-saffron flex items-center justify-center font-bebas text-2xl shadow-md rotate-[-2deg]">3</div>
                                    <div className="space-y-1">
                                        <h3 className="font-barlow font-black text-lg uppercase tracking-tight">{h.step3_title}</h3>
                                        <p className="font-special-elite text-xs leading-snug opacity-90">
                                            {h.step3_desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Scoring Intel */}
                            <div className="bg-[#131313]/5 border-2 border-dashed border-[#131313]/10 p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Star size={16} fill="#FF6B00" className="text-saffron" />
                                    <h4 className="font-barlow font-black text-xs uppercase tracking-widest text-[#131313]/60">{h.scoring_title}</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="font-bebas text-xl leading-none">{h.points_10}</div>
                                        <div className="font-special-elite text-[9px] opacity-60">{h.points_10_desc}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-bebas text-xl leading-none">{h.points_multi}</div>
                                        <div className="font-special-elite text-[9px] opacity-60">{h.points_multi_desc}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-bebas text-xl leading-none text-danger-red">{h.mistakes_title}</div>
                                        <div className="font-special-elite text-[9px] opacity-60">{h.mistakes_desc}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-bebas text-xl leading-none text-verified-green">{h.streak_title}</div>
                                        <div className="font-special-elite text-[9px] opacity-60">{h.streak_desc}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recruitment Message */}
                            <div className="text-center pt-2">
                                <div className="font-yatra text-2xl text-[#2E7D32]/60 uppercase transform rotate-[-3deg] border-4 border-[#2E7D32]/40 px-3 inline-block">{h.eyes_only}</div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="relative z-10 p-4 bg-near-black flex justify-center">
                            <button
                                onClick={onClose}
                                className="font-barlow font-black text-saffron uppercase tracking-widest text-sm hover:underline underline-offset-4 cursor-pointer"
                            >
                                {h.understood}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
