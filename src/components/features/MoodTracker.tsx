
"use client";

import { useWellnessStore } from "@/hooks/useWellnessStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast, ToastType } from "@/components/ui/Toast";

const MOODS = [
  { label: "Loved", emoji: <span role="img" aria-label="loved">😊</span>, color: "bg-romantic-pink-200" },
  { label: "Calm", emoji: <span role="img" aria-label="calm">😐</span>, color: "bg-romantic-blue-200" },
  { label: "Low", emoji: <span role="img" aria-label="low">😔</span>, color: "bg-gray-200" },
  { label: "Overwhelmed", emoji: <span role="img" aria-label="overwhelmed">😣</span>, color: "bg-romantic-lavender-200" },
];

export const MoodTracker = () => {
  const { addMood, addGratitude, moods, gratitude } = useWellnessStore();
  const [gratitudeInput, setGratitudeInput] = useState("");
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
    // 1. Update State & LocalStorage immediately for responsiveness
    addMood(moodLabel);
    showToast(`Mood logged: ${moodLabel} 💕`, "success");

    // 2. Send Background Notification
    const emojiStr = MOODS.find(m => m.label === moodLabel)?.label || "";
    await sendEmailNotification("mood", { mood: moodLabel, emoji: emojiStr });
  };

  const handleGratitudeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = gratitudeInput.trim();
    if (text) {
      // 1. Update State & LocalStorage
      addGratitude(text);
      setGratitudeInput("");
      showToast("Gratitude saved! ✨", "success");

      // 2. Send Background Notification
      await sendEmailNotification("gratitude", { text });
    }
  };

  const todaysMood = moods.find(m => m.date === new Date().toISOString().split("T")[0]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood Section */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4 text-romantic-text">How is your heart today?</h3>
          <div className="flex justify-between gap-2">
            {MOODS.map((m) => {
              const isSelected = todaysMood?.mood === m.label;
              return (
                <motion.button
                  key={m.label}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(m.label)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-colors ${isSelected ? m.color + " shadow-md" : "hover:bg-white/40"}`}
                >
                  <span className="text-3xl mb-1">{m.emoji}</span>
                  <span className="text-xs font-medium">{m.label}</span>
                </motion.button>
              );
            })}
          </div>
          {todaysMood && (
              <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="mt-4 p-3 bg-white/30 rounded-xl text-center text-sm">
                  You are feeling <strong>{todaysMood.mood}</strong> today. Sending you love 💕
              </motion.div>
          )}
        </div>

        {/* Gratitude Section */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4 text-romantic-text">Gratitude Journal</h3>
          <form onSubmit={handleGratitudeSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={gratitudeInput}
              onChange={(e) => setGratitudeInput(e.target.value)}
              placeholder="What made you smile? ✨"
              className="flex-1 p-3 rounded-xl border border-romantic-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-romantic-pink-300 text-sm"
            />
            <button type="submit" className="glass-button !py-2 !px-4">Save</button>
          </form>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                  {gratitude.slice(0, 5).map((g) => (
                      <motion.div
                          key={g.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 bg-white/40 rounded-lg text-sm italic border-l-4 border-romantic-pink-300"
                      >
                          &quot;{g.text}&quot;
                      </motion.div>
                  ))}
              </AnimatePresence>
              {gratitude.length === 0 && <p className="text-center text-sm opacity-50 italic py-4">Your beautiful memories will appear here...</p>}
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
