
"use client";

import { useWellnessStore } from "@/hooks/useWellnessStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast, ToastType } from "@/components/ui/Toast";

const MOODS = [
  { label: "Loved", emoji: <span role="img" aria-label="loved">😊</span>, color: "bg-romantic-purple-200/50" },
  { label: "Calm", emoji: <span role="img" aria-label="calm">😐</span>, color: "bg-romantic-purple-100/50" },
  { label: "Low", emoji: <span role="img" aria-label="low">😔</span>, color: "bg-gray-200/50" },
  { label: "Overwhelmed", emoji: <span role="img" aria-label="overwhelmed">😣</span>, color: "bg-romantic-purple-300/50" },
];

export const MoodTracker = () => {
  const { addMood, addGratitude, moods, gratitude } = useWellnessStore();
  const [gratitudeInput, setGratitudeInput] = useState("");
  const [clickedMood, setClickedMood] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const sendEmailNotification = async (type: "mood" | "gratitude", data: Record<string, string>) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });
      if (!response.ok) throw new Error("Failed to send notification");
      return true;
    } catch (error) {
      console.error("Notification Error:", error);
      return false;
    }
  };

  const handleMoodSelect = async (moodLabel: string) => {
    setClickedMood(moodLabel);
    setTimeout(() => setClickedMood(null), 300); // 0.3s bounce duration

    // 1. Update State & LocalStorage immediately
    addMood(moodLabel);
    showToast(`Mood logged: ${moodLabel} 💜`, "success");

    // 2. Send Background Notification
    const emojiStr = MOODS.find(m => m.label === moodLabel)?.label || "";
    await sendEmailNotification("mood", { mood: moodLabel, emoji: emojiStr });
  };

  const handleGratitudeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = gratitudeInput.trim();
    if (text) {
      addGratitude(text);
      setGratitudeInput("");
      showToast("Gratitude saved! ✨", "success");
      await sendEmailNotification("gratitude", { text });
    }
  };

  const todaysMood = moods.find(m => m.date === new Date().toISOString().split("T")[0]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Mood Section */}
        <div className="glass-card p-8 group">
          <h3 className="text-2xl font-bold mb-6 text-romantic-text flex items-center gap-2">
            How is your heart? <span className="text-romantic-purple-400 group-hover:rotate-12 transition-transform">💜</span>
          </h3>
          <div className="flex justify-between gap-3">
            {MOODS.map((m) => {
              const isSelected = todaysMood?.mood === m.label;
              const isClicked = clickedMood === m.label;

              return (
                <motion.button
                  key={m.label}
                  animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(m.label)}
                  title={m.label}
                  className={`flex flex-col items-center flex-1 p-4 rounded-3xl transition-all duration-300 ${
                    isSelected 
                      ? `${m.color} shadow-[0_0_20px_rgba(155,89,182,0.3)] border-2 border-romantic-purple-300` 
                      : "hover:bg-white/40 border-2 border-transparent"
                  }`}
                >
                  <span className="text-4xl mb-2 filter drop-shadow-sm">{m.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-romantic-text/70">{m.label}</span>
                </motion.button>
              );
            })}
          </div>
          {todaysMood && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mt-6 p-4 bg-white/30 rounded-2xl text-center text-sm font-medium text-romantic-text italic border border-white/50"
              >
                 You are feeling <strong>{todaysMood.mood}</strong> today. Sending you light 🔮
              </motion.div>
          )}
        </div>

        {/* Gratitude Section */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-romantic-text">Gratitude Journal</h3>
          <form onSubmit={handleGratitudeSubmit} className="flex gap-3 mb-6">
            <input
              type="text"
              value={gratitudeInput}
              onChange={(e) => setGratitudeInput(e.target.value)}
              placeholder="What made you smile? ✨"
              className="flex-1 p-4 rounded-2xl border-2 border-romantic-purple-100 bg-white/40 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-romantic-purple-300/30 transition-all text-sm font-medium placeholder:text-romantic-text/40"
            />
            <button type="submit" className="glass-button !py-3 !px-6 text-sm">Save</button>
          </form>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                  {gratitude.slice(0, 5).map((g) => (
                      <motion.div
                          key={g.id}
                          initial={{ opacity: 0, x: -20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, height: 0 }}
                          className="p-4 bg-white/40 rounded-2xl text-sm italic border-l-4 border-romantic-purple-400 font-medium text-romantic-text/80 backdrop-blur-sm"
                      >
                          &quot;{g.text}&quot;
                      </motion.div>
                  ))}
              </AnimatePresence>
              {gratitude.length === 0 && (
                <div className="text-center py-6 opacity-40 italic flex flex-col items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <p className="text-xs font-bold uppercase tracking-widest">Your beautiful memories will appear here</p>
                </div>
              )}
          </div>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </>
  );
};
