"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "@/components/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        gsap.fromTo(
            textRef.current.children,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out",
            }
        );
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background text-foreground"
        >
            <HeroCanvas />

            <div
                ref={textRef}
                className="z-10 flex flex-col items-center space-y-4 text-center pointer-events-none select-none"
            >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase tracking-tighter px-4 text-primary">
                    Jaswanth
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] sm:tracking-[0.4em] text-secondary px-4">
                    Full-Stack Developer & Data Scientist
                </h2>
                <p className="mt-4 text-xs sm:text-sm text-accent tracking-[0.2em] max-w-2xl px-4">
                    Crafting digital experiences through code, data, and creativity
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent/60 px-4">
                    <span>VJIT, Hyderabad</span>
                    <span className="h-[1px] w-4 sm:w-8 bg-border-custom" />
                    <span>2nd Year CSE</span>
                    <span className="h-[1px] w-4 sm:w-8 bg-border-custom" />
                    <span>2024-2028</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-accent"
            >
                Scroll to Explore
            </motion.div>
        </section>
    );
}
