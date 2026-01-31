"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const artworks = [
    {
        id: 1,
        title: "Data Harvest",
        type: "Digital Art",
        image: "/images/data_harvest.png",
        description: "Visual representation of data collection and analysis processes"
    },
    {
        id: 2,
        title: "Neural Strokes",
        type: "Generative Art",
        image: "/images/neural_strokes.png",
        description: "AI-generated artwork exploring neural network patterns"
    },
    {
        id: 3,
        title: "Algorithm Flow",
        type: "Visualization",
        image: "/images/algorithm_flow.png",
        description: "Complex algorithm structures visualized through art"
    },
    {
        id: 4,
        title: "BTech Universe",
        type: "Conceptual",
        image: "/images/btech_universe.png",
        description: "The vast universe of computer science and engineering"
    },
];

export default function ArtGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex">
                    {artworks.map((art, index) => (
                        <div key={art.id} className="group relative h-screen w-screen flex-shrink-0 flex items-center justify-center p-4 sm:p-10 md:p-20">

                            {/* Background Ambient Glow */}
                            <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />

                            <div className="relative w-full max-w-[1200px] h-[60vh] sm:h-[70vh] rounded-[2rem] overflow-hidden bg-card-bg border border-border-custom shadow-2xl transition-all duration-700 hover:border-primary/40 group">
                                {!imageErrors[art.id] ? (
                                    <Image
                                        src={art.image}
                                        alt={art.title}
                                        fill
                                        priority
                                        className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                        onError={() => setImageErrors(prev => ({ ...prev, [art.id]: true }))}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-card-bg">
                                        <div className="text-center group-hover:scale-110 transition-transform duration-700">
                                            <div className="text-6xl mb-4 opacity-50">🎨</div>
                                            <h4 className="text-xl font-bold uppercase tracking-widest text-foreground">{art.title}</h4>
                                        </div>
                                    </div>
                                )}

                                {/* Gamer Scanline Overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-[length:100%_2px,3px_100%] shadow-inner" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 sm:p-12 md:p-16">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">
                                        {art.title}
                                    </h3>
                                    <p className="text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-2xl font-medium">
                                        {art.description}
                                    </p>
                                    <div className="mt-8 flex gap-4">
                                        <div className="h-1 w-12 bg-primary/40 rounded-full" />
                                        <div className="h-1 w-6 bg-primary/20 rounded-full" />
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-8 right-8 px-4 py-2 bg-background/50 backdrop-blur-md border border-border-custom rounded-full">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-foreground/60">
                                        EXHIBIT {index + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
