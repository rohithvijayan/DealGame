"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Play, FileText } from "lucide-react";
import ArticleCard from "@/components/intel/ArticleCard";
import type { DefectorMeta } from "@/types/intel";

const GAME_BASE = "https://thecongressbjpdeal.com";

interface Props {
    defectors: DefectorMeta[];
    stats: {
        total: number;
        districts: number;
        minYear: number;
        maxYear: number;
        articles: number;
    };
}

export default function IntelLandingClient({ defectors, stats }: Props) {
    const featured = defectors.filter((d) => d.featured).slice(0, 6);

    return (
        <div>
            {/* ── HERO ───────────────────────────────────────────── */}
            <section
                className="relative flex flex-col justify-center overflow-hidden"
                style={{
                    minHeight: "calc(100dvh - 130px)",
                    backgroundColor: "#0e0a06",
                }}
            >
                {/* Background images — responsive */}
                <div className="absolute inset-0 z-0 md:hidden">
                    <Image
                        src="/HomeBgMobile.webp"
                        alt=""
                        fill
                        priority
                        className="object-cover object-top"
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 z-0 hidden md:block">
                    <Image
                        src="/HomeBgDesktop.webp"
                        alt=""
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                </div>

                {/* Solid dark dimming overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(0,0,0,0.68)", zIndex: 1 }} />

                {/* Film grain */}
                <div className="grain-overlay pointer-events-none" />

                {/* Dark matter texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "url('/textures/dark-matter.png')",
                        opacity: 0.1,
                        zIndex: 2,
                    }}
                />

                {/* Gradient vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.75) 100%)",
                        zIndex: 3,
                    }}
                />

                {/* Content */}
                <div
                    className="relative flex flex-col items-center text-center px-6 py-16 md:py-24 mx-auto w-full"
                    style={{ maxWidth: "900px", zIndex: 20 }}
                >
                    {/* CLASSIFIED badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-px w-12" style={{ backgroundColor: "#B8860B" }} />
                        <span
                            style={{
                                fontFamily: "var(--font-special-elite)",
                                fontSize: "10px",
                                letterSpacing: "0.3em",
                                color: "#B8860B",
                                textTransform: "uppercase",
                            }}
                        >
                            CLASSIFIED ARCHIVE · KERALA
                        </span>
                        <div className="h-px w-12" style={{ backgroundColor: "#B8860B" }} />
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 900,
                            fontSize: "clamp(2.6rem, 8vw, 6rem)",
                            lineHeight: 1.05,
                            color: "#F5E6C8",
                            marginBottom: "20px",
                            textShadow: "0 3px 20px rgba(0,0,0,0.8)",
                        }}
                    >
                        Today's Congress is Tommorow's BJP{" "}
                        <span style={{ color: "#FF6B00" }}>REAL C.J.P DEALS</span>
                        <br />
                    </motion.h1>

                    {/* Sub-copy */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                            fontFamily: "var(--font-special-elite)",
                            fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                            color: "rgba(245,230,200,0.65)",
                            lineHeight: 1.7,
                            maxWidth: "580px",
                            marginBottom: "36px",
                        }}
                    >
                        Names, roles, triggers, outcomes. The complete record of Kerala's
                        Congress-to-BJP political crossovers — documented, sourced, archived.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
                        style={{
                            padding: "16px 0",
                            borderTop: "1px solid rgba(184,134,11,0.3)",
                            borderBottom: "1px solid rgba(184,134,11,0.3)",
                        }}
                    >
                        {[
                            { value: String(stats.total), label: "Defectors" },
                            {
                                value: `${stats.minYear}–${stats.maxYear}`,
                                label: "Years Covered",
                            },
                            { value: String(stats.articles), label: "Articles Filed" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div
                                    style={{
                                        fontFamily: "var(--font-bebas)",
                                        fontSize: "clamp(2rem, 5vw, 3rem)",
                                        color: "#FF6B00",
                                        lineHeight: 1,
                                        letterSpacing: "0.02em",
                                        textShadow: "0 2px 0 #7a3000",
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "var(--font-barlow)",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        letterSpacing: "0.2em",
                                        color: "rgba(184,134,11,0.8)",
                                        textTransform: "uppercase",
                                        marginTop: "2px",
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="flex flex-col sm:flex-row gap-3 w-full"
                        style={{ maxWidth: "420px" }}
                    >
                        <Link
                            href="/intel#archive"
                            className="flex items-center justify-center gap-2 flex-1"
                            style={{
                                backgroundColor: "#FF6B00",
                                color: "#fff",
                                fontFamily: "var(--font-barlow)",
                                fontWeight: 900,
                                fontSize: "16px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "16px 24px",
                                textDecoration: "none",
                                boxShadow: "0 4px 0 #7a3000",
                            }}
                        >
                            <BookOpen size={18} />
                            Browse Archive
                        </Link>
                        <a
                            href={GAME_BASE}
                            className="flex items-center justify-center gap-2 flex-1"
                            style={{
                                backgroundColor: "transparent",
                                color: "#F5E6C8",
                                fontFamily: "var(--font-barlow)",
                                fontWeight: 900,
                                fontSize: "16px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "16px 24px",
                                textDecoration: "none",
                                border: "2px solid rgba(245,230,200,0.25)",
                            }}
                        >
                            <Play size={16} fill="currentColor" />
                            Play the Game
                        </a>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="absolute bottom-6"
                        style={{
                            fontFamily: "var(--font-special-elite)",
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            color: "rgba(184,134,11,0.5)",
                            textTransform: "uppercase",
                        }}
                    >
                        ↓ OPEN DOSSIERS
                    </motion.div>
                </div>
            </section>

            {/* ── FEATURED DOSSIERS ──────────────────────────────── */}
            <section
                id="archive"
                style={{ backgroundColor: "#F5E6C8", padding: "56px 24px" }}
            >
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    {/* Section header */}
                    <div
                        className="flex items-center gap-4 mb-8"
                        style={{ borderBottom: "3px double #2C1810", paddingBottom: "12px" }}
                    >
                        <FileText size={18} style={{ color: "#B71C1C" }} />
                        <span
                            style={{
                                fontFamily: "var(--font-barlow)",
                                fontWeight: 900,
                                fontSize: "13px",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "#2C1810",
                            }}
                        >
                            Filed Dossiers
                        </span>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#B8860B", opacity: 0.4 }} />
                        <span
                            style={{
                                fontFamily: "var(--font-special-elite)",
                                fontSize: "11px",
                                color: "#B8860B",
                            }}
                        >
                            {defectors.length} on record
                        </span>
                    </div>

                    {featured.length > 0 ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                gap: "24px",
                            }}
                        >
                            {featured.map((defector, i) => (
                                <motion.div
                                    key={defector.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.45 }}
                                >
                                    <ArticleCard defector={defector} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                padding: "48px 24px",
                                textAlign: "center",
                                border: "2px dashed rgba(44,24,16,0.2)",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "var(--font-special-elite)",
                                    color: "#9E9E9E",
                                    fontSize: "14px",
                                }}
                            >
                                First dossiers being filed. Check back shortly.
                            </p>
                        </div>
                    )}

                </div>
            </section>

            {/* ── PLAY THE GAME CTA ──────────────────────────────── */}
            <section
                style={{ backgroundColor: "#2C1810", padding: "64px 24px" }}
            >
                <div
                    className="flex flex-col md:flex-row items-center justify-between gap-8"
                    style={{ maxWidth: "1280px", margin: "0 auto" }}
                >
                    <div>
                        <div
                            style={{
                                fontFamily: "var(--font-special-elite)",
                                fontSize: "10px",
                                letterSpacing: "0.25em",
                                color: "#B8860B",
                                textTransform: "uppercase",
                                marginBottom: "10px",
                            }}
                        >
                            Challenge
                        </div>
                        <h2
                            style={{
                                fontFamily: "var(--font-playfair)",
                                fontWeight: 900,
                                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                                color: "#F5E6C8",
                                lineHeight: 1.15,
                                margin: 0,
                            }}
                        >
                            You've read the dossiers.
                            <br />
                            <span style={{ color: "#FF6B00" }}>
                                Now identify the defectors.
                            </span>
                        </h2>
                    </div>
                    <motion.a
                        href={GAME_BASE}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 shrink-0"
                        style={{
                            backgroundColor: "#FF6B00",
                            color: "#fff",
                            fontFamily: "var(--font-barlow)",
                            fontWeight: 900,
                            fontSize: "18px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            padding: "18px 36px",
                            textDecoration: "none",
                            boxShadow: "0 5px 0 #7a3000",
                        }}
                    >
                        <Play size={20} fill="currentColor" />
                        Play the Game
                    </motion.a>
                </div>
            </section>

        </div>
    );
}
