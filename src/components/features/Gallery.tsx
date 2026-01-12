
"use client";

import { motion } from "framer-motion";

const CARDS = [
    { emoji: <span role="img" aria-label="bloom">🌸</span>, title: "Bloom", message: "You are blossoming beautifully" },
    { emoji: <span role="img" aria-label="love">💜</span>, title: "Love", "message": "You are so deeply loved" },
    { emoji: <span role="img" aria-label="glow">🌅</span>, title: "Glow", message: "Your light shines so bright" },
    { emoji: <span role="img" aria-label="free">🦋</span>, title: "Free", message: "Spread your beautiful wings" },
    { emoji: <span role="img" aria-label="dream">🌙</span>, title: "Dream", message: "Rest and dream sweetly" },
    { emoji: <span role="img" aria-label="magic">✨</span>, title: "Magic", message: "You are pure magic" }
];

export const Gallery = () => {
  return (
    <div className="mt-8">
       <h2 className="text-2xl font-bold mb-6 text-center text-romantic-text">Beautiful Moments</h2>
       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
             <motion.div 
                key={i}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="glass-card p-6 flex flex-col items-center text-center cursor-default hover:shadow-xl transition-all border-white/60"
             >
                <div className="text-4xl mb-3">{card.emoji}</div>
                <h4 className="font-bold text-lg mb-1">{card.title}</h4>
                <p className="text-xs opacity-80">{card.message}</p>
             </motion.div>
          ))}
       </div>
    </div>
  );
};
