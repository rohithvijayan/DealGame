"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useRef, useState, useCallback } from "react";
import type { DefectorDisplay } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shield, Star, Handshake, Home, ChevronLeft, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DealConfirmedOverlay from "@/components/game/DealConfirmedOverlay";
import WrongLeadOverlay from "@/components/game/WrongLeadOverlay";
import CaseUnsolvedOverlay from "@/components/game/CaseUnsolvedOverlay";
import { useTranslation } from "@/hooks/useTranslation";
import { LangToggle } from "@/components/ui/LangToggle";
import LotusSpinner from "@/components/ui/LotusSpinner";
import { translateToMalayalam } from "@/utils/translate";
import SplashScreen from "@/components/screens/SplashScreen";
import HowToPlayModal from "@/components/screens/HowToPlayModal";

type AnswerState = "playing" | "correct" | "wrong" | "skipped";

export default function GameScreen() {
    const router = useRouter();
    const {
        currentRound, score, streak,
        sessionDefectors, startNewGame, submitGuess, revealRound, markAsSkipped, nextRound, prevRound,
        isGameComplete, completedIds, skippedIds, revealedNames,
    } = useGameStore();

    const [guess, setGuess] = useState("");
    const [answerState, setAnswerState] = useState<AnswerState>("playing");
    const [lastPoints, setLastPoints] = useState(0);
    const [wrongGuess, setWrongGuess] = useState("");
    const [mistakes, setMistakes] = useState(0);
    const [hintsShown, setHintsShown] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [translatedDefector, setTranslatedDefector] = useState<DefectorDisplay | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);
    const [showAutoTutorial, setShowAutoTutorial] = useState(false);
    const MAX_MISTAKES = 4;
    const inputRef = useRef<HTMLInputElement>(null);
    const { t, lang } = useTranslation();

    const currentDefector: DefectorDisplay = sessionDefectors[currentRound];
    const revealedName = revealedNames?.[currentRound] ?? "";
    const [displayRevealedName, setDisplayRevealedName] = useState("");

    useEffect(() => {
        if (isGameComplete) {
            const sid = Math.random().toString(36).substring(2, 15);
            router.push(`/results/${sid}`);
        }
    }, [isGameComplete, router]);

    // Automatic start removed - SplashScreen handles this now
    useEffect(() => {
        // if (sessionDefectors.length === 0) {
        //     startNewGame();
        // }
    }, [sessionDefectors, startNewGame]);

    useEffect(() => {
        setAnswerState("playing");
        setGuess("");
        setHintsShown(0);
        setMistakes(0);
        setWrongGuess("");
        setImageError(false);
        // Only autofocus on desktop; it blocks content on mobile
        if (window.innerWidth > 768) {
            setTimeout(() => inputRef.current?.focus(), 400);
        }
    }, [currentRound]);

    // Auto-show tutorial on first load of the game page
    useEffect(() => {
        const hasSeenInSession = sessionStorage.getItem("hasSeenGameTutorial");
        if (!hasSeenInSession) {
            const timer = setTimeout(() => {
                setShowAutoTutorial(true);
                sessionStorage.setItem("hasSeenGameTutorial", "true");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Handle automatic translation
    useEffect(() => {
        const handleTranslation = async () => {
            if (lang === "ml" && currentDefector) {
                setIsTranslating(true);
                try {
                    const [translatedPosition, translatedState, translatedClue, translatedOutcome, ...translatedHints] = await Promise.all([
                        translateToMalayalam(currentDefector.position),
                        translateToMalayalam(currentDefector.state),
                        translateToMalayalam(currentDefector.clue),
                        translateToMalayalam(currentDefector.outcome),
                        ...currentDefector.hints.map(hint => translateToMalayalam(hint))
                    ]);

                    setTranslatedDefector({
                        ...currentDefector,
                        position: translatedPosition,
                        state: translatedState,
                        clue: translatedClue,
                        outcome: translatedOutcome,
                        hints: translatedHints
                    });
                } catch (error) {
                    console.error("Translation failed:", error);
                    setTranslatedDefector(currentDefector);
                } finally {
                    setIsTranslating(false);
                }
            } else {
                setTranslatedDefector(null);
            }
        };

        handleTranslation();
    }, [lang, currentDefector]);

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (answerState !== "playing" || !guess.trim() || isSubmitting) return;

        setIsSubmitting(true);
        // Scoring: 1st=10, 2nd=8, 3rd=6, 4th=4
        const points = Math.max(4, 10 - (mistakes * 2));
        const result = await submitGuess(guess, points);
        setIsSubmitting(false);

        if (result.correct) {
            setLastPoints(result.points);
            setAnswerState("correct");
        } else {
            const nextMistakes = mistakes + 1;
            setWrongGuess(guess);
            setMistakes(nextMistakes);
            setGuess("");

            if (nextMistakes >= MAX_MISTAKES) {
                // Out of chances after 3 hints / 4 tries
                if (currentDefector) {
                    setIsSubmitting(true);
                    markAsSkipped(currentDefector.id);
                    await revealRound(currentRound);
                    setIsSubmitting(false);
                }
                setAnswerState("skipped");
            } else {
                setAnswerState("wrong");
            }
        }
    }, [guess, answerState, isSubmitting, submitGuess, mistakes, currentDefector, markAsSkipped, revealRound, currentRound]);

    const handleSkip = useCallback(async () => {
        if (!currentDefector || isSubmitting) return;
        setIsSubmitting(true);
        markAsSkipped(currentDefector.id);
        await revealRound(currentRound);
        setIsSubmitting(false);
        setAnswerState("skipped");
    }, [markAsSkipped, currentDefector, revealRound, currentRound, isSubmitting]);

    // Handle name translation when revealed
    useEffect(() => {
        const translateRevealedName = async () => {
            if (lang === "ml" && revealedName) {
                const translated = await translateToMalayalam(revealedName);
                setDisplayRevealedName(translated);
            } else {
                setDisplayRevealedName(revealedName);
            }
        };
        translateRevealedName();
    }, [lang, revealedName]);

    const handleTryAgain = useCallback(() => {
        setAnswerState("playing");
        setWrongGuess("");
        if (window.innerWidth > 768) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, []);

    const handleHome = () => { /* Now using <Link> */ };

    const handleBack = useCallback(() => {
        if (currentRound <= 0) return;
        prevRound();
        setAnswerState("playing");
        setGuess("");
        setWrongGuess("");
        setMistakes(0);
        setHintsShown(0);
    }, [currentRound, prevRound]);

    const handleNext = useCallback(() => {
        setAnswerState("playing");
        nextRound();
    }, [nextRound]);

    const handleEndGame = useCallback(() => {
        const sid = Math.random().toString(36).substring(2, 15);
        router.push(`/results/${sid}`);
    }, [router]);

    const displayDefector = (lang === "ml" && translatedDefector) ? translatedDefector : currentDefector;

    return (
        <div className="min-h-dvh bg-[#131313] text-[#e5e2e1] font-noto overflow-x-hidden flex flex-col">
            <LotusSpinner visible={isSubmitting} label="Cross-checking intel…" />

            {/* Grainy Background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.05,
                }}
            />
            <div className="fixed inset-0 bg-gradient-to-b from-[#131313] via-[#1b1b1b] to-[#0e0e0e] z-[-1] pointer-events-none" />

            {sessionDefectors.length === 0 || !currentDefector ? (
                <SplashScreen />
            ) : (
                <>

                    {/* Top App Bar */}
                    <header className="fixed top-0 left-0 w-full z-50 bg-[#131313] flex items-center justify-between px-2 h-16">
                        {/* Left — HOME + BACK */}
                        <div className="flex items-center gap-1 z-[60]">
                            <Link
                                href="/"
                                title="Home"
                                className="flex flex-col items-center justify-center px-3 py-2 text-mid-grey hover:text-saffron hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <Home size={18} />
                                <span className={`font-barlow font-black uppercase tracking-widest leading-none mt-0.5 ${lang === 'ml' ? 'text-[7px]' : 'text-[8px]'}`}>{t.game.home}</span>
                            </Link>
                            {currentRound > 0 && answerState === "playing" && (
                                <button
                                    onClick={handleBack}
                                    title="Previous question"
                                    className="flex flex-col items-center justify-center px-2 py-2 text-mid-grey hover:text-saffron hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <ChevronLeft size={18} />
                                    <span className={`font-barlow font-black uppercase tracking-widest leading-none mt-0.5 ${lang === 'ml' ? 'text-[7px]' : 'text-[8px]'}`}>{t.game.back}</span>
                                </button>
                            )}
                        </div>

                        {/* Center — Title + Shield */}
                        <div className="flex items-center gap-1 md:gap-2 flex-1 justify-center px-1">
                            <Shield size={16} className="text-saffron shrink-0" fill="#FF6B00" />
                            <span className={`font-barlow font-black uppercase tracking-widest text-saffron ${lang === 'ml' ? 'text-[10px] sm:text-sm leading-tight' : 'text-base'}`}>{t.game.classified_the_deal}</span>
                        </div>

                        {/* Right — Score + Streak + END */}
                        <div className="flex items-center gap-2 sm:gap-4 pr-1">
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-barlow font-black text-mid-grey leading-none tracking-widest uppercase">{t.common.score}</span>
                                <span className="text-xl font-bebas text-saffron leading-none tabular-nums">{score}</span>
                            </div>
                            {streak > 0 && (
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-[9px] font-barlow font-black text-mid-grey leading-none tracking-widest uppercase">{t.game.streak}</span>
                                    <span className="text-xl font-bebas text-turmeric leading-none">{streak}🔥</span>
                                </div>
                            )}
                            <button
                                onClick={handleEndGame}
                                className="ml-1 flex flex-col items-center justify-center p-1 sm:p-2 text-danger-red hover:bg-danger-red/10 transition-colors border border-danger-red/20 rounded cursor-pointer pointer-events-auto shrink-0"
                            >
                                <LogOut size={16} />
                                <span className={`font-barlow font-black uppercase tracking-widest leading-none mt-0.5 whitespace-nowrap ${lang === 'ml' ? 'text-[7px]' : 'text-[8px]'}`}>{t.game.end_mission}</span>
                            </button>
                            <LangToggle className="ml-1" />
                        </div>

                        <div className="absolute bottom-0 left-0 h-1 w-full bg-congress-blue" />
                    </header>

                    {/* Round Progress Bar */}
                    <div className="fixed top-16 left-0 w-full z-40 bg-[#1b1b1b] flex gap-1 px-4 py-2 border-b border-white/5">
                        {Array.from({ length: Math.min(sessionDefectors.length, 10) }).map((_, i) => {
                            const isCurrent = i === currentRound;
                            const isSolved = completedIds.includes(sessionDefectors[i]?.id ?? "");
                            const isSkipped = skippedIds.includes(sessionDefectors[i]?.id ?? "");
                            return (
                                <div
                                    key={i}
                                    className={`flex-1 h-1.5 transition-all duration-300 ${isCurrent ? "bg-saffron animate-pulse" :
                                        isSolved ? "bg-verified-green" :
                                            isSkipped ? "bg-mid-grey/30" : "bg-white/10"
                                        }`}
                                />
                            );
                        })}
                    </div>

                    {/* Main content */}
                    <main className="flex-1 pt-24 pb-48 sm:pt-32 sm:pb-56 px-4 flex flex-col items-center justify-center relative z-10 min-h-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentRound}
                                initial={{ x: 120, opacity: 0, rotate: 4 }}
                                animate={{ x: 0, opacity: 1, rotate: -1 }}
                                exit={{ x: -250, opacity: 0, rotate: -8 }}
                                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                                className="relative w-full max-w-sm sm:max-w-md bg-[#F5E6C8] shadow-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-5 overflow-hidden"
                            >
                                {/* Paper noise */}
                                <div
                                    className="absolute inset-0 opacity-10 pointer-events-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                    }}
                                />
                                {/* Coffee Stain */}
                                <div
                                    className="absolute -top-10 -right-10 w-48 h-48 rotate-12 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at center, rgba(101,67,33,0.15) 0%, rgba(101,67,33,0) 70%)", filter: "blur(8px)" }}
                                />
                                {/* Fold Line */}
                                <div className="absolute inset-y-0 left-1/2 w-px opacity-20 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent 49.5%, rgba(0,0,0,0.05) 50%, transparent 50.5%)" }} />
                                {/* Hole Punches */}
                                <div className="absolute left-2 inset-y-0 flex flex-col justify-around py-12 pointer-events-none">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i} className="w-4 h-4 rounded-full bg-[#131313] shadow-inner border border-black/10" />
                                    ))}
                                </div>

                                {/* CLASSIFIED Header */}
                                <div className="flex flex-col gap-2">
                                    <div className="bg-danger-red py-2 px-4 flex justify-between items-center -mx-6 transform -rotate-1 shadow-md">
                                        <span className="font-barlow font-black text-white tracking-[0.2em] text-lg uppercase">{t.game.classified_information}</span>
                                        <div className="flex gap-0.5">
                                            {Array.from({ length: displayDefector.difficulty }).map((_, i) => (
                                                <Star key={i} size={14} className="text-white" fill="white" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-baseline px-2 border-b border-black/10 pb-2">
                                        <span className="font-special-elite text-black/60 text-xs">{t.game.file_ref}</span>
                                        <span className="font-bebas text-black text-2xl tracking-widest">
                                            #CONG_BJP DEAL-{String(currentRound + 1).padStart(3, "0")}
                                            {isTranslating && <span className="ml-2 text-[8px] animate-pulse">Translating...</span>}
                                        </span>
                                    </div>
                                </div>

                                {/* Photo + Intel Fields */}
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start mt-1">
                                    {/* Polaroid */}
                                    <div className="relative bg-white p-1.5 pb-8 sm:p-2 sm:pb-10 shadow-lg transform -rotate-2 border border-black/5 self-center flex-shrink-0">
                                        <div className="w-28 h-28 sm:w-36 sm:h-36 bg-zinc-800 relative overflow-hidden">
                                            {displayDefector.photo_url && !imageError ? (
                                                <Image
                                                    src={displayDefector.photo_url}
                                                    alt="Defector photo"
                                                    fill
                                                    className="object-cover object-top"
                                                    sizes="144px"
                                                    onError={() => setImageError(true)}
                                                />
                                            ) : (
                                                <>
                                                    <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-80" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="border-4 border-danger-red px-2 py-1 transform -rotate-12 bg-danger-red/10">
                                                            <span className="font-barlow font-black text-danger-red text-[9px] text-center leading-tight block">
                                                                {t.game.identity_withheld_line1}<br />{t.game.identity_withheld_line2}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-special-elite text-[9px] text-zinc-400 whitespace-nowrap">

                                        </div>
                                    </div>
                                    {/* Mistakes tracker dots */}
                                    {mistakes > 0 && (
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
                                                <div key={i} className={`w-2.5 h-2.5 rounded-full border border-danger-red ${i < mistakes ? 'bg-danger-red' : 'bg-transparent'}`} />
                                            ))}
                                        </div>
                                    )}
                                    {/* Intel Fields */}
                                    <div className="flex-1 space-y-3 w-full min-w-0">
                                        {[
                                            { label: t.common.position, value: displayDefector.position },
                                            { label: t.common.state, value: displayDefector.state },
                                            { label: t.common.year_of_deal, value: String(displayDefector.year) },
                                        ].map((field) => (
                                            <div key={field.label} className="space-y-0 sm:space-y-0.5">
                                                <label className="font-special-elite text-black/50 text-[9px] sm:text-[10px] block">{field.label}</label>
                                                <div className="font-special-elite text-black text-[13px] sm:text-sm border-b border-dotted border-black/40 pb-0.5 sm:pb-1 uppercase">
                                                    {field.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sticky Note Clue */}
                                <div className="relative bg-[#FFFD82] p-3 sm:p-4 shadow-md transform rotate-1 border-l-4 border-yellow-400">
                                    <div className="absolute -top-3 left-4">
                                        <div className="w-2 h-8 border-2 border-slate-400 rounded-full opacity-60" />
                                    </div>
                                    <span className="font-special-elite text-[9px] text-black/40 uppercase block mb-0.5">{t.game.field_agent_note}</span>
                                    <p className="font-special-elite text-xs sm:text-sm text-black leading-snug sm:leading-relaxed">{displayDefector.clue}</p>
                                    <div className="absolute bottom-1 right-2 opacity-10 transform rotate-12 text-2xl">📎</div>
                                </div>

                                {/* Progressive Hints */}
                                <AnimatePresence>
                                    {hintsShown > 0 && (
                                        <div className="space-y-2">
                                            {displayDefector.hints.slice(0, hintsShown).map((hint, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-congress-blue/10 border-l-4 border-congress-blue px-3 py-2"
                                                >
                                                    <span className="font-special-elite text-[9px] text-congress-blue uppercase block mb-0.5">{t.game.hint_label(i)}</span>
                                                    <p className="font-special-elite text-[11px] text-black/80 leading-snug">{hint}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>

                                {/* Deal Banner Footer */}
                                <div className="mt-auto pt-3 border-t-2 border-black/5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Handshake size={18} className="text-congress-blue" />
                                            <span className="font-barlow font-black text-black/70 text-xs tracking-tight uppercase">{t.game.the_deal_footer}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-8 h-3 bg-congress-blue rounded-full" />
                                            <div className="w-8 h-3 bg-saffron rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                {/* PENDING Stamp */}
                                <div className="absolute bottom-20 right-4 transform rotate-[-15deg] opacity-40 pointer-events-none border-4 border-[#2E7D32] px-4 py-2">
                                    <span className="font-yatra text-[#2E7D32] text-2xl font-black uppercase">{t.game.pending}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </main>

                    {/* Fixed Bottom Input Zone */}
                    <section className="fixed bottom-0 left-0 right-0 z-50 bg-[#131313] border-t border-white/10">
                        <nav className="flex w-full h-14 border-b border-white/5">
                            <div className="flex-1 flex flex-col items-center justify-center bg-saffron text-near-black">
                                <span className="text-lg">📋</span>
                                <span className="font-barlow font-black uppercase text-[10px] tracking-widest">{t.game.mission}</span>
                            </div>
                            <button
                                onClick={() => hintsShown < (displayDefector?.hints.length ?? 0) && setHintsShown((h) => h + 1)}
                                disabled={hintsShown >= (displayDefector?.hints.length ?? 0) || answerState !== "playing" || isTranslating}
                                className="flex-1 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="text-lg">💡</span>
                                <span className="font-barlow font-black uppercase text-[10px] tracking-widest">
                                    {hintsShown > 0
                                        ? t.game.hint_with_count(hintsShown, displayDefector?.hints.length ?? 0)
                                        : t.game.hint}
                                </span>
                            </button>
                            <button
                                onClick={handleSkip}
                                disabled={answerState !== "playing" || isTranslating}
                                className="flex-1 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="text-lg">⏭</span>
                                <span className="font-barlow font-black uppercase text-[10px] tracking-widest">{t.game.skip}</span>
                            </button>
                        </nav>

                        <div className="px-4 pt-3 pb-6 max-w-md mx-auto w-full">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <div className="flex-1 relative">
                                    <label htmlFor="defector-input" className="sr-only">
                                        Name the defector
                                    </label>
                                    <input
                                        id="defector-input"
                                        ref={inputRef}
                                        type="text"
                                        value={guess}
                                        onChange={(e) => setGuess(e.target.value)}
                                        placeholder={isTranslating ? "Translating intel..." : t.game.placeholder}
                                        disabled={answerState !== "playing" || isTranslating}
                                        className={`w-full bg-[#1b1b1b] border-b-2 border-white/20 focus:border-saffron px-4 py-3 font-special-elite text-lg text-white placeholder:text-white/20 focus:outline-none transition-colors uppercase disabled:opacity-50`}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!guess.trim() || answerState !== "playing" || isTranslating}
                                    className="bg-saffron text-[#131313] px-6 py-3 font-barlow font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {t.game.id_button}
                                </button>
                            </form>
                        </div>
                    </section>

                    <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-8px); }
            80% { transform: translateX(4px); }
          }
          .animate-shake { animation: shake 0.35s ease-in-out; }
        `}</style>

                    {/* ─────────────────── STATE OVERLAYS ─────────────────── */}
                    <AnimatePresence>
                        {answerState === "correct" && currentDefector && (
                            <DealConfirmedOverlay
                                key="correct"
                                defector={displayDefector}
                                revealedName={displayRevealedName}
                                pointsGained={lastPoints}
                                totalScore={score}
                                round={currentRound + 1}
                                onNext={handleNext}
                                onEndGame={handleEndGame}
                            />
                        )}
                        {answerState === "wrong" && currentDefector && (
                            <WrongLeadOverlay
                                key="wrong"
                                defector={displayDefector}
                                revealedName={displayRevealedName}
                                wrongGuess={wrongGuess}
                                score={score}
                                mistakes={mistakes}
                                maxMistakes={MAX_MISTAKES}
                                onTryAgain={handleTryAgain}
                                onSkip={handleSkip}
                                onEndGame={handleEndGame}
                            />
                        )}
                        {answerState === "skipped" && currentDefector && (
                            <CaseUnsolvedOverlay
                                key="skipped"
                                defector={displayDefector}
                                revealedName={displayRevealedName}
                                score={score}
                                round={currentRound + 1}
                                onNext={handleNext}
                                onEndGame={handleEndGame}
                            />
                        )}
                    </AnimatePresence>

                    {/* Auto-tutorial modal */}
                    <HowToPlayModal
                        isOpen={showAutoTutorial}
                        onClose={() => setShowAutoTutorial(false)}
                    />
                </>
            )}
        </div >
    );
}
