"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Globe, Database, Layers, Zap, Terminal, ExternalLink, Github, Fingerprint, Activity } from "lucide-react";

// Project Data
const PROJECTS = [
    {
        id: "01",
        title: "AlgoScope",
        subtitle: "Algorithm Visualization Platform",
        description: "A comprehensive interactive platform designed to demystify complex algorithms. Features step-by-step execution, memory visualization, and complexity analysis in real-time.",
        tags: ["React", "TypeScript", "D3.js", "Algorithmic Analysis"],
        status: "Online",
        type: "Feature",
        link: "https://algoscope.vercel.app",
        github: "https://github.com/Jaswanth-Reddy-2006/algoscope",
        image: "/images/projects/algoscope-dashboard.png",
        glitchText: "VISUALIZING_LOGIC"
    },
    {
        id: "02",
        title: "Neural Strokes",
        subtitle: "Generative AI Art Engine",
        description: "An experimental engine transforming neural network patterns into digital masterpieces. Explores the boundary between machine precision and artistic chaos.",
        tags: ["Python", "TensorFlow", "WebGL", "Generative Art"],
        status: "Prototype",
        type: "Experimental",
        link: "#",
        github: null,
        image: "/images/neural_strokes.png",
        glitchText: "DREAMING_MACHINES"
    },
    {
        id: "03",
        title: "Data Harvest",
        subtitle: "Agritech IoT Dashboard",
        description: "High-performance visualization specifically for agricultural IoT sensors. 3D terrain mapping combined with real-time soil health monitoring.",
        tags: ["Node.js", "Three.js", "IoT Protocols", "Big Data"],
        status: "Deployed",
        type: "Enterprise",
        link: "#",
        github: null,
        image: "/images/data_harvest.png",
        glitchText: "CULTIVATING_DATA"
    },
    {
        id: "04",
        title: "Algorithm Flow",
        subtitle: "Biological Logic Sim",
        description: "Conceptual exploration of code as organic matter. Visualizing data structures as living, breathing biological systems.",
        tags: ["Processing", "p5.js", "Organic Simulation"],
        status: "Archived",
        type: "Art",
        link: "#",
        github: null,
        image: "/images/algorithm_flow.png",
        glitchText: "ORGANIC_COMPUTATION"
    }
];

export default function InnovationLabs() {
    const [activeId, setActiveId] = useState(PROJECTS[0].id);
    const [isHovering, setIsHovering] = useState(false);

    const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

    return (
        <section className="relative min-h-screen bg-background py-20 px-4 sm:px-10 overflow-hidden flex flex-col justify-center">

            {/* Section Header */}
            <div className="max-w-7xl mx-auto w-full mb-16 relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground"
                >
                    Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Disrupt.</span> Deploy.
                </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Project List (Left Side) */}
                <div className="lg:col-span-5 flex flex-col space-y-2">
                    {PROJECTS.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: parseInt(project.id) * 0.1 }}
                        >
                            <button
                                onClick={() => setActiveId(project.id)}
                                onMouseEnter={() => { setActiveId(project.id); setIsHovering(true); }}
                                onMouseLeave={() => setIsHovering(false)}
                                className={`w-full text-left p-6 sm:p-8 rounded-xl border transition-all duration-300 group relative overflow-hidden ${activeId === project.id
                                    ? "bg-card-bg border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
                                    : "bg-transparent border-border-custom hover:border-primary/30 hover:bg-card-bg/30"
                                    }`}
                            >
                                {/* Hover background fill */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent transition-transform duration-500 ease-out origin-left ${activeId === project.id ? "scale-x-100" : "scale-x-0"
                                    }`} />

                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className={`font-mono text-xs ${activeId === project.id ? "text-primary" : "text-accent"}`}>
                                                {project.id} //
                                            </span>
                                            <h3 className={`text-2xl font-bold uppercase tracking-tight ${activeId === project.id ? "text-foreground" : "text-secondary group-hover:text-foreground"}`}>
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-accent uppercase tracking-widest pl-10">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    <div className={`transition-transform duration-300 ${activeId === project.id ? "rotate-90 text-primary" : "text-border"}`}>
                                        <Code className="w-5 h-5" />
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Project Preview (Right Side) */}
                <div className="lg:col-span-7 h-[500px] lg:h-[600px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="absolute inset-0 rounded-3xl overflow-hidden border border-border-custom bg-card-bg/40 backdrop-blur-sm"
                        >
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                            {/* Project Image */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="space-y-6"
                                >
                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-accent text-xs font-mono">
                                            <Activity className="w-4 h-4 text-green-500" />
                                            <span>STATUS: {activeProject.status}</span>
                                            <span className="opacity-30">|</span>
                                            <span>TYPE: {activeProject.type}</span>
                                        </div>
                                        <p className="text-secondary text-lg leading-relaxed max-w-xl">
                                            {activeProject.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <a href={activeProject.link} className="flex-1 sm:flex-none">
                                            <button className="w-full flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                                                <ExternalLink className="w-4 h-4" />
                                                Initialize
                                            </button>
                                        </a>
                                        {activeProject.github && (
                                            <a href={activeProject.github} target="_blank" rel="noreferrer">
                                                <button className="p-4 rounded-xl border border-border-custom bg-background/50 text-foreground hover:bg-card-bg hover:border-primary/50 transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </button>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Glitch Overlay Text */}
                            <div className="absolute top-8 right-8 z-10 opacity-20 hidden sm:block">
                                <h4 className="text-6xl font-black uppercase text-transparent stroke-text tracking-tighter opacity-50 select-none vertical-text">
                                    {activeProject.glitchText}
                                </h4>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
