
"use client";

import { useEffect, useState } from "react";

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulation" | "Luteal";

export interface CycleData {
  lastPeriodDate: string | null; // ISO string
  cycleLength: number;
  periodLength: number;
}

export interface MoodLog {
  date: string; // ISO string date-only
  mood: string;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  text: string;
}

export interface WellnessState {
  cycle: CycleData;
  moods: MoodLog[];
  gratitude: GratitudeEntry[];
  setCycleData: (data: Partial<CycleData>) => void;
  addMood: (mood: string) => void;
  addGratitude: (text: string) => void;
}

const STORAGE_KEY = "romantic-wellness-data";

export const useWellnessStore = () => {
  const [cycle, setCycle] = useState<CycleData>({
    lastPeriodDate: null,
    cycleLength: 28,
    periodLength: 5,
  });
  const [moods, setMoods] = useState<MoodLog[]>([]);
  const [gratitude, setGratitude] = useState<GratitudeEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line
        if (parsed.cycle) setCycle(parsed.cycle);
        if (parsed.moods) setMoods(parsed.moods);
        if (parsed.gratitude) setGratitude(parsed.gratitude);
      } catch {
        // failed to load
      }
    }
    setLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cycle, moods, gratitude })
      );
    }
  }, [cycle, moods, gratitude, loaded]);

  const setCycleData = (data: Partial<CycleData>) => {
    setCycle((prev) => ({ ...prev, ...data }));
  };

  const addMood = (mood: string) => {
    const today = new Date().toISOString().split("T")[0];
    setMoods((prev) => {
      // Remove existing for today if any, or just append? Let's append/replace.
      const filtered = prev.filter((m) => m.date !== today);
      return [...filtered, { date: today, mood }];
    });
  };

  const addGratitude = (text: string) => {
    setGratitude((prev) => [
      { id: Date.now().toString(), date: new Date().toISOString(), text },
      ...prev,
    ]);
  };

  return {
    cycle,
    moods,
    gratitude,
    setCycleData,
    addMood,
    addGratitude,
    loaded,
  };
};
