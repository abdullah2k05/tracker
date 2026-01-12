
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    { text: "Breathe in deeply... 🔮", duration: 4000, scale: 1.5 },
    { text: "Hold gently... ✨", duration: 4000, scale: 1.5 },
    { text: "Breathe out slowly... 💜", duration: 4000, scale: 1 },
];

export const BreathingExercise = () => {
    const [isActive, setIsActive] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive) {
            const currentStep = STEPS[stepIndex];
            timer = setTimeout(() => {
                setStepIndex((prev) => (prev + 1) % STEPS.length);
            }, currentStep.duration);
        }
        return () => clearTimeout(timer);
    }, [isActive, stepIndex]);

    useEffect(() => {
        if (!isActive) {
            // eslint-disable-next-line
            setStepIndex(0);
        }
    }, [isActive]);

    return (
        <div className="glass-card p-8 text-center mt-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-romantic-purple-400/10 blur-3xl -ml-16 -mt-16 group-hover:bg-romantic-purple-400/20 transition-colors duration-500" />
            
            <h3 className="text-2xl font-bold mb-8 text-romantic-text tracking-tight">Moment of Peace</h3>
            
            <div className="relative h-72 flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                    {isActive ? (
                        <motion.div
                            key="circle"
                            animate={{ 
                                scale: STEPS[stepIndex].scale,
                                opacity: [0.9, 1, 0.9],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                scale: { duration: STEPS[stepIndex].duration / 1000, ease: "easeInOut" },
                                opacity: { duration: 2, repeat: Infinity },
                                rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="w-40 h-40 bg-gradient-to-br from-romantic-purple-300 via-romantic-purple-400 to-romantic-purple-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(155,89,182,0.5)] border-4 border-white/30"
                        >
                             <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="text-white font-bold text-xl drop-shadow-lg px-6 leading-tight"
                             >
                                {STEPS[stepIndex].text.replace("🔮", "").replace("✨", "").replace("💜", "")}
                             </motion.div>
                        </motion.div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsActive(true)}
                            className="w-40 h-40 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-romantic-text font-bold text-xl border-4 border-romantic-purple-200 cursor-pointer shadow-2xl hover:border-romantic-purple-400 hover:text-romantic-purple-600 transition-all duration-500"
                        >
                            Start
                        </motion.button>
                    )}
                </AnimatePresence>
                
                {/* Ripples */}
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[0, 1, 2].map((i) => (
                          <motion.div 
                            key={i}
                            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
                            className="absolute border-2 border-romantic-purple-300/40 rounded-full w-40 h-40"
                          />
                        ))}
                    </div>
                )}
            </div>

            {isActive && (
                <button 
                  onClick={() => setIsActive(false)} 
                  className="px-6 py-2 rounded-full text-sm font-bold text-romantic-text/40 hover:text-romantic-purple-500 hover:bg-white/40 transition-all"
                >
                    End Session
                </button>
            )}
        </div>
    );
};
