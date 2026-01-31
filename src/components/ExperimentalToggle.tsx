"use client";

import { useEffect } from "react";

export default function ExperimentalToggle() {
    useEffect(() => {
        // Always enable experimental mode
        document.body.classList.add("experimental-mode");
        
        return () => {
            // Cleanup on unmount (though it should stay on)
            document.body.classList.remove("experimental-mode");
        };
    }, []);

    // No button rendered - experimental mode is always on
    return null;
}
