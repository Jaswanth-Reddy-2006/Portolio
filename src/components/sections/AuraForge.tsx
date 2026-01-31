"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, TorusKnot, Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Palette, Zap, Sparkles, Wand2, RefreshCcw, Droplet, Move, Layers, Radio } from "lucide-react";

// Aura Presets
const AURA_MOODS = [
    { name: "Overdrive", primary: "#ff003c", secondary: "#1a0005", bg: "#050001", accent: "#ff00ff", shape: "torus" },
    { name: "Deep Sea", primary: "#00f2ff", secondary: "#001a1d", bg: "#000508", accent: "#0066ff", shape: "sphere" },
    { name: "Forest", primary: "#10b981", secondary: "#062016", bg: "#010805", accent: "#34d399", shape: "icosahedron" },
    { name: "Solaris", primary: "#f97316", secondary: "#220e00", bg: "#080300", accent: "#fbbf24", shape: "torus" },
    { name: "Void", primary: "#8b5cf6", secondary: "#120a2e", bg: "#03010a", accent: "#c084fc", shape: "sphere" },
];

function Scene({ color, shape, intensity }: { color: string, shape: string, intensity: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={color} />
            <group>
                <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                    {shape === "sphere" && (
                        <Sphere args={[1, 64, 64]} ref={meshRef}>
                            <MeshDistortMaterial
                                color={color}
                                attach="material"
                                distort={intensity / 100}
                                speed={3}
                                roughness={0.1}
                                metalness={0.9} // Higher metalness for premium feel
                                emissive={color}
                                emissiveIntensity={0.2}
                            />
                        </Sphere>
                    )}
                    {shape === "torus" && (
                        <TorusKnot args={[0.8, 0.3, 100, 16]} ref={meshRef}>
                            <MeshDistortMaterial
                                color={color}
                                attach="material"
                                distort={intensity / 150} // Less distortion for complex shapes
                                speed={3}
                                roughness={0.1}
                                metalness={1}
                                emissive={color}
                                emissiveIntensity={0.2}
                            />
                        </TorusKnot>
                    )}
                    {shape === "icosahedron" && (
                        <Icosahedron args={[1, 0]} ref={meshRef}>
                            <MeshDistortMaterial
                                color={color}
                                attach="material"
                                distort={intensity / 80}
                                speed={2}
                                roughness={0}
                                metalness={1}
                                emissive={color}
                                emissiveIntensity={0.2}
                                flatShading
                            />
                        </Icosahedron>
                    )}
                </Float>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </group>
        </>
    );
}

