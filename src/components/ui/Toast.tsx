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
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
        >
          <div className={`glass-card p-4 flex items-center gap-3 shadow-2xl border-white/50 ${
            type === "success" ? "bg-green-50/20" : "bg-red-50/20"
          }`}>
            <div className={type === "success" ? "text-green-500" : "text-red-500"}>
              {type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
            <p className="flex-1 text-sm font-medium text-romantic-text">
              {message}
            </p>
            <button
              onClick={onClose}
              className="text-romantic-text/40 hover:text-romantic-text transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
