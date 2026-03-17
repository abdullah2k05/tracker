"use client";

import { useContext } from "react";
import { WellnessContext, WellnessState, CyclePhase, CycleData, MoodLog, GratitudeEntry, RantEntry } from "@/providers/WellnessProvider";

export const useWellnessStore = (): WellnessState => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error("useWellnessStore must be used within a WellnessProvider");
  }
  return context;
};

export type { CyclePhase, CycleData, MoodLog, GratitudeEntry, RantEntry };
