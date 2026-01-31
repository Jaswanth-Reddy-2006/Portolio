"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface LenisOptions {
    lerp: number;
    duration: number;
    smoothWheel: boolean;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
    const options: LenisOptions = { lerp: 0.1, duration: 1.5, smoothWheel: true };
    
    return (
        <ReactLenis root options={options}>
            {children}
        </ReactLenis>
    );
}
