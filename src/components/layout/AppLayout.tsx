
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-romantic-purple-50 text-romantic-text selection:bg-romantic-purple-200">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
        <div className="absolute top-0 -left-10 w-96 h-96 bg-romantic-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-10 w-96 h-96 bg-romantic-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-[30rem] h-[30rem] bg-romantic-purple-300/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-violet-200/20 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 pulse" />
      </div>

      {/* Floating Hearts - Client Only */}
      {mounted && <FloatingHearts />}

      {/* Glass Container - Always Rendered */}
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl">
           {children}
        </div>
      </main>
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{id: number, x: string, duration: number, delay: number, emoji: string}>>([]);

  useEffect(() => {
    const emojis = ["💜", "🔮", "🦄", "☪️", "✨", "🎆", "🌸"];
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "vw",
      duration: 8 + Math.random() * 4, // 8-12s float as per requirements
      delay: Math.random() * 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setHearts(newHearts);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            x: heart.x,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.8],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-2xl md:text-3xl filter drop-shadow-[0_0_8px_rgba(155,89,182,0.4)]"
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};
