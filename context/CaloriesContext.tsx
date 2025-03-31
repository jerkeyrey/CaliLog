"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "@/utils/storage";

type CaloriesContextType = {
  maintenanceCalories: number;
  setMaintenanceCalories: (calories: number) => void;
};

const CaloriesContext = createContext<CaloriesContextType | undefined>(
  undefined
);

export function CaloriesProvider({ children }: { children: React.ReactNode }) {
  const [maintenanceCalories, setMaintenanceCalories] = useState(0);

  useEffect(() => {
    const initializeCalories = async () => {
      try {
        const userData = await storage.getUserData();
        if (userData?.calories) {
          setMaintenanceCalories(userData.calories);
        }
      } catch (error) {
        console.error("Failed to load maintenance calories:", error);
      }
    };
    initializeCalories();
  }, []);

  return (
    <CaloriesContext.Provider
      value={{ maintenanceCalories, setMaintenanceCalories }}
    >
      {children}
    </CaloriesContext.Provider>
  );
}

export const useCalories = () => {
  const context = useContext(CaloriesContext);
  if (!context)
    throw new Error("useCalories must be used within CaloriesProvider");
  return context;
};
