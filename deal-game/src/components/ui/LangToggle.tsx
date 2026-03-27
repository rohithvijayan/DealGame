"use client";
import { useLangStore } from "@/store/langStore";

interface Props {
    className?: string;
    variant?: "dark" | "light";
}

export function LangToggle({ className = "", variant = "dark" }: Props) {
    const { lang, toggleLang } = useLangStore();
    const activeBg = "bg-saffron text-near-black";
    const inactiveText = variant === "dark" ? "text-white/40" : "text-black/40";
    const border = variant === "dark" ? "border-white/20" : "border-black/20";

    return (
        <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className={`flex items-center font-barlow font-black text-[10px] tracking-widest border overflow-hidden shrink-0 ${border} ${className}`}
        >
            <span className={`px-2 py-1 transition-colors ${lang === "en" ? activeBg : inactiveText}`}>EN</span>
            <span className={`px-2 py-1 transition-colors ${lang === "ml" ? activeBg : inactiveText}`}>ML</span>
        </button>
    );
}
