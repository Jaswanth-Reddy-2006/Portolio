"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
        };
        setIsTouchDevice(checkTouch());
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY, isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[10000] h-4 w-4 rounded-full bg-white mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 border border-white/20 rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
}
