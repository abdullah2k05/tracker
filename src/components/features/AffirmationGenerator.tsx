
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AFFIRMATIONS = [
  "You are worthy of all the love in the universe 💖",
  "Your heart is a beautiful garden, tending to it is enough 🌸",
  "Every breath you take is a wave of peace ✨",
  "You are strong, soft, and magnificent 🦋",
  "The world is gentler because you are in it 🌍",
  "Your feelings are valid and your soul is precious 💕",
  "Resting is a productive and beautiful act 🌙",
].map(text => text);

export const AffirmationGenerator = () => {
  const [affirmation, setAffirmation] = useState(AFFIRMATIONS[0]);

  const generateNew = () => {
    const random = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    setAffirmation(random);
  };

  return (
    <div className="glass-card p-10 text-center my-8 bg-gradient-to-br from-white/40 to-romantic-pink-100/30">
        <AnimatePresence mode="wait">
            <motion.p
                key={affirmation}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="text-2xl md:text-3xl font-bold text-romantic-text mb-8 leading-relaxed font-serif italic"
            >
                &quot;{affirmation}&quot;
            </motion.p>
        </AnimatePresence>
        
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNew}
            className="bg-romantic-pink-300 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-romantic-pink-200/50 hover:bg-romantic-pink-400 transition-colors"
        >
            Send Me Another Love Note 💕
        </motion.button>
    </div>
  );
};
