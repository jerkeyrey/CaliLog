"use client";

import { useState } from "react";
import { useCalories } from "@/context/CaloriesContext";

export default function UserForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "sedentary",
    goal: "maintain",
  });
  const [results, setResults] = useState<{
    bmi: number | null;
    calories: number | null;
  }>({ bmi: null, calories: null });

  const { setMaintenanceCalories } = useCalories();

  const steps = [
    {
      title: "What should we call you?",
      field: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      title: "How old are you?",
      field: "age",
      type: "number",
      placeholder: "Enter your age",
    },
    {
      title: "What's your gender?",
      field: "gender",
      type: "select",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    {
      title: "What's your weight?",
      field: "weight",
      type: "number",
      placeholder: "Weight in kg",
      unit: "kg",
    },
    {
      title: "How tall are you?",
      field: "height",
      type: "number",
      placeholder: "Height in cm",
      unit: "cm",
    },
    {
      title: "What's your activity level?",
      field: "activityLevel",
      type: "select",
      options: [
        { value: "sedentary", label: "Sedentary (little to no exercise)" },
        { value: "lightly active", label: "Lightly Active (1-3 days/week)" },
        {
          value: "moderately active",
          label: "Moderately Active (3-5 days/week)",
        },
        { value: "very active", label: "Very Active (6-7 days/week)" },
        { value: "super active", label: "Super Active (twice per day)" },
      ],
    },
    {
      title: "What's your goal?",
      field: "goal",
      type: "select",
      options: [
        { value: "lose", label: "Lose Weight" },
        { value: "maintain", label: "Maintain Weight" },
        { value: "gain", label: "Gain Weight" },
      ],
    },
  ];

  const calculateMetrics = () => {
    const height = Number(formData.height); // Keep in cm for BMR calculation
    const weight = Number(formData.weight);
    const age = Number(formData.age);

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Calculate BMR using Mifflin-St Jeor Equation
    const bmr =
      formData.gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      "lightly active": 1.375,
      "moderately active": 1.55,
      "very active": 1.725,
      "super active": 1.9,
    };

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee =
      bmr *
      activityMultipliers[
        formData.activityLevel as keyof typeof activityMultipliers
      ];

    // Adjust calories based on goal
    let adjustedCalories = tdee;
    switch (formData.goal) {
      case "lose":
        adjustedCalories = tdee - 500;
        break;
      case "gain":
        adjustedCalories = tdee + 500;
        break;
      default:
        break;
    }

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      calories: Math.round(adjustedCalories),
    });
    setMaintenanceCalories(Math.round(adjustedCalories));
  };

  const getBMIStatus = (
    bmi: number
  ): {
    status: string;
    color: string;
    message: string;
  } => {
    if (bmi < 18.5)
      return {
        status: "Underweight",
        color: "text-yellow-400",
        message:
          "Consider increasing your caloric intake to reach a healthier weight range.",
      };
    if (bmi < 24.9)
      return {
        status: "Healthy Weight",
        color: "text-green-400",
        message: "Great job! You're maintaining a healthy weight range.",
      };
    if (bmi < 29.9)
      return {
        status: "Overweight",
        color: "text-orange-400",
        message:
          "Making small lifestyle changes can help you reach a healthier weight range.",
      };
    return {
      status: "Obese",
      color: "text-red-400",
      message:
        "Consider consulting a healthcare provider about a healthy weight management plan.",
    };
  };

  const handleNext = () => {
    if (step === steps.length - 1) {
      calculateMetrics();
    } else {
      setStep(step + 1);
    }
  };

  const renderInput = () => {
    const currentStep = steps[step];
    if (currentStep.type === "select") {
      return (
        <select
          value={formData[currentStep.field as keyof typeof formData]}
          onChange={(e) =>
            setFormData({ ...formData, [currentStep.field]: e.target.value })
          }
          className="w-full max-w-md p-4 text-xl rounded-lg bg-gray-700 text-white mt-8 border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 font-medium"
        >
          {currentStep.options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-700"
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={currentStep.type}
        placeholder={currentStep.placeholder}
        value={formData[currentStep.field as keyof typeof formData]}
        onChange={(e) =>
          setFormData({ ...formData, [currentStep.field]: e.target.value })
        }
        className="w-full max-w-md p-4 text-xl rounded-lg bg-gray-700 text-white mt-8 text-center border border-gray-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 font-medium placeholder-gray-400"
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-12 bg-gray-800 rounded-2xl shadow-2xl mt-10 transition-all duration-500">
      {results.bmi && results.calories ? (
        <div className="text-center">
          <h3 className="text-4xl font-extrabold text-white mb-10 tracking-tight">
            Hi {formData.name}, here are your
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Results
            </span>
          </h3>
          <div className="space-y-10">
            <div className="p-8 bg-gray-700 rounded-xl shadow-md border border-gray-600">
              <div className="flex flex-col items-center">
                <p className="text-4xl text-white mb-4">
                  <span className="text-blue-400 font-medium tracking-tight">
                    BMI:{" "}
                  </span>
                  <span className="font-extrabold">{results.bmi}</span>
                </p>
                <p
                  className={`text-2xl ${
                    getBMIStatus(results.bmi).color
                  } font-bold mb-3 tracking-wide`}
                >
                  {getBMIStatus(results.bmi).status}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                  {getBMIStatus(results.bmi).message}
                </p>
              </div>
            </div>

            <div className="p-8 bg-gray-700 rounded-xl shadow-md border border-gray-600">
              <div className="flex flex-col items-center">
                <p className="text-4xl text-white mb-2">
                  <span className="text-blue-400 font-medium tracking-tight">
                    Daily Calories:{" "}
                  </span>
                  <span className="font-extrabold">{results.calories}</span>
                </p>
                <p className="text-xl text-gray-300 font-medium">
                  calories per day
                </p>
              </div>
            </div>

            <div className="p-8 bg-gray-700/50 rounded-xl border border-gray-600">
              <p className="text-xl text-gray-300 leading-relaxed">
                Based on your{" "}
                <span className="text-blue-400 font-semibold">
                  {formData.activityLevel}
                </span>{" "}
                activity level
                {formData.goal === "lose" && (
                  <span className="font-medium">
                    {" "}
                    with a 500 calorie deficit for steady weight loss
                  </span>
                )}
                {formData.goal === "gain" && (
                  <span className="font-medium">
                    {" "}
                    with a 500 calorie surplus for steady weight gain
                  </span>
                )}
                {formData.goal === "maintain" && (
                  <span className="font-medium">
                    {" "}
                    to maintain your current weight
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={() => setResults({ bmi: null, calories: null })}
              className="mt-8 px-10 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:scale-105 transform"
            >
              Calculate Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {step === 0 && (
            <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-tight">
              Tell us a bit about yourself
            </h1>
          )}

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white mb-6 tracking-tight">
              {steps[step].title}
            </h2>

            {renderInput()}

            <div className="mt-10 flex justify-center gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {step === steps.length - 1 ? "Calculate" : "Next"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
