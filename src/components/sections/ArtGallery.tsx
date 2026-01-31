"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Precise mapping: Over 400vh height, we move 300vw (the distance to see all 4 cards)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(artworks.length - 1) * 100}vw`]);

    return (
        <section
            id="gallery"
            ref={containerRef}
            className="relative bg-background"
            style={{ height: `${artworks.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                {/* Header Overlay */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 0]),
                    }}
                    className="absolute top-20 w-full z-20 text-center pointer-events-none px-4"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground mb-3 sm:mb-4">
                        Selected Works
                    </h2>
                    <p className="text-accent tracking-widest uppercase text-xs sm:text-sm">
                        Where Pixels Meet Logic
                    </p>
                    <div className="h-[2px] w-24 bg-primary/20 mx-auto mt-6" />
                </motion.div>

                {/* Progress Indicators (Vertical) */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 z-30 flex flex-col gap-4">
                    {artworks.map((_, index) => {
                        const count = artworks.length;
                        const center = index / (count - 1);
                        const start = Math.max(0, center - 0.1);
                        const end = Math.min(1, center + 0.1);
                        const active = useTransform(scrollYProgress, [start, center, end], [0.2, 1, 0.2]);

                        return (
                            <motion.div
                                key={index}
                                style={{ opacity: active, scale: active }}
                                className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                        );
                    })}
                </div>

                {/* Horizontal Moving Slider */}
                <div className="flex w-full h-full items-center">
                    <motion.div
                        style={{
                            x,
                            width: `${artworks.length * 100}vw`
                        }}
                        className="flex flex-nowrap will-change-transform"
                    >
                        {artworks.map((art, index) => (
                            <CardItem
                                key={art.id}
                                art={art}
                                index={index}
                                total={artworks.length}
                                scrollYProgress={scrollYProgress}
                                imageError={imageErrors[art.id]}
                                onImageError={() => setImageErrors(prev => ({ ...prev, [art.id]: true }))}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CardItem({ art, index, total, scrollYProgress, imageError, onImageError }: any) {
    // Corrected Mapping
    const center = index / (total - 1);
    const range = 0.33; // focus range
    const start = center - range;
    const end = center + range;

    const scale = useTransform(scrollYProgress, [start, center, end], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [start, center, end], [0.4, 1, 0.4]);
    const rotateY = useTransform(scrollYProgress, [start, center, end], [25, 0, -25]);

    return (
        <div className="w-screen h-screen flex flex-shrink-0 items-center justify-center p-4 sm:p-10 md:p-20 relative lg:perspective-[1200px]">
            <motion.div
                style={{
                    scale,
                    opacity,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="group relative w-full max-w-[1000px] h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden bg-card-bg border border-border-custom hover:border-primary/40 transition-all duration-700 shadow-2xl"
            >
                {!imageError ? (
                    <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        priority={index === 0}
                        className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000"
                        onError={onImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-card-bg">
                        <div className="text-center">
                            <div className="text-6xl mb-6">🎨</div>
                            <h4 className="text-xl font-bold uppercase tracking-widest text-foreground">{art.title}</h4>
                        </div>
                    </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 sm:p-12">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="max-w-xl"
                    >
                        <span className="text-xs text-primary font-bold uppercase tracking-[0.4em] mb-2 block">
                            {art.type}
                        </span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-4">
                            {art.title}
                        </h3>
                        <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
                            {art.description}
                        </p>
                        <div className="h-[1px] w-12 bg-primary/50" />
                    </motion.div>
                </div>

                <div className="absolute top-8 right-8 px-4 py-2 bg-background/50 backdrop-blur-md border border-border-custom rounded-full">
                    <span className="text-[10px] font-black tracking-widest text-foreground/80">
                        {index + 1} / {total}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
