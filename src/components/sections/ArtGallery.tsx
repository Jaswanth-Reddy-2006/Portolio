"use client";

import { useState, useRef } from "react";
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
    const sectionRef = useRef<HTMLDivElement>(null);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Horizontal translation calculation
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(artworks.length - 1) * 100}vw`]);

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className="relative bg-background"
            style={{ height: `${artworks.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Title Overlay */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.1, 0.1, 0]),
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-widest text-foreground text-center px-4">
                        Selected Works
                    </h2>
                    <p className="mt-4 text-accent tracking-[0.3em] text-xs sm:text-sm uppercase text-center px-4">
                        Intersection of pixels and logic
                    </p>
                </motion.div>

                {/* Progress Indicators */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                    {artworks.map((_, index) => {
                        const start = index / artworks.length;
                        const end = (index + 1) / artworks.length;
                        const opacity = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);
                        const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [1, 1.5, 1]);

                        return (
                            <motion.div
                                key={index}
                                style={{ opacity, scale }}
                                className="w-2 h-2 rounded-full bg-primary"
                            />
                        );
                    })}
                </div>

                {/* Horizontal Moving Slider */}
                <motion.div
                    style={{ x }}
                    className="flex h-full w-max will-change-transform"
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
        </section>
    );
}

function CardItem({ art, index, total, scrollYProgress, imageError, onImageError }: any) {
    // Range where this card is in the center
    const start = index / total;
    const end = (index + 1) / total;
    const center = (start + end) / 2;

    const scale = useTransform(scrollYProgress, [start, center, end], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [start, center, end], [0.5, 1, 0.5]);
    const rotateY = useTransform(scrollYProgress, [start, center, end], [25, 0, -25]);

    return (
        <div className="w-screen h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24">
            <motion.div
                style={{
                    scale,
                    opacity,
                    rotateY,
                    perspective: "1200px"
                }}
                className="group relative w-full max-w-[1000px] h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-card-bg border border-border-custom hover:border-primary/30 transition-shadow duration-700 shadow-2xl"
            >
                {!imageError ? (
                    <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                        onError={onImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card-bg to-background">
                        <div className="text-center p-8">
                            <div className="text-6xl mb-4">🎨</div>
                            <h4 className="text-xl font-bold uppercase tracking-widest text-foreground">{art.title}</h4>
                            <p className="text-xs text-accent mt-2 uppercase tracking-widest">Masterpiece in training</p>
                        </div>
                    </div>
                )}

                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 sm:p-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="max-w-xl"
                    >
                        <span className="text-xs text-primary font-bold uppercase tracking-[0.4em] mb-3 block">
                            {art.type}
                        </span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-4">
                            {art.title}
                        </h3>
                        <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6 font-medium">
                            {art.description}
                        </p>
                        <div className="h-[1px] w-12 bg-primary/50" />
                    </motion.div>
                </div>

                {/* Progress Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-background/50 backdrop-blur-md border border-border-custom rounded-full">
                    <span className="text-[10px] font-black tracking-[0.3em] text-foreground/80">
                        {index + 1} / {total}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
