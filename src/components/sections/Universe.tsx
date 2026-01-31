"use client";

import { motion } from "framer-motion";


import SkillsBouncing from "@/components/SkillsBouncing";

const traits = [
    { label: "Engineering", value: "2nd Year CSE @ VJIT, Hyderabad. Building scalable full-stack applications with React, Node.js, and modern web technologies." },
    { label: "Data Science", value: "Passionate about ML, Python, and Tableau. Transforming data into actionable insights and predictive models." },
    { label: "Problem Solving", value: "Active on LeetCode, solving algorithmic challenges and continuously improving coding skills." }
];

export default function Universe() {
    return (
        <section id="identity" className="relative min-h-screen bg-background flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
            <div className="max-w-4xl w-full text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-xs sm:text-sm uppercase tracking-[0.5em] sm:tracking-[0.8em] md:tracking-[1em] text-accent mb-12 sm:mb-16 md:mb-20"
                >
                    The Identity
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-24 md:mb-32">
                    {traits.map((trait, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex flex-col items-center px-4"
                        >
                            <span className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 uppercase tracking-tighter">{trait.label}</span>
                            <p className="text-secondary text-xs sm:text-sm leading-relaxed tracking-wide">
                                {trait.value}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16 sm:mb-24 md:mb-32"
                >
                    <SkillsBouncing />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative p-6 sm:p-8 md:p-12 border border-border-custom rounded-xl sm:rounded-2xl bg-gradient-to-b from-card-bg/50 to-background overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary-rgb),0.05),transparent)] pointer-events-none" />

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6">Let&apos;s build something extraordinary</h3>
                    <p className="text-secondary mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed text-sm sm:text-base px-2">
                        Passionate full-stack developer and data scientist. Currently pursuing B.Tech in Computer Science at VJIT, Hyderabad.
                        Open to collaborative projects, internships, and opportunities that challenge me to grow.
                    </p>
                    <div className="mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm text-accent space-y-1 sm:space-y-2 max-w-xl mx-auto px-2">
                        <p className="flex items-center justify-center gap-2 flex-wrap">
                            <span>📍</span>
                            <span>Based in Hyderabad, India</span>
                        </p>
                        <p className="flex items-center justify-center gap-2 flex-wrap">
                            <span>🎓</span>
                            <span className="text-center">Vidya Jyothi Institute of Technology (VJIT)</span>
                        </p>
                        <div className="flex flex-col items-center gap-2 mt-4">
                            <p className="text-[10px] uppercase tracking-widest text-primary/60">Contact Directly</p>
                            <p className="flex items-center justify-center gap-4 flex-wrap text-foreground font-medium">
                                <a href="mailto:jaswanthre9@gmail.com" className="hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30">jaswanthre9@gmail.com</a>
                                <span className="w-1 h-1 rounded-full bg-border-custom" />
                                <a href="tel:+918008154808" className="hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30">+91 8008154808</a>
                            </p>
                        </div>
                    </div>

                    <a
                        href="mailto:jaswanthre9@gmail.com"
                        className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-primary text-background font-bold uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-xs hover:opacity-90 transition-opacity rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                    >
                        Send an Inquiry
                    </a>



                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
                        <a href="https://www.linkedin.com/in/jasreaug/" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors">LinkedIn</a>
                        <a href="https://github.com/Jaswanth-Reddy-2006" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors">GitHub</a>
                        <a href="https://leetcode.com/u/Jaswanth_Reddy_2006/" target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors">LeetCode</a>
                    </div>
                </motion.div>
            </div>

            {/* Decorative bottom element */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
