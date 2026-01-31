"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: progress / 100 }}
                            className="h-[1px] w-64 bg-primary transform origin-left"
                        />
                        <div className="mt-4 flex items-center gap-10">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-accent/40">
                                Constructing Universe
                            </span>
                            <span className="text-[10px] uppercase font-mono text-accent w-10 text-right">
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
