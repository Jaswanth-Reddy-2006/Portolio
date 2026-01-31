"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Code2,
    Atom,
    Server,
    Database,
    GitBranch,
    Cpu,
    Globe,
    Terminal,
    Layers,
    Zap,
    Braces
} from 'lucide-react';

const SKILLS = [
    { name: 'React', icon: Atom, color: '#61DAFB' },
    { name: 'JavaScript', icon: Zap, color: '#F7DF1E' },
    { name: 'TypeScript', icon: Braces, color: '#3178C6' },
    { name: 'Node.js', icon: Server, color: '#339933' },
    { name: 'Python', icon: Code2, color: '#3776AB' },
    { name: 'MongoDB', icon: Database, color: '#47A248' },
    { name: 'SQL', icon: Database, color: '#4479A1' },
    { name: 'Git', icon: GitBranch, color: '#F05032' },
    { name: 'Next.js', icon: Globe, color: '#ffffff' },
    { name: 'Tailwind', icon: Layers, color: '#06B6D4' },
    { name: 'Express', icon: Terminal, color: '#ffffff' },
    { name: 'ML', icon: Cpu, color: '#FF9900' },
];

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    skill: typeof SKILLS[0];
}

export default function SkillsBouncing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [balls, setBalls] = useState<Ball[]>([]);
    const requestRef = useRef<number>();

    useEffect(() => {
        if (!containerRef.current) return;

        const initBalls = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            const radius = width < 640 ? 25 : 35;

            const initialBalls: Ball[] = SKILLS.map((skill, i) => ({
                x: Math.random() * (width - radius * 2) + radius,
                y: Math.random() * (height - radius * 2) + radius,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius,
                skill
            }));
            setBalls(initialBalls);
        };

        initBalls();

        const animate = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;

            setBalls((prevBalls) => {
                return prevBalls.map((ball) => {
                    let { x, y, vx, vy, radius } = ball;

                    x += vx;
                    y += vy;

                    if (x - radius < 0 || x + radius > width) {
                        vx *= -1;
                        x = x - radius < 0 ? radius : width - radius;
                    }
                    if (y - radius < 0 || y + radius > height) {
                        vy *= -1;
                        y = y - radius < 0 ? radius : height - radius;
                    }

                    return { ...ball, x, y, vx, vy };
                });
            });
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            initBalls();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={sectionRef} className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 sm:mb-16 md:mb-20 text-center"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground mb-3 sm:mb-4">
                    Technical Arena
                </h2>
                <p className="text-accent tracking-widest uppercase text-xs sm:text-sm">
                    Mastering the Stack
                </p>
                <div className="h-[2px] w-24 bg-primary/20 mx-auto mt-6" />
            </motion.div>

            <div
                ref={containerRef}
                className="relative w-full h-[450px] sm:h-[550px] border border-border-custom rounded-3xl bg-card-bg/5 backdrop-blur-sm overflow-hidden group shadow-2xl mb-12"
            >
                {balls.map((ball, i) => (
                    <div
                        key={i}
                        className="absolute flex items-center justify-center rounded-full border border-primary/20 bg-background/90 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
                        style={{
                            left: ball.x - ball.radius,
                            top: ball.y - ball.radius,
                            width: ball.radius * 2,
                            height: ball.radius * 2,
                            color: ball.skill.color,
                            boxShadow: `0 0 15px ${ball.skill.color}15`
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <ball.skill.icon className="w-6 h-6 mb-1" />
                            <span className="text-[8px] font-bold uppercase tracking-tighter text-foreground/80">{ball.skill.name}</span>
                        </div>
                    </div>
                ))}

                {/* Background text */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden text-[12rem] font-black uppercase text-foreground leading-none flex items-center justify-center -rotate-12 translate-y-12">
                    Arena
                </div>
            </div>

            {/* Skills Grid below the animation */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
                {SKILLS.map((skill) => (
                    <motion.span
                        key={skill.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="px-3 sm:px-4 py-1.5 border border-border-custom rounded-full text-[10px] sm:text-xs uppercase tracking-widest text-accent hover:text-primary hover:border-primary/30 transition-all bg-card-bg/5"
                    >
                        {skill.name}
                    </motion.span>
                ))}
            </div>
        </div>
    );
}
