"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Scene() {
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
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="white" wireframe />
            </mesh>
        </>
    );
}

export default function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Scene />
            </Canvas>
        </div>
    );
}
