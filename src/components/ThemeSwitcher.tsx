"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2 } from "lucide-react";

const themes = [
    { id: "midnight", name: "Midnight", color: "#ffffff" },
    { id: "neon", name: "Neon", color: "#00f2ff" },
    { id: "emerald", name: "Emerald", color: "#10b981" },
    { id: "sunset", name: "Sunset", color: "#f97316" },
    { id: "glacier", name: "Glacier", color: "#38bdf8" },
];

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState(() => {
        if (typeof window === 'undefined') return "midnight";
        return localStorage.getItem("portfolio-theme") || "midnight";
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", currentTheme);
    }, [currentTheme]);

    const toggleTheme = (themeId: string) => {
        setCurrentTheme(themeId);
        document.documentElement.setAttribute("data-theme", themeId);
        localStorage.setItem("portfolio-theme", themeId);
        setIsOpen(false);
    };

    return (
        <div className="fixed top-6 right-16 sm:top-24 sm:right-6 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
                    title="Change Theme"
                >
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.color }}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10, x: 10 }}
                            className="absolute right-0 mt-4 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl min-w-[160px]"
                        >
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 px-2">Select Theme</p>
                            <div className="flex flex-col gap-1 mb-3">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        onClick={() => toggleTheme(theme.id)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5 ${currentTheme === theme.id ? "bg-white/10" : ""
                                            }`}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: theme.color }}
                                        />
                                        <span className="text-xs font-medium text-white/80">{theme.name}</span>
                                        {currentTheme === theme.id && (
                                            <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="h-[1px] bg-white/10 my-2" />
                            <button
                                onClick={() => {
                                    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 py-2 bg-primary/20 hover:bg-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
                            >
                                <Wand2 className="w-3 h-3" />
                                Launch Forge
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
