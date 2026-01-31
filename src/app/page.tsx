"use client";

import Hero from "@/components/sections/Hero";

import AuraForge from "@/components/sections/AuraForge";
import InnovationLabs from "@/components/sections/InnovationLabs";
import Stats from "@/components/sections/Stats";
import Certificates from "@/components/sections/Certificates";
import Universe from "@/components/sections/Universe";
import CustomCursor from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import ExperimentalToggle from "@/components/ExperimentalToggle";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <main className="relative min-h-screen bg-background">
        <CustomCursor />

        <Navigation />
        <ExperimentalToggle />
        <ThemeSwitcher />

        <div id="hero">
          <Hero />
        </div>

        <div id="gallery">
          <AuraForge />
        </div>

        <div id="projects">
          <InnovationLabs />
        </div>

        <div id="stats">
          <Stats />
        </div>

        <div id="certificates">
          <Certificates />
        </div>

        <div id="contact">
          <Universe />
        </div>
      </main>
    </SmoothScroll>
  );
}
