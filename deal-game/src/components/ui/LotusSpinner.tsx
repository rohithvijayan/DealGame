"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
    visible: boolean;
    label?: string;
}

export default function LotusSpinner({ visible, label }: Props) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        backgroundColor: "rgba(10, 6, 2, 0.88)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {/* Grain overlay reuse */}
                    <div className="grain-overlay pointer-events-none" style={{ opacity: 0.04 }} />

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                        style={{ position: "relative", width: 80, height: 80 }}
                    >
                        <Image
                            src="/lotusCongrss.png"
                            alt=""
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {label && (
                        <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{
                                fontFamily: "var(--font-special-elite)",
                                fontSize: "11px",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "rgba(255, 107, 0, 0.7)",
                            }}
                        >
                            {label}
                        </motion.span>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
