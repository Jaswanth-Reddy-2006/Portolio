"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const certificates = [
    {
        title: "Meta Front-End Developer",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "Comprehensive front-end development certification covering React, HTML, CSS, and JavaScript",
        category: "Web Development",
        image: "/images/certificates/meta-frontend.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "Advanced React",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "Advanced React concepts including hooks, context, and performance optimization",
        category: "Web Development",
        image: "/images/certificates/advanced-react.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "HTML/CSS in Depth",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "Deep dive into HTML5, CSS3, responsive design, and modern web standards",
        category: "Web Development",
        image: "/images/certificates/html-css.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "JavaScript Programming",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "Master JavaScript fundamentals, ES6+, async programming, and DOM manipulation",
        category: "Programming",
        image: "/images/certificates/javascript.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "UI/UX Design Principles",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "User interface and user experience design principles and best practices",
        category: "Design",
        image: "/images/certificates/ui-ux.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "Coding Interview Preparation",
        issuer: "Meta (Coursera)",
        date: "2024",
        description: "Data structures, algorithms, and problem-solving strategies for technical interviews",
        category: "Programming",
        image: "/images/certificates/coding-interview.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "Data Science Fundamentals",
        issuer: "Various",
        date: "2024",
        description: "Python, pandas, machine learning, and data visualization with Tableau",
        category: "Data Science",
        image: "/images/certificates/data-science.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    },
    {
        title: "Full-Stack Development",
        issuer: "Self-Learning",
        date: "2024",
        description: "Node.js, Express, MongoDB, and building scalable web applications",
        category: "Web Development",
        image: "/images/certificates/fullstack.png",
        placeholder: "/images/certificates/placeholder-certificate.svg"
    }
];

const categories = ["All", "Web Development", "Programming", "Data Science", "Design"];

export default function Certificates() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const filteredCertificates = selectedCategory === "All"
        ? certificates
        : certificates.filter(cert => cert.category === selectedCategory);

    return (
        <section id="certificates" className="relative min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 md:mb-20 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground mb-3 sm:mb-4">
                        Certifications
                    </h2>
                    <p className="text-accent tracking-widest uppercase text-xs sm:text-sm">
                        Validating expertise through continuous learning
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 border rounded-full text-[10px] sm:text-xs uppercase tracking-widest transition-all ${selectedCategory === category
                                ? "border-primary text-primary bg-primary/10"
                                : "border-border-custom text-accent hover:border-primary/30 hover:text-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {filteredCertificates.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-4 sm:p-5 md:p-6 border border-border-custom bg-card-bg/20 backdrop-blur-sm rounded-lg hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="absolute -top-4 -right-4 h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                {/* Certificate Image */}
                                <div className="mb-3 sm:mb-4 relative h-40 sm:h-44 md:h-48 w-full overflow-hidden rounded-lg bg-card-bg border border-border-custom group-hover:border-primary/20 transition-all">
                                    {!imageErrors[cert.title] ? (
                                        <Image
                                            src={cert.image}
                                            alt={cert.title}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            onError={() => setImageErrors(prev => ({ ...prev, [cert.title]: true }))}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card-bg/50 to-background">
                                            <div className="text-center p-4">
                                                <div className="text-4xl mb-2">📜</div>
                                                <p className="text-xs text-accent uppercase tracking-widest">{cert.title}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-[10px] uppercase tracking-widest text-accent px-2 py-1 border border-border-custom rounded">
                                        {cert.category}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-accent/60">
                                        {cert.date}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                                    {cert.title}
                                </h3>

                                <p className="text-sm text-secondary mb-3 italic">
                                    {cert.issuer}
                                </p>

                                <p className="text-xs text-accent leading-relaxed mb-4">
                                    {cert.description}
                                </p>

                                <div className="flex items-center gap-2">
                                    <div className="h-[1px] w-8 bg-primary/20 group-hover:w-12 transition-all" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 group-hover:text-primary">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredCertificates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-zinc-500 text-sm uppercase tracking-widest">
                            No certificates found in this category
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
