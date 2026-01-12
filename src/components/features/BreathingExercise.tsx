
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    { text: "Breathe in deeply... 🌸", duration: 4000, scale: 1.5 },
    { text: "Hold gently... ✨", duration: 4000, scale: 1.5 },
    { text: "Breathe out slowly... 💕", duration: 4000, scale: 1 },
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
        <div className="glass-card p-6 text-center mt-8">
            <h3 className="text-xl font-bold mb-6 text-romantic-text">Moment of Peace</h3>
            
            <div className="relative h-64 flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                    {isActive ? (
                        <motion.div
                            key="circle"
                            animate={{ 
                                scale: STEPS[stepIndex].scale,
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: STEPS[stepIndex].duration / 1000, ease: "easeInOut" }}
                            className="w-32 h-32 bg-gradient-to-br from-romantic-pink-200 to-romantic-lavender-200 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,200,220,0.6)]"
                        >
                             <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-white font-medium text-lg drop-shadow-md px-4"
                             >
                                {STEPS[stepIndex].text.replace("🌸", "").replace("✨", "").replace("💕", "")} <span role="img" aria-label="calm" className="ml-1">✨</span>
                             </motion.div>
                        </motion.div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsActive(true)}
                            className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center text-romantic-text font-medium border-2 border-romantic-pink-200 cursor-pointer shadow-lg"
                        >
                            Start
                        </motion.button>
                    )}
                </AnimatePresence>
                
                {/* Ripples */}
                {isActive && (
                    <>
                        <motion.div 
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }} 
                            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                            className="absolute border border-romantic-pink-300 rounded-full w-32 h-32 pointer-events-none"
                        />
                         <motion.div 
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }} 
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            className="absolute border border-romantic-pink-300 rounded-full w-32 h-32 pointer-events-none"
                        />
                    </>
                )}
            </div>

            {isActive && (
                <button onClick={() => setIsActive(false)} className="text-sm text-romantic-text opacity-60 hover:opacity-100 underline">
                    End Session
                </button>
            )}
        </div>
    );
};