export default function ThemeForge() {
    const [customColor, setCustomColor] = useState("#ffffff");
    const [activeMood, setActiveMood] = useState("Original");
    const [intensity, setIntensity] = useState(50);
    const [isGlowOn, setIsGlowOn] = useState(true);
    const [activeShape, setActiveShape] = useState("sphere");
    const [isFusing, setIsFusing] = useState(false);

    // Helper function to convert hex to RGB
    const hexToRgb = useCallback((hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }, []);

    // Apply theme to the entire document
    const applyTheme = useCallback((primary: string, bg: string = "#000000", secondary: string = "#111111", accent: string = "#ffffff") => {

        // Trigger fusion animation
        setIsFusing(true);
        setTimeout(() => setIsFusing(false), 800);

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
    }, [hexToRgb]);

    // Load saved forged theme - only apply to DOM on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("forged-theme");
            if (saved) {
                const theme = JSON.parse(saved);
                // Apply theme directly to DOM without triggering state updates
                const root = document.documentElement;
                root.style.setProperty("--primary", theme.primary);
                root.style.setProperty("--background", theme.bg);
                root.style.setProperty("--card-bg", theme.secondary);
                root.style.setProperty("--accent", theme.accent);
                root.style.setProperty("--secondary", theme.secondary);
                root.style.setProperty("--border", `${theme.primary}20`);

                const primaryRGB = hexToRgb(theme.primary);
                if (primaryRGB) {
                    root.style.setProperty("--primary-rgb", `${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}`);
                }
            }
        } catch (e) {
            console.error("Failed to load theme:", e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setCustomColor(color);
        setActiveMood("Custom");
        applyTheme(color, "#000000", "#111111", color);
    };

    const setMood = (mood: typeof AURA_MOODS[0]) => {
        setActiveMood(mood.name);
        setCustomColor(mood.primary);
        setActiveShape(mood.shape);
        applyTheme(mood.primary, mood.bg, mood.secondary, mood.accent);
    };

    const randomize = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        setCustomColor(randomColor);
        setActiveMood("Chaos");
        setActiveShape(["sphere", "torus", "icosahedron"][Math.floor(Math.random() * 3)]);
        applyTheme(randomColor, "#000000", "#111111", randomColor);
    };

    return (
        <section id="gallery" className="relative min-h-screen bg-background py-20 px-4 sm:px-10 overflow-hidden text-foreground">

            {/* Global Fusion Overlay */}
            <AnimatePresence>
                {isFusing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-primary/20 backdrop-blur-3xl pointer-events-none mix-blend-screen"
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Visualizer Side (Left - Larger) */}
                <div className="lg:col-span-7 relative h-[500px] sm:h-[650px] rounded-[30px] overflow-hidden bg-card-bg/20 border border-border-custom backdrop-blur-xl group shadow-2xl">
                    <div className="absolute inset-0 z-0 cursor-move">
                        <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} dpr={[1, 2]}>
                            <Scene color={customColor} shape={activeShape} intensity={intensity} />
                        </Canvas>
                    </div>

                    {/* UI Overlay on Viz */}
                    <div className="absolute top-8 left-8 z-10 space-y-2">
                        <motion.div
                            key={activeMood}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-background/80 backdrop-blur-md px-4 py-2 border border-primary/20 rounded-full flex items-center gap-2 w-fit"
                        >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{activeMood} State</span>
                        </motion.div>
                        <div className="flex gap-2">
                            <div className="bg-background/80backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-full flex items-center gap-2">
                                <Layers className="w-3 h-3 text-accent" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-accent">3D Geometry: {activeShape}</span>
                            </div>
                        </div>
                        <div className="bg-background/80 backdrop-blur-md px-3 py-1.5 border border-white/5 rounded-full flex items-center gap-2 w-fit">
                            <Move className="w-3 h-3 text-accent" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-accent">Drag to Spin</span>
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8 z-10 flex flex-col items-end pointer-events-none">
                        <span className="text-[60px] sm:text-[80px] font-black uppercase text-foreground/5 tracking-tighter leading-none select-none">Forge.</span>
                    </div>
                </div>

                {/* Controls Side (Right - Compact) */}
                <div className="lg:col-span-5 flex flex-col space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h2 className="text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tighter leading-tight">
                            The Aura <span className="text-primary">Forge.</span>
                        </h2>
                        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-lg">
                            An advanced styling engine that re-renders reality. Select a preset mood or deeply customize the fundamental particles of this interface.
                        </p>
                    </motion.div>

                    {/* Mood Grid */}
                    <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                            <Radio className="w-3 h-3" />
                            Select Frequency
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {AURA_MOODS.map((mood) => (
                                <button
                                    key={mood.name}
                                    onClick={() => setMood(mood)}
                                    className={`group relative p-4 rounded-xl border transition-all duration-300 flex flex-col items-start gap-2 overflow-hidden ${activeMood === mood.name
                                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                                        : "bg-card-bg/50 border-border-custom hover:border-primary/50"
                                        }`}
                                >
                                    <div className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                                        <div className="w-12 h-12 rounded-full blur-xl" style={{ backgroundColor: mood.primary }} />
                                    </div>
                                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-card-bg ring-transparent transition-all"
                                        style={{ backgroundColor: mood.primary, boxShadow: activeMood === mood.name ? `0 0 10px ${mood.primary}` : 'none' }}
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground relative z-10">{mood.name}</span>
                                </button>
                            ))}
                            <button
                                onClick={randomize}
                                className="group relative p-4 rounded-xl border border-border-custom bg-card-bg/50 hover:bg-primary/20 transition-all flex flex-col items-center justify-center gap-2"
                            >
                                <RefreshCcw className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Shuffle</span>
                            </button>
                        </div>
                    </div>

                    {/* Custom Color Lab */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-card-bg/80 to-card-bg/40 border border-border-custom backdrop-blur-md space-y-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                                <Palette className="w-4 h-4" />
                                Color & Effects
                            </h3>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={isGlowOn}
                                        onChange={() => setIsGlowOn(!isGlowOn)}
                                        className="sr-only"
                                    />
                                    <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-1 ${isGlowOn ? 'bg-primary' : 'bg-secondary'}`}>
                                        <div className={`w-2 h-2 rounded-full bg-white transition-transform ${isGlowOn ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                    <span className="text-[8px] uppercase font-bold text-accent group-hover:text-primary transition-colors">VFX</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <input
                                    type="color"
                                    value={customColor}
                                    onChange={handleColorChange}
                                    className="w-16 h-16 rounded-full border-4 border-background cursor-pointer overflow-hidden appearance-none bg-transparent relative z-10 hover:scale-110 transition-transform"
                                />
                                <div className="absolute inset-0 bg-primary/40 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between text-[10px] font-bold text-accent uppercase">
                                    <span>Warp Level</span>
                                    <span>{intensity}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={intensity}
                                    min="0"
                                    max="100"
                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                    className="w-full h-1 bg-secondary rounded-full appearance-none accent-primary cursor-pointer hover:accent-primary/80"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full py-4 bg-primary text-background font-black uppercase tracking-[0.5em] text-xs rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] relative overflow-hidden group"
                            onClick={() => applyTheme(customColor)}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Zap className="w-4 h-4 fill-current" />
                                Apply Theme
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Flair */}
            <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        </section>
    );
}
