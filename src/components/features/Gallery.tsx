
"use client";

import { motion } from "framer-motion";

// Redesigned with purple emojis and theme
const CARDS = [
    { emoji: <span role="img" aria-label="bloom">🔮</span>, title: "Bloom", message: "You are blossoming beautifully" },
    { emoji: <span role="img" aria-label="love">💜</span>, title: "Love", message: "You are so deeply loved" },
    { emoji: <span role="img" aria-label="glow">🎆</span>, title: "Glow", message: "Your light shines so bright" },
    { emoji: <span role="img" aria-label="free">🦄</span>, title: "Free", message: "Spread your beautiful wings" },
    { emoji: <span role="img" aria-label="dream">☪️</span>, title: "Dream", message: "Rest and dream sweetly" },
    { emoji: <span role="img" aria-label="magic">✨</span>, title: "Magic", message: "You are pure magic" }
];

export const Gallery = () => {
  return (
    <div className="mt-12 mb-12">
       <h2 className="text-3xl font-bold mb-8 text-center text-romantic-text tracking-tight">Beautiful Moments</h2>
       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
             <motion.div 
                key={i}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  boxShadow: "0 10px 30px rgba(155, 89, 182, 0.2)"
                }}
                className="glass-card p-6 flex flex-col items-center text-center cursor-default transition-all duration-300 border-romantic-purple-100/40 hover:bg-white/50"
             >
                <div className="text-5xl mb-4 filter drop-shadow-md transform group-hover:scale-110 transition-transform">{card.emoji}</div>
                <h4 className="font-bold text-xl mb-1 text-romantic-text">{card.title}</h4>
                <p className="text-xs font-medium text-romantic-text/60 leading-relaxed">{card.message}</p>
             </motion.div>
          ))}
       </div>
    </div>
  );
};
