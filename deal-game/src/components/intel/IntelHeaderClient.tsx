"use client";

import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { LangToggle } from "@/components/ui/LangToggle";

interface Props {
    title: string;
}

export function IntelHeaderClient({ title }: Props) {
    const { lang } = useTranslation();

    return (
        <nav
            className="flex items-center justify-between px-6 py-4 bg-[#F5E6C8] border-b-2 border-[#2C1810]"
            style={{ width: "100%", boxSizing: "border-box" }}
        >
            <Link
                href="/intel"
                className="flex items-center gap-3 px-3 py-1 bg-[#FF6B00] text-white font-barlow font-black text-[11px] tracking-widest uppercase border-2 border-[#2C1810] shadow-[2px_2px_0_#2C1810] hover:bg-near-black transition-colors"
                style={{ textDecoration: "none" }}
            >
                {lang === 'ml' ? 'ഹോം' : 'HOME'}
            </Link>

            <div
                className={`font-playfair font-black text-lg text-[#2C1810] uppercase tracking-tight ${lang === 'ml' ? 'font-anek-ml' : ''}`}
            >
                {lang === 'ml' ? 'സി.ജെ.പി ആർക്കൈവ്സ്' : title}
            </div>

            <div className="flex items-center gap-4">
                <LangToggle variant="light" className="scale-110" />
            </div>
        </nav>
    );
}
