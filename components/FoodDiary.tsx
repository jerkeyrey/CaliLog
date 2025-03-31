"use client";

import { useState, useEffect } from "react";
import { useCalories } from "@/context/CaloriesContext";
import { storage, type FoodEntry } from "@/utils/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Apple,
  UtensilsCrossed,
  Pencil,
  Check,
  X,
} from "lucide-react";

export default function FoodDiary() {
  const { maintenanceCalories } = useCalories();
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    food: "",
    portion: "",
    calories: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    food: "",
    portion: "",
    calories: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        const savedEntries = await storage.getTodaysFoodEntries();
        if (Array.isArray(savedEntries)) {
          console.log("Loaded entries:", savedEntries);
          setEntries(savedEntries);
        } else {
          console.error("Invalid entries format:", savedEntries);
          setEntries([]);
        }
      } catch (error) {
        console.error("Failed to load entries:", error);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadEntries();
  }, []);

  const getCalorieColor = (calories: number) => {
    if (calories > 500) return "text-red-400";
    if (calories > 300) return "text-yellow-400";
    return "text-green-400";
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!maintenanceCalories) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Set Your Daily Target
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Please set your daily calorie target before logging your meals.
          </p>
          <Link
            href="/user-form"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold"
          >
            Calculate Daily Target
          </Link>
        </div>
      </div>
    );
  }

  const addEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.food || !newEntry.portion || !newEntry.calories) return;

    try {
      const today = new Date().toISOString().split("T")[0];
      const newEntryItem: FoodEntry = {
        id: Date.now(),
        food: newEntry.food,
        portion: newEntry.portion,
        calories: Number(newEntry.calories),
        date: today,
      };

      const updatedEntries = [...entries, newEntryItem];
      await storage.saveFoodEntries(updatedEntries);
      setEntries(updatedEntries);
      setNewEntry({ food: "", portion: "", calories: "" });
    } catch (error) {
      console.error("Failed to add entry:", error);
    }
  };

  const removeEntry = async (id: number) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    try {
      await storage.saveFoodEntries(updatedEntries);
      setEntries(updatedEntries);
    } catch (error) {
      console.error("Failed to remove entry:", error);
    }
  };

  const startEditing = (entry: FoodEntry) => {
    setEditingId(entry.id);
    setEditForm({
      food: entry.food,
      portion: entry.portion,
      calories: String(entry.calories),
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ food: "", portion: "", calories: "" });
  };

  const saveEdit = async (id: number) => {
    if (!editForm.food || !editForm.portion || !editForm.calories) return;

    const updatedEntries = entries.map((entry) =>
      entry.id === id
        ? {
            ...entry,
            food: editForm.food,
            portion: editForm.portion,
            calories: Number(editForm.calories),
          }
        : entry
    );

    try {
      await storage.saveFoodEntries(updatedEntries);
      setEntries(updatedEntries);
      setEditingId(null);
      setEditForm({ food: "", portion: "", calories: "" });
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const remainingCalories = maintenanceCalories - totalCalories;
  const progressPercentage = Math.min(
    (totalCalories / maintenanceCalories) * 100,
    100
  );
  const progressColor = remainingCalories >= 0 ? "bg-green-500" : "bg-red-500";

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold text-white mb-6">Food Diary</h1>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl text-white">
              Daily Target:{" "}
              <span className="font-bold">{maintenanceCalories}</span> cal
            </p>
            <p
              className={`text-lg font-medium ${
                remainingCalories >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              Remaining: {remainingCalories} cal
            </p>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-gray-400 text-sm text-right">
            {Math.round(progressPercentage)}% of daily goal
          </div>
        </div>
      </div>

      <form onSubmit={addEntry} className="mb-8 bg-gray-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Food name"
            value={newEntry.food}
            onChange={(e) => setNewEntry({ ...newEntry, food: e.target.value })}
            className="p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Portion size"
            value={newEntry.portion}
            onChange={(e) =>
              setNewEntry({ ...newEntry, portion: e.target.value })
            }
            className="p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Calories"
            value={newEntry.calories}
            onChange={(e) =>
              setNewEntry({ ...newEntry, calories: e.target.value })
            }
            className="p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Food
        </button>
      </form>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <UtensilsCrossed size={24} />
            Today&apos;s Entries
          </h2>
          <p className="text-xl text-gray-400">
            Consumed: <span className="font-bold">{totalCalories}</span> cal
          </p>
        </div>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8 text-gray-400 flex flex-col items-center gap-2">
              <Apple size={40} />
              <p>No meals logged yet today</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                {editingId === entry.id ? (
                  // Edit Mode
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={editForm.food}
                      onChange={(e) =>
                        setEditForm({ ...editForm, food: e.target.value })
                      }
                      className="p-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editForm.portion}
                      onChange={(e) =>
                        setEditForm({ ...editForm, portion: e.target.value })
                      }
                      className="p-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="number"
                      value={editForm.calories}
                      onChange={(e) =>
                        setEditForm({ ...editForm, calories: e.target.value })
                      }
                      className="p-2 bg-gray-800 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  // View Mode
                  <div className="flex-grow">
                    <h3 className="text-white font-medium text-lg">
                      {entry.food}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Portion: {entry.portion}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  {editingId === entry.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(entry.id)}
                        className="text-green-400 hover:text-green-300 p-1 rounded-lg hover:bg-gray-500/20"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-gray-500/20"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-right">
                        <span
                          className={`text-xl font-bold ${getCalorieColor(
                            entry.calories
                          )}`}
                        >
                          {entry.calories}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">cal</span>
                      </div>
                      <button
                        onClick={() => startEditing(entry)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded-lg hover:bg-gray-500/20"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="text-gray-400 hover:text-red-400 p-1 rounded-lg hover:bg-gray-500/20"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
