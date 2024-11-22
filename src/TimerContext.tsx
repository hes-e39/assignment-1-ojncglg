import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react"; // Use `import type` for type-only imports

export type Timer = {
  id: string;
  type: "stopwatch" | "countdown" | "XY" | "tabata";
  duration: number;
  status: "not running" | "running" | "completed" | "paused";
};

type TimerContextType = {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  removeTimer: (id: string) => void;
  resetTimers: () => void;
  toggleStartPause: () => void;
  currentTimerIndex: number | null;
  fastForward: () => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState<number | null>(null);

  const addTimer = (timer: Timer) => setTimers((prev) => [...prev, timer]);
  const removeTimer = (id: string) =>
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  const resetTimers = () =>
    setTimers((prev) =>
      prev.map((timer) => ({
        ...timer,
        status: "not running",
      }))
    );
  const toggleStartPause = () => setCurrentTimerIndex((prev) => (prev === null ? 0 : null));
  const fastForward = () =>
    setCurrentTimerIndex((prev) => (prev !== null ? prev + 1 : null));

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        removeTimer,
        resetTimers,
        toggleStartPause,
        currentTimerIndex,
        fastForward,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimerContext must be used within a TimerProvider");
  return context;
};
