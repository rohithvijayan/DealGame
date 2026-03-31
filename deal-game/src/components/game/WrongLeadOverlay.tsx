"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    defector: any;
    revealedName: string;
    wrongGuess: string;
    score: number;
    mistakes: number;
    maxMistakes: number;
    onTryAgain: () => void;
    onSkip: () => void;
    onEndGame?: () => void;
}

export default function WrongLeadOverlay({ defector, revealedName, wrongGuess, score, mistakes, maxMistakes, onTryAgain, onSkip, onEndGame }: Props) {
    const { t, lang } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[#131313] overscroll-none"
        >
            {/* Background collage — desaturated, high contrast */}
            <div className="fixed inset-0 z-0 opacity-20" style={{ filter: "grayscale(1) contrast(1.25) brightness(0.5)" }}>
                <div
                    className="w-full h-full"
                    style={{
                        background:
                            "repeating-linear-gradient(45deg, #1b1b1b 0px, #1b1b1b 2px, #131313 2px, #131313 16px)",
                    }}
                />
            </div>
            {/* Red vignette */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ background: "radial-gradient(circle, transparent 25%, rgba(183,28,28,0.35) 100%)" }}
            />
            {/* Grainy overlay */}
            <div
                className="fixed inset-0 z-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Top AppBar */}
            <header className="relative z-10 flex justify-between items-center w-full px-4 h-14 bg-[#131313] shrink-0">
                <div className="flex items-center gap-2 max-w-[55%]">
                    <Shield size={18} className="text-saffron shrink-0" />
                    <h1 className={`font-barlow font-black tracking-widest uppercase text-saffron ${lang === 'ml' ? 'text-xs leading-tight' : 'text-sm sm:text-lg'}`}>
                        {t.wrongLead.title}
                    </h1>
                </div>
                <div className="flex gap-2 md:gap-4 items-center shrink-0">
                    <div className="flex flex-col items-end">
                        <span className="font-barlow text-[9px] leading-none opacity-60 uppercase">{t.common.score}</span>
                        <span className={`font-bebas text-saffron ${lang === 'ml' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>{score.toLocaleString()}</span>
                    </div>
                    <div className="h-8 w-px bg-mid-grey/30" />
                    <div className="flex flex-col items-end">
                        <span className="font-barlow text-[9px] leading-none opacity-60 uppercase">{t.common.mistakes}</span>
                        <span className={`font-bebas text-danger-red ${lang === 'ml' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>{mistakes}/{maxMistakes}</span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 bg-congress-blue h-1 w-full" />
            </header>

            {/* Main */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 py-4 sm:py-6 gap-4">
                {/* Manila Folder Card */}
                <motion.div
                    initial={{ y: 30, opacity: 0, rotate: 3 }}
                    animate={{ y: 0, opacity: 1, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    className="relative w-full max-w-[280px] sm:max-w-md bg-[#F5E6C8] shadow-2xl"
                    style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.5), 8px 8px 0 #1b1b1b" }}
                >
                    {/* Paper texture */}
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />
                    {/* Coffee stains */}
                    <div className="absolute top-8 left-8 w-20 h-20 rounded-full opacity-10 blur-2xl mix-blend-multiply bg-[#4a3728]" />
                    <div className="absolute bottom-16 right-4 w-28 h-28 rounded-full opacity-5 blur-xl mix-blend-multiply bg-[#5d4037]" />
                    {/* Hole punches */}
                    <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#131313]/20 border border-[#131313]/10 shadow-inner" />
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#131313]/20 border border-[#131313]/10 shadow-inner" />
                    </div>
                    {/* Fold line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#131313]/5" />

                    {/* Content */}
                    <div className="relative h-full p-4 sm:p-8 pl-8 sm:pl-10 flex flex-col items-center text-[#131313] gap-3 sm:gap-5">
                        {/* CLASSIFIED label */}
                        <div className="self-start font-barlow text-[10px] tracking-widest opacity-40 uppercase">
                            {t.common.classified_eyes}
                        </div>

                        {/* Photo zone — high contrast silhouette/photo */}
                        <div className="relative w-32 h-40 sm:w-40 sm:h-48 bg-[#131313]/10 border-4 border-white shadow-md rotate-2 flex-shrink-0 overflow-hidden">
                            {defector.photo_url ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={defector.photo_url}
                                        alt="Target"
                                        className="w-full h-full object-cover object-top grayscale contrast-150 brightness-75"
                                    />
                                    <div className="absolute inset-0 bg-danger-red/10 mix-blend-overlay" />
                                </div>
                            ) : (
                                <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #3a3a3a 0%, #1a1a1a 100%)", filter: "contrast(1.5) brightness(0.75)" }} />
                            )}
                            {/* X cross mark on photo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-danger-red text-6xl sm:text-7xl font-bebas leading-none opacity-60">✕</div>
                            </div>
                        </div>

                        {/* INCORRECT Stamp — animates in with spring */}
                        <motion.div
                            initial={{ scale: 4, opacity: 0, rotate: 25 }}
                            animate={{ scale: 1, opacity: 1, rotate: 15 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 14 }}
                            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 sm:border-8 border-danger-red px-3 sm:px-5 py-0.5 sm:py-1 bg-white/20 shadow-xl"
                        >
                            <span className={`font-yatra text-danger-red uppercase leading-none block ${lang === 'ml' ? 'text-2xl sm:text-4xl' : 'text-4xl sm:text-6xl'}`}>
                                {t.wrongLead.incorrect}
                            </span>
                        </motion.div>

                        {/* Intel Fields — values are redacted/blank */}
                        <div className="w-full space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                            {[
                                { label: t.common.position },
                                { label: t.common.state },
                                { label: t.common.year_of_deal },
                            ].map((f) => (
                                <div key={f.label} className="flex items-start gap-2 sm:gap-3">
                                    <span className={`font-special-elite text-[11px] sm:text-sm font-bold flex-shrink-0 opacity-50 ${lang === 'ml' ? 'w-24 sm:w-32' : 'w-20 sm:w-24'}`}>
                                        {f.label}
                                    </span>
                                    <div className="flex-1 border-b-2 border-[#131313]/25 h-5 sm:h-6 relative">
                                        {/* redacted bar */}
                                        <div className="absolute bottom-1 left-0 h-4 w-3/4 bg-[#131313] opacity-80 rounded-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Your wrong guess */}
                        <div className="w-full bg-danger-red/10 border-l-4 border-danger-red px-4 py-2 mt-2">
                            <span className="font-special-elite text-[10px] text-danger-red uppercase block mb-0.5">{t.wrongLead.your_guess}</span>
                            <span className="font-special-elite text-sm text-[#131313] line-through opacity-70">{wrongGuess || "—"}</span>
                        </div>

                        {/* Intel flawed message */}
                        <div className="text-center mt-2">
                            <p className="font-special-elite text-danger-red text-sm font-bold tracking-tight">
                                {t.wrongLead.intel_flawed_msg}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer Controls */}
            <footer className="relative z-10 bg-[#131313] px-6 pb-6 sm:pb-8 pt-3 sm:pt-4 border-t border-white/5 shrink-0">
                <div className="max-w-md mx-auto flex flex-col gap-2 sm:gap-3">
                    {/* Disabled confirm */}
                    <button
                        disabled
                        className="w-full py-2.5 sm:py-3 bg-[#353535] text-white/20 font-barlow font-black text-lg sm:text-xl tracking-widest uppercase flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                        {t.common.confirm_deal}
                    </button>
                    {/* Try Again button */}
                    <motion.button
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onTryAgain}
                        className="w-full py-3.5 sm:py-4 bg-saffron text-[#131313] font-barlow font-black text-xl sm:text-2xl tracking-widest uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                        {t.wrongLead.try_again}
                    </motion.button>

                    {/* Optional Intel Link for Malayalam */}
                    {lang === 'ml' && (
                        <motion.a
                            href={`/intel/${defector.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 bg-near-black/40 text-saffron font-anek-ml font-bold text-sm tracking-wide uppercase flex items-center justify-center text-center transition-all no-underline border border-saffron/20"
                        >
                            ഈ ഡീലറെക്കുറിച്ചുള്ള കൂടുതൽ വിവരങ്ങൾ വായിക്കുക
                        </motion.a>
                    )}
                    {/* Skip instead */}
                    <button
                        onClick={onSkip}
                        className="w-full py-1.5 sm:py-2 text-mid-grey font-barlow font-black text-xs sm:text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
                    >
                        {t.wrongLead.skip_dossier}
                    </button>
                    {onEndGame && (
                        <button
                            onClick={onEndGame}
                            className="w-full py-1.5 sm:py-2 text-danger-red/60 font-barlow font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:text-danger-red transition-colors mt-1 sm:mt-2"
                        >
                            {t.common.end_mission_brackets}
                        </button>
                    )}
                </div>
            </footer>
        </motion.div>
    );
}
