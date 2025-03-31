"use client";

import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export type UserData = {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  bmi: number;
  calories: number;
};

export type FoodEntry = {
  id: number;
  food: string;
  portion: string;
  calories: number;
  date: string; // Store date to organize entries by day
};

export const storage = {
  getUserKey: async () => {
    const session = await getSession();
    if (!session?.user?.email) {
      redirect("/signin");
      return null;
    }
    return session.user.email;
  },

  saveUserData: async (data: UserData) => {
    const userKey = await storage.getUserKey();
    if (!userKey) return;
    localStorage.setItem(`user_data_${userKey}`, JSON.stringify(data));
  },

  getUserData: async (): Promise<UserData | null> => {
    const userKey = await storage.getUserKey();
    if (!userKey) return null;
    const data = localStorage.getItem(`user_data_${userKey}`);
    return data ? JSON.parse(data) : null;
  },

  saveFoodEntries: async (entries: FoodEntry[]) => {
    try {
      const userKey = await storage.getUserKey();
      if (!userKey) return;
      const today = new Date().toISOString().split("T")[0];
      const existingEntries = await storage.getAllFoodEntries();

      // Update today's entries
      const updatedEntries = {
        ...existingEntries,
        [today]: entries.map((entry) => ({
          ...entry,
          date: today, // Ensure date is set correctly
        })),
      };

      localStorage.setItem(
        `food_entries_${userKey}`,
        JSON.stringify(updatedEntries)
      );
      console.log("Saved entries for today:", updatedEntries[today]);
    } catch (error) {
      console.error("Failed to save entries:", error);
      throw error;
    }
  },

  getAllFoodEntries: async (): Promise<Record<string, FoodEntry[]>> => {
    try {
      const userKey = await storage.getUserKey();
      if (!userKey) return {};
      const entriesJson = localStorage.getItem(`food_entries_${userKey}`);
      if (!entriesJson) return {};

      const entries = JSON.parse(entriesJson);
      console.log("Retrieved all entries:", entries);
      return entries;
    } catch (error) {
      console.error("Failed to get entries:", error);
      return {};
    }
  },

  getFoodEntries: async (): Promise<FoodEntry[]> => {
    const allEntries = await storage.getAllFoodEntries();
    const today = new Date().toISOString().split("T")[0];
    return allEntries[today] || [];
  },

  getTodaysFoodEntries: async (): Promise<FoodEntry[]> => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const allEntries = await storage.getAllFoodEntries();

      // Ensure we return today's entries with the correct date
      const todayEntries = allEntries[today] || [];
      console.log("Today's entries:", todayEntries);

      return todayEntries.map((entry) => ({
        ...entry,
        date: today,
      }));
    } catch (error) {
      console.error("Failed to get today's entries:", error);
      return [];
    }
  },

  clearUserData: async () => {
    const userKey = await storage.getUserKey();
    if (!userKey) return;
    localStorage.removeItem(`user_data_${userKey}`);
    localStorage.removeItem(`food_entries_${userKey}`);
  },
};
