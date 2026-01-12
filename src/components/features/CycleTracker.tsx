
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
      case "Menstrual": return "from-romantic-pink-300 to-romantic-pink-500";
      case "Follicular": return "from-romantic-blue-300 to-romantic-blue-400";
      case "Ovulation": return "from-yellow-200 to-yellow-400";
      case "Luteal": return "from-romantic-lavender-300 to-romantic-lavender-400";
      default: return "from-gray-200 to-gray-300";
    }
  };

  const progress = (daysIntoCycle / cycle.cycleLength) * 100;

  return (
    <div className="glass-card p-8 mb-8 relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-romantic-text">Cycle Harmony 🌸</h2>
      
      {!cycle.lastPeriodDate ? (
        <div className="text-center py-10">
          <p className="mb-4 text-lg">Tell me when your last cycle began, beautiful...</p>
          <input
            type="date"
            onChange={handleDateChange}
            className="p-3 rounded-xl border border-romantic-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-romantic-pink-300"
          />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Circular Progress (Simplified as visual) */}
            <div className="relative w-48 h-48 flex items-center justify-center">
                 {/* Svg Circle */}
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" strokeWidth="12" className="text-white/30 fill-none" />
                    <motion.circle 
                        cx="96" cy="96" r="88" strokeWidth="12" 
                        fill="none" 
                        stroke="currentColor"
                        className="text-romantic-pink-400 drop-shadow-lg"
                        strokeDasharray={2 * Math.PI * 88}
                        initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold text-romantic-text">{daysIntoCycle}</span>
                    <span className="text-xs uppercase tracking-widest opacity-70">Day of Cycle</span>
                 </div>
            </div>

            <div className="flex-1 space-y-4">
                <div>
                   <h3 className="text-xl font-semibold flex items-center gap-2">
                     Current Phase: <span className={`bg-gradient-to-r ${getPhaseColor()} bg-clip-text text-transparent`}>{currentPhase}</span>
                   </h3>
                   <p className="text-sm opacity-80 mt-1">
                      {currentPhase === "Menstrual" && "Time to rest and recharge 🌙"}
                      {currentPhase === "Follicular" && "Your energy is rising like a flower 🌱"}
                      {currentPhase === "Ovulation" && "You are glowing and magnetic ✨"}
                      {currentPhase === "Luteal" && "Turn inward and care for yourself 🌸"}
                   </p>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase opacity-60">Next Period</span>
                        <span className="font-medium">
                            {cycle.lastPeriodDate && format(addDays(new Date(cycle.lastPeriodDate), cycle.cycleLength), "MMM do")}
                        </span>
                    </div>
                     <button onClick={() => setCycleData({ lastPeriodDate: null })} className="text-xs text-romantic-pink-400 hover:text-romantic-pink-500 underline self-end">
                        Reset Cycle
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
