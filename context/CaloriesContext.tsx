"use client";

import { createContext, useContext, useState } from "react";

type CaloriesContextType = {
  maintenanceCalories: number;
  setMaintenanceCalories: (calories: number) => void;
};

const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

export function CaloriesProvider({ children }: { children: React.ReactNode }) {
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);

  return (
    <CaloriesContext.Provider value={{ maintenanceCalories, setMaintenanceCalories }}>
      {children}
    </CaloriesContext.Provider>
  );
}

export const useCalories = () => {
  const context = useContext(CaloriesContext);
  if (!context) throw new Error("useCalories must be used within CaloriesProvider");
  return context;
};
