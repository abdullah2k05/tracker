"use client";

import { useState } from "react";
import { useWellnessStore } from "@/hooks/useWellnessStore";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export const RantingJournal = () => {
  const { rants, addRant, loaded, user } = useWellnessStore();
  const [newRant, setNewRant] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!loaded) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRant.trim()) return;

    setIsSubmitting(true);
    await addRant(newRant.trim());
    setNewRant("");
    setIsSubmitting(false);
  };

  return (
    <div className="glass-card p-8 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-romantic-pink-300/10 blur-3xl -mr-16 -mt-16 group-hover:bg-romantic-pink-300/20 transition-colors duration-500" />
      
      <h2 className="text-3xl font-bold mb-6 text-romantic-text tracking-tight flex items-center gap-3">
        Safe Space Journal <span className="text-romantic-pink-400 animate-pulse">✍️</span>
      </h2>
      
      <p className="text-romantic-text/80 mb-6 italic text-sm">
        Write it down, let it go. Your thoughts are safe here.
      </p>

      <form onSubmit={handleSubmit} className="mb-8 relative z-10">
        <textarea
          value={newRant}
          onChange={(e) => setNewRant(e.target.value)}
          placeholder="Vent, rant, or just write your heart out..."
          className="w-full p-4 rounded-2xl border-2 border-romantic-pink-100 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-romantic-pink-300/30 transition-all text-romantic-text font-medium min-h-[120px] resize-y shadow-inner mb-4"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center">
            {!user && (
               <p className="text-xs text-romantic-pink-500 font-medium bg-romantic-pink-50 px-3 py-1 rounded-full border border-romantic-pink-200">
                  Guest Mode: Sign in to save across devices
               </p>
            )}
            {user && <span />}
            <button
                type="submit"
                disabled={!newRant.trim() || isSubmitting}
                className="bg-gradient-to-r from-romantic-pink-400 to-romantic-lavender-400 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(255,182,193,0.4)] hover:shadow-[0_0_20px_rgba(255,182,193,0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
            {isSubmitting ? "Saving..." : "Let it out 🍃"}
            </button>
        </div>
      </form>

      <div className="space-y-4 relative z-10">
        <h3 className="text-lg font-bold text-romantic-text mb-4 border-b border-romantic-pink-100 pb-2">Previous Pages</h3>
        
        {rants.length === 0 ? (
          <div className="text-center py-8 opacity-60">
            <p className="italic">Your journal is waiting...</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
            <AnimatePresence>
              {rants.map((rant) => (
                <motion.div
                  key={rant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 bg-white/40 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-bold text-romantic-pink-400 mb-2 tracking-wider uppercase">
                    {format(new Date(rant.date), "MMM d, yyyy • h:mm a")}
                  </p>
                  <p className="text-romantic-text/90 whitespace-pre-wrap leading-relaxed text-sm">
                    {rant.content}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
