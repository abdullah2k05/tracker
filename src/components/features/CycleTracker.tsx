
"use client";

import { useWellnessStore, CyclePhase } from "@/hooks/useWellnessStore";
import { differenceInDays, addDays, format } from "date-fns";
import { motion } from "framer-motion";

export const CycleTracker = () => {
  const { cycle, setCycleData, loaded } = useWellnessStore();
  
  const getCycleStats = () => {
      if (!cycle.lastPeriodDate) return { daysIntoCycle: 0, currentPhase: "Unknown" as const };
      
      const lastPeriod = new Date(cycle.lastPeriodDate);
      const today = new Date();
      const diff = differenceInDays(today, lastPeriod);
      // Ensure positive modulo or handle past dates correctly
      const day = (diff >= 0 ? diff % cycle.cycleLength : 0) + 1;
      
      let phase: CyclePhase = "Luteal";
      if (day <= cycle.periodLength) phase = "Menstrual";
      else if (day <= cycle.cycleLength - 14 - 2) phase = "Follicular";
      else if (day <= cycle.cycleLength - 12) phase = "Ovulation";
      
      return { daysIntoCycle: day, currentPhase: phase };
  };

  const { daysIntoCycle, currentPhase } = getCycleStats();

  if (!loaded) return null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCycleData({ lastPeriodDate: e.target.value });
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "Menstrual": return "from-violet-400 to-purple-600";
      case "Follicular": return "from-romantic-purple-300 to-romantic-purple-500";
      case "Ovulation": return "from-indigo-300 to-purple-500";
      case "Luteal": return "from-romantic-purple-400 to-romantic-purple-600";
      default: return "from-gray-300 to-gray-400";
    }
  };

  const progress = (daysIntoCycle / cycle.cycleLength) * 100;

  return (
    <div className="glass-card p-8 mb-8 relative overflow-hidden group">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-romantic-purple-300/10 blur-3xl -mr-16 -mt-16 group-hover:bg-romantic-purple-300/20 transition-colors duration-500" />
      
      <h2 className="text-3xl font-bold mb-6 text-romantic-text tracking-tight flex items-center gap-3">
        Cycle Harmony <span className="text-romantic-purple-400 animate-pulse">🔮</span>
      </h2>
      
      {!cycle.lastPeriodDate ? (
        <div className="text-center py-10 relative z-10">
          <p className="mb-6 text-xl font-medium text-romantic-text/80">Tell me when your last cycle began, beautiful...</p>
          <div className="inline-flex gap-3 items-center">
            <input
              type="date"
              onChange={handleDateChange}
              className="p-4 rounded-2xl border-2 border-romantic-purple-100 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-romantic-purple-300/30 transition-all text-romantic-text font-medium"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            {/* Circular Progress */}
            <div className="relative w-56 h-56 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="112" cy="112" r="100" strokeWidth="16" stroke="rgba(255,255,255,0.2)" fill="none" />
                    <motion.circle 
                        cx="112" cy="112" r="100" strokeWidth="16" 
                        fill="none" 
                        stroke="url(#purpleGradient)"
                        className="drop-shadow-[0_0_12px_rgba(155,89,182,0.5)]"
                        strokeDasharray={2 * Math.PI * 100}
                        initial={{ strokeDashoffset: 2 * Math.PI * 100 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - progress / 100) }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d6a2e8" />
                        <stop offset="100%" stopColor="#9b59b6" />
                      </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-bold text-romantic-text"
                    >
                      {daysIntoCycle}
                    </motion.span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-romantic-purple-500 mt-1">Day of Cycle</span>
                 </div>
            </div>

            <div className="flex-1 space-y-6 w-full">
                <div className="p-6 bg-white/30 rounded-3xl border border-white/40 shadow-inner">
                   <h3 className="text-2xl font-bold flex flex-wrap items-center gap-2 mb-2">
                     Current Phase: <span className={`bg-gradient-to-r ${getPhaseColor()} bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]`}>{currentPhase}</span>
                   </h3>
                   <p className="text-lg font-medium text-romantic-text/70 leading-relaxed italic">
                      {currentPhase === "Menstrual" && "Time to rest and recharge 🌙"}
                      {currentPhase === "Follicular" && "Your energy is rising like a flower 🌱"}
                      {currentPhase === "Ovulation" && "You are glowing and magnetic ✨"}
                      {currentPhase === "Luteal" && "Turn inward and care for yourself 🌸"}
                   </p>
                </div>
                
                <div className="flex justify-between items-end bg-romantic-purple-100/30 p-5 rounded-3xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-romantic-purple-400 mb-1">Next Period</span>
                        <span className="text-xl font-bold text-romantic-text">
                            {cycle.lastPeriodDate && format(addDays(new Date(cycle.lastPeriodDate), cycle.cycleLength), "MMM do")}
                        </span>
                    </div>
                     <button 
                        onClick={() => setCycleData({ lastPeriodDate: null })} 
                        className="text-sm font-bold text-romantic-purple-400 hover:text-romantic-purple-600 transition-colors flex items-center gap-1 group/btn"
                      >
                        Reset Cycle
                        <span className="text-lg group-hover/btn:rotate-180 transition-transform duration-500 focus:outline-none">↺</span>
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
