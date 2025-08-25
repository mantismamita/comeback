'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Activity } from '@/types/Activity';

type ActivitiesContextType = {
  peakActivity: Activity | null;
  currentActivity: Activity | null;
  setPeakActivity: (activity: Activity | null) => void;
  setCurrentActivity: (activity: Activity | null) => void;
  clearActivities: () => void;
};

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const [peakActivity, setPeakActivity] = useState<Activity | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  const clearActivities = () => {
    setPeakActivity(null);
    setCurrentActivity(null);
  };

  return (
    <ActivitiesContext.Provider
      value={{
        peakActivity,
        currentActivity,
        setPeakActivity,
        setCurrentActivity,
        clearActivities,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
}
