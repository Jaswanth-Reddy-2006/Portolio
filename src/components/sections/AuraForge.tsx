"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import { Palette, Zap, Sparkles, Wand2, RefreshCcw, Droplet } from "lucide-react";

// Aura Presets
const AURA_MOODS = [
    { name: "Overdrive", primary: "#ff003c", secondary: "#1a0005", bg: "#050001", accent: "#ff00ff" },
    { name: "Deep Sea", primary: "#00f2ff", secondary: "#001a1d", bg: "#000508", accent: "#0066ff" },
    { name: "Forest", primary: "#10b981", secondary: "#062016", bg: "#010805", accent: "#34d399" },
    { name: "Solaris", primary: "#f97316", secondary: "#220e00", bg: "#080300", accent: "#fbbf24" },
    { name: "Void", primary: "#8b5cf6", secondary: "#120a2e", bg: "#03010a", accent: "#c084fc" },
];

function Scene({ color }: { color: string }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={color} />
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <Sphere args={[1, 64, 64]}>
                    <MeshDistortMaterial
                        color={color}
                        attach="material"
                        distort={0.4}
                        speed={3}
                        roughness={0}
                        metalness={1}
                        emissive={color}
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            </Float>
        </>
    );
}

export default function ThemeForge() {
    const [customColor, setCustomColor] = useState("#ffffff");
    const [activeMood, setActiveMood] = useState("Original");
    const [intensity, setIntensity] = useState(50);
    const [isGlowOn, setIsGlowOn] = useState(true);

    // Load saved forged theme
    useEffect(() => {
        const saved = localStorage.getItem("forged-theme");
        if (saved) {
            const theme = JSON.parse(saved);
            setCustomColor(theme.primary);
            setActiveMood("Resonating");
            applyTheme(theme.primary, theme.bg, theme.secondary, theme.accent);
        }
    }, []);

    // Apply theme to the entire document
    const applyTheme = (primary: string, bg: string = "#000000", secondary: string = "#111111", accent: string = "#ffffff") => {
        const root = document.documentElement;
        root.style.setProperty("--primary", primary);
        root.style.setProperty("--background", bg);
        root.style.setProperty("--card-bg", secondary);
        root.style.setProperty("--accent", accent);
        root.style.setProperty("--secondary", secondary);
        root.style.setProperty("--border", `${primary}20`);

        // Save to localStorage
        localStorage.setItem("forged-theme", JSON.stringify({ primary, bg, secondary, accent }));

        // Update complementary colors
        const primaryRGB = hexToRgb(primary);
        if (primaryRGB) {
            root.style.setProperty("--primary-rgb", `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}`);
        }
    };

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setCustomColor(color);
        setActiveMood("Custom");
        applyTheme(color, "#000000", "#111111", color);
    };

    const setMood = (mood: typeof AURA_MOODS[0]) => {
        setActiveMood(mood.name);
        setCustomColor(mood.primary);
        applyTheme(mood.primary, mood.bg, mood.secondary, mood.accent);
    };

    const randomize = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        setCustomColor(randomColor);
        setActiveMood("Chaos");
        applyTheme(randomColor, "#000000", "#111111", randomColor);
    };

    return (
        <section id="gallery" className="relative min-h-screen bg-background py-20 px-4 sm:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Visualizer Side */}
                <div className="relative h-[400px] sm:h-[600px] rounded-3xl overflow-hidden bg-card-bg/20 border border-border-custom backdrop-blur-xl group">
                    <div className="absolute inset-0 z-0">
                        <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                            <Scene color={customColor} />
                        </Canvas>
                    </div>

                    {/* UI Overlay on Viz */}
                    <div className="absolute top-8 left-8 z-10">
                        <motion.div
                            key={activeMood}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-background/80 backdrop-blur-md px-4 py-2 border border-primary/20 rounded-full flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{activeMood} State</span>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end">
                        <span className="text-[40px] font-black uppercase text-foreground/10 tracking-tighter leading-none select-none">Forge Your Soul</span>
                    </div>
                </div>

                {/* Controls Side */}
                <div className="flex flex-col space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter leading-tight">
                            The Aura <span className="text-primary">Forge.</span>
                        </h2>
                        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-lg">
                            Unique in only <span className="text-foreground font-bold italic text-primary">1% of the multiverse</span>.
                            Choose a mood or weave your own fabric of reality. Your aura will instantly permeate every pixel of this portfolio.
                        </p>
                    </motion.div>

                    {/* Mood Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {AURA_MOODS.map((mood) => (
                            <button
                                key={mood.name}
                                onClick={() => setMood(mood)}
                                className={`group relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-start gap-2 ${activeMood === mood.name
                                    ? "bg-primary/10 border-primary"
                                    : "bg-card-bg/50 border-border-custom hover:border-primary/50"
                                    }`}
                            >
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mood.primary }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{mood.name}</span>
                            </button>
                        ))}
                        <button
                            onClick={randomize}
                            className="group relative p-4 rounded-xl border border-border-custom bg-card-bg/50 hover:bg-primary/20 transition-all flex flex-col items-center justify-center gap-2"
                        >
                            <RefreshCcw className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Chaos</span>
                        </button>
                    </div>

                    {/* Custom Color Lab */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-card-bg/40 border border-border-custom backdrop-blur-md space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Deep Customization
                            </h3>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isGlowOn}
                                        onChange={() => setIsGlowOn(!isGlowOn)}
                                        className="sr-only"
                                    />
                                    <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-1 ${isGlowOn ? 'bg-primary' : 'bg-secondary'}`}>
                                        <div className={`w-2 h-2 rounded-full bg-white transition-transform ${isGlowOn ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="text-[8px] uppercase font-bold text-accent">Nitro Glow</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <input
                                    type="color"
                                    value={customColor}
                                    onChange={handleColorChange}
                                    className="w-16 h-16 rounded-full border-4 border-background cursor-pointer overflow-hidden appearance-none bg-transparent"
                                />
                                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-accent uppercase">
                                    <span>Atmospheric Pressure</span>
                                    <span>{intensity}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={intensity}
                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                    className="w-full h-1 bg-secondary rounded-full appearance-none accent-primary cursor-pointer"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-primary text-background font-black uppercase tracking-[0.5em] text-xs rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
                            onClick={() => applyTheme(customColor)}
                        >
                            Fuse Theme to Site
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Flair */}
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
