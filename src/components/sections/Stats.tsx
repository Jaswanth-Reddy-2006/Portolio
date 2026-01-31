"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
    { label: "LeetCode Problems", value: 150, suffix: "+", description: "Solved problems across various difficulty levels" },
    { label: "GitHub Repositories", value: 20, suffix: "+", description: "Active projects and contributions" },
    { label: "Certifications", value: 8, suffix: "", description: "Professional certifications completed" },
    { label: "Technologies", value: 15, suffix: "+", description: "Programming languages and frameworks mastered" }
];

export default function Stats() {
    const [countedValues, setCountedValues] = useState(stats.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        stats.forEach((stat, index) => {
                            const duration = 2000;
                            const steps = 60;
                            const increment = stat.value / steps;
                            let current = 0;

                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= stat.value) {
                                    setCountedValues((prev) => {
                                        const newValues = [...prev];
                                        newValues[index] = stat.value;
                                        return newValues;
                                    });
                                    clearInterval(timer);
                                } else {
                                    setCountedValues((prev) => {
                                        const newValues = [...prev];
                                        newValues[index] = Math.floor(current);
                                        return newValues;
                                    });
                                }
                            }, duration / steps);
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById("stats-section");
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [hasAnimated]);

    return (
        <section id="stats" className="relative min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
            <div id="stats-section" className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 md:mb-20 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground mb-3 sm:mb-4">
                        Achievements
                    </h2>
                    <p className="text-accent tracking-widest uppercase text-xs sm:text-sm">
                        Numbers that tell a story
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-4 sm:p-6 md:p-8 border border-border-custom bg-card-bg/20 backdrop-blur-sm rounded-lg hover:border-primary/20 transition-all duration-500 text-center"
                        >
                            <div className="absolute -top-4 -right-4 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
                                    {countedValues[i]}{stat.suffix}
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 uppercase tracking-wider">
                                    {stat.label}
                                </h3>
                                <p className="text-[10px] sm:text-xs text-accent leading-relaxed px-2">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 sm:mt-16 md:mt-20 text-center"
                >
                    <div className="inline-block p-4 sm:p-6 md:p-8 border border-border-custom bg-card-bg/20 backdrop-blur-sm rounded-lg">
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-2xl mx-auto px-2">
                            Continuously learning and building. Passionate about creating efficient solutions
                            and contributing to open-source projects. Always exploring new technologies and
                            challenging myself with complex problems.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}

