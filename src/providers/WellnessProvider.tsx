"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export type CyclePhase = "Menstrual" | "Follicular" | "Ovulation" | "Luteal";

export interface CycleData {
  lastPeriodDate: string | null; // ISO string
  cycleLength: number;
  periodLength: number;
}

export interface MoodLog {
  id: string;
  date: string; // ISO string date-only
  mood: string;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  text: string;
}

export interface RantEntry {
  id: string;
  date: string;
  content: string;
}

export interface WellnessState {
  cycle: CycleData;
  moods: MoodLog[];
  gratitude: GratitudeEntry[];
  rants: RantEntry[];
  setCycleData: (data: Partial<CycleData>) => Promise<void>;
  addMood: (mood: string) => Promise<void>;
  addGratitude: (text: string) => Promise<void>;
  addRant: (text: string) => Promise<void>;
  loaded: boolean;
  user: any;
}

export const WellnessContext = createContext<WellnessState | undefined>(undefined);

export const WellnessProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  const [cycle, setCycle] = useState<CycleData>({
    lastPeriodDate: null,
    cycleLength: 28,
    periodLength: 5,
  });
  const [moods, setMoods] = useState<MoodLog[]>([]);
  const [gratitude, setGratitude] = useState<GratitudeEntry[]>([]);
  const [rants, setRants] = useState<RantEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch Profile Configuration
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setCycle({
            lastPeriodDate: profile.last_period_date,
            cycleLength: profile.cycle_length,
            periodLength: profile.period_length,
          });
        }

        // Fetch Moods
        const { data: moodData } = await supabase
          .from("mood_logs")
          .select("*")
          .order("date", { ascending: false });
        if (moodData) setMoods(moodData);

        // Fetch Gratitude
        const { data: gratitudeData } = await supabase
          .from("gratitude_entries")
          .select("*")
          .order("created_at", { ascending: false });
        if (gratitudeData) {
            setGratitude(gratitudeData.map((g: any) => ({
                id: g.id,
                date: g.created_at,
                text: g.content
            })));
        }

        // Fetch Rants
        const { data: rantData } = await supabase
          .from("rants")
          .select("*")
          .order("created_at", { ascending: false });
        if (rantData) {
            setRants(rantData.map((r: any) => ({
                id: r.id,
                date: r.created_at,
                content: r.content
            })));
        }

      } else {
        // Try to load from local storage fallback
        const saved = localStorage.getItem("romantic-wellness-data");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.cycle) setCycle(parsed.cycle);
            if (parsed.moods) setMoods(parsed.moods);
            if (parsed.gratitude) setGratitude(parsed.gratitude);
            if (parsed.rants) setRants(parsed.rants);
          } catch {}
        }
      }
      setLoaded(true);
    };

    initData();
  }, []);

  // Sync to local storage for guests
  useEffect(() => {
    if (loaded && !user) {
      localStorage.setItem("romantic-wellness-data", JSON.stringify({ cycle, moods, gratitude, rants }));
    }
  }, [cycle, moods, gratitude, rants, loaded, user]);

  const setCycleData = async (data: Partial<CycleData>) => {
    const newCycle = { ...cycle, ...data };
    setCycle(newCycle);

    if (user) {
      await supabase.from("profiles").update({
        last_period_date: newCycle.lastPeriodDate,
        cycle_length: newCycle.cycleLength,
        period_length: newCycle.periodLength,
      }).eq("id", user.id);
    }
  };

  const addMood = async (mood: string) => {
    const today = new Date().toISOString().split("T")[0];
    
    // Optimistic UI updates
    setMoods((prev) => {
      const filtered = prev.filter((m) => m.date !== today);
      return [...filtered, { id: 'temp', date: today, mood }];
    });

    if (user) {
      // Upsert
      await supabase.from("mood_logs").upsert(
        { user_id: user.id, date: today, mood },
        { onConflict: "user_id, date" }
      );
      // Re-fetch to get accurate IDs if necessary, or just rely on state
    }
  };

  const addGratitude = async (text: string) => {
    const tempId = Date.now().toString();
    const date = new Date().toISOString();
    setGratitude((prev) => [{ id: tempId, date, text }, ...prev]);

    if (user) {
      const { data, error } = await supabase.from("gratitude_entries").insert({
        user_id: user.id,
        content: text,
      }).select().single();

      if (data) {
          setGratitude((prev) => prev.map(g => g.id === tempId ? { ...g, id: data.id } : g));
      }
    }
  };

  const addRant = async (text: string) => {
    const tempId = Date.now().toString();
    const date = new Date().toISOString();
    setRants((prev) => [{ id: tempId, date, content: text }, ...prev]);

    if (user) {
        const { data } = await supabase.from("rants").insert({
            user_id: user.id,
            content: text,
        }).select().single();

        if (data) {
            setRants((prev) => prev.map(r => r.id === tempId ? { ...r, id: data.id } : r));
        }
    }
  }

  return (
    <WellnessContext.Provider value={{ cycle, moods, gratitude, rants, setCycleData, addMood, addGratitude, addRant, loaded, user }}>
      {children}
    </WellnessContext.Provider>
  );
};
