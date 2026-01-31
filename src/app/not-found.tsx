"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            404
          </h1>
          <h2 className="text-4xl font-bold text-foreground uppercase tracking-tight">
            Page Not Found
          </h2>
          <p className="text-secondary text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4 pt-8">
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-border-custom bg-background/50 text-foreground px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-card-bg hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

