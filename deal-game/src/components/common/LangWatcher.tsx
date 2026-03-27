"use client";

import { useEffect } from "react";
import { useLangStore } from "@/store/langStore";

export default function LangWatcher() {
    const { lang } = useLangStore();

    useEffect(() => {
        const root = document.documentElement;
        if (lang === "ml") {
            root.setAttribute("lang", "ml");
            root.classList.add("lang-ml");
        } else {
            root.setAttribute("lang", "en");
            root.classList.remove("lang-ml");
        }
    }, [lang]);

    return null;
}
