"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
        >
          <div className="glass-card !bg-white/20 !backdrop-blur-2xl p-5 flex items-center gap-4 shadow-[0_20px_50px_rgba(142,68,173,0.3)] border border-romantic-purple-300/50">
            <div className="shrink-0">
              {type === "success" ? (
                <CheckCircle2 className="text-romantic-purple-500" size={28} />
              ) : (
                <AlertCircle className="text-red-500" size={28} />
              )}
            </div>
            <p className="flex-1 text-sm font-bold text-romantic-text/90 tracking-tight leading-snug">
              {message}
            </p>
            <button
              onClick={onClose}
              className="text-romantic-purple-400 hover:text-romantic-purple-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
