
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
    <div className="relative min-h-screen overflow-hidden bg-romantic-pink-50 text-romantic-text selection:bg-romantic-pink-200">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 opacity-70 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-romantic-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-romantic-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-romantic-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-romantic-lavender-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pulse" />
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
    const emojis = ["💕", "🌸", "✨", "🦋", "💖"];
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "vw",
      duration: Math.random() * 10 + 10,
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
            y: "100vh",
            x: heart.x,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: heart.duration, // 10-20s float
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-2xl md:text-4xl text-romantic-pink-300/40"
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};
