"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { id: "hero", label: "Identity", icon: "●" },
    { id: "gallery", label: "Gallery", icon: "●" },
    { id: "projects", label: "Canvas", icon: "●" },
    { id: "stats", label: "Stats", icon: "●" },
    { id: "certificates", label: "Certificates", icon: "●" },
    { id: "contact", label: "Connect", icon: "●" },
];

export default function RadialNavigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = window.scrollY / totalHeight;
            setScrolled(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center">
            {/* Scroll Progress Ring */}
            <svg className="absolute h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="var(--border)"
                    strokeWidth="2"
                    fill="transparent"
                />
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray="188.5"
                    style={{ strokeDashoffset: 188.5 - scrolled * 188.5 }}
                />
            </svg>

            <motion.button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-background transition-transform hover:scale-110 active:scale-95"
            >
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">Menu</span>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bottom-12 sm:bottom-16 right-0 flex flex-col items-end gap-2 sm:gap-3"
                        >
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => {
                                        const el = document.getElementById(item.id);
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                        setIsOpen(false);
                                    }}
                                    className="group flex flex-row items-center gap-2 sm:gap-4 cursor-pointer touch-manipulation"
                                >
                                    <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground opacity-100 sm:opacity-0 transition-opacity group-hover:opacity-100">
                                        {item.label}
                                    </span>
                                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/40 ring-1 ring-primary/20 transition-all group-hover:bg-primary group-hover:ring-primary/50" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
