"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    image: string;
    placeholder?: string;
    category: string;
    features?: string[];
    status?: string;
}

const projects: Project[] = [
    {
        title: "AlgoScope",
        description: "A comprehensive algorithm visualization and learning platform. Explore data structures and algorithms through interactive visualizations. Features include step-by-step algorithm execution, complexity analysis, and interactive code playground.",
        technologies: ["React", "TypeScript", "Node.js", "D3.js"],
        githubUrl: "https://github.com/Jaswanth-Reddy-2006/algoscope",
        liveUrl: "https://algoscope.vercel.app",
        image: "/images/projects/algoscope-dashboard.png",
        placeholder: "/images/projects/algoscope-dashboard-placeholder.svg",
        category: "Web Development",
        features: ["Visualization", "Education", "Interactive"],
        status: "Live"
    },
    {
        title: "Neural Strokes",
        description: "An AI-powered generative art platform that transforms neural network patterns into beautiful digital masterpieces. Explores the intersection of deep learning and aesthetic expression.",
        technologies: ["Python", "TensorFlow", "React", "WebGL"],
        githubUrl: null,
        liveUrl: null,
        image: "/images/neural_strokes.png",
        category: "Artificial Intelligence",
        features: ["Generative Art", "Neural Networks", "Real-time Rendering"],
        status: "Prototype"
    },
    {
        title: "Data Harvest",
        description: "A high-performance data visualization engine for real-time monitoring of agricultural IoT sensors. Provides deep insights into soil health and crop growth through intuitive dashboards.",
        technologies: ["Node.js", "Three.js", "PostgreSQL", "IoT"],
        githubUrl: null,
        liveUrl: null,
        image: "/images/data_harvest.png",
        category: "Data Science",
        features: ["IoT Integration", "Real-time Analytics", "3D Visualization"],
        status: "Completed"
    },
    {
        title: "Algorithm Flow",
        description: "A conceptual exploration of data structures as living organisms. This project visualizes complex computational flows as biological systems, highlighting the organic nature of logic.",
        technologies: ["Processing", "p5.js", "Canvas API"],
        githubUrl: null,
        liveUrl: null,
        image: "/images/algorithm_flow.png",
        category: "Conceptual Art",
        features: ["Abstract Visualization", "Mathematical Beauty", "Generative Systems"],
        status: "Exhibited"
    }
];

export default function Projects() {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    return (
        <section id="projects" className="relative min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 md:mb-20 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground mb-3 sm:mb-4">
                        Selected Projects
                    </h2>
                    <p className="text-accent tracking-widest uppercase text-xs sm:text-sm">
                        Building Digital Solutions
                    </p>
                    <div className="h-[2px] w-24 bg-primary/20 mx-auto mt-6" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative border border-border-custom bg-card-bg/20 backdrop-blur-sm rounded-lg overflow-hidden hover:border-primary/20 transition-all duration-500"
                        >
                            {/* Project Image */}
                            <div className="relative h-64 w-full overflow-hidden bg-card-bg">
                                {!imageErrors[project.title] ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
                                        onError={() => setImageErrors(prev => ({ ...prev, [project.title]: true }))}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card-bg to-background">
                                        <div className="text-center p-4">
                                            <div className="text-6xl mb-2">💻</div>
                                            <p className="text-xs text-accent uppercase tracking-widest">{project.title}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-[10px] uppercase tracking-widest text-accent px-2 py-1 border border-border-custom rounded">
                                        {project.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-sm text-secondary mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Features */}
                                {"features" in project && project.features && (
                                    <div className="mb-4">
                                        <p className="text-[10px] uppercase tracking-widest text-accent mb-2">Key Features:</p>
                                        <ul className="space-y-1">
                                            {project.features.map((feature: string, featureIndex: number) => (
                                                <li key={featureIndex} className="text-xs text-secondary flex items-start gap-2">
                                                    <span className="text-accent/60 mt-1">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Status */}
                                {"status" in project && project.status && (
                                    <div className="mb-4">
                                        <span className="text-[10px] uppercase tracking-widest text-accent/80 px-2 py-1 border border-border-custom rounded">
                                            {project.status}
                                        </span>
                                    </div>
                                )}

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="text-[10px] uppercase tracking-widest text-accent/60 px-2 py-1 border border-border-custom rounded hover:border-primary/20 hover:text-primary transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors"
                                        >
                                            <span>GitHub</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent hover:text-primary transition-colors"
                                        >
                                            <span>Live</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center gap-2">
                                    <div className="h-[1px] w-8 bg-primary/20 group-hover:w-12 transition-all" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/40 group-hover:text-primary">
                                        View Project
                                    </span>
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}

