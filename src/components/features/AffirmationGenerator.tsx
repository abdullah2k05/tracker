
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AFFIRMATIONS = [
  "You are worthy of all the love in the universe 🔮",
  "Your heart is a beautiful garden, tending to it is enough 🦄",
  "Every breath you take is a wave of peace ✨",
  "You are strong, soft, and magnificent 🦋",
  "The world is gentler because you are in it 🎆",
  "Your feelings are valid and your soul is precious 💜",
  "Resting is a productive and beautiful act ☪️",
];

export const AffirmationGenerator = () => {
  const [affirmation, setAffirmation] = useState(AFFIRMATIONS[0]);

  const generateNew = () => {
    const random = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    setAffirmation(random);
  };

  return (
    <div className="glass-card p-12 text-center my-12 bg-gradient-to-br from-white/40 to-romantic-purple-100/20 relative overflow-hidden group">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-romantic-purple-300/10 rounded-full blur-2xl group-hover:bg-romantic-purple-300/20 transition-colors" />
        
        <AnimatePresence mode="wait">
            <motion.p
                key={affirmation}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-3xl md:text-4xl font-bold text-romantic-text mb-12 leading-relaxed tracking-tight italic"
            >
                &quot;{affirmation}&quot;
            </motion.p>
        </AnimatePresence>
        
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(142, 68, 173, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={generateNew}
            className="bg-gradient-to-r from-romantic-purple-400 to-romantic-purple-500 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-romantic-purple-200/50 hover:from-romantic-purple-500 hover:to-romantic-purple-600 transition-all duration-300 transform"
        >
            Send Me Another Love Note 💜
        </motion.button>
    </div>
  );
};
