// This mocks a backend call to an LLM for the hackathon MVP
export const generateNutritionSuggestion = async ({ goal, mood, food, time }) => {
  // Simulate network delay for effect
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Determine an appropriate meal based on context
  let mealName = "";
  let calories = "";
  let reason = "";
  let tip = "";

  const timeLower = time.toLowerCase();
  const goalLower = goal.toLowerCase();

  // Very basic NLP-like logic for the mock
  if (timeLower.includes("breakfast") || timeLower.includes("morning")) {
    if (food.toLowerCase().includes("egg")) {
      mealName = "Scrambled Eggs with Spinach";
      calories = "250 kcal";
      reason = "High protein for morning energy. Fits well with your goal of " + goalLower + ".";
      tip = "Drink a glass of water before this meal!";
    } else {
      mealName = "Oatmeal with Berries";
      calories = "300 kcal";
      reason = "Complex carbohydrates provide steady energy for the day.";
      tip = "Add chia seeds for extra omega-3s.";
    }
  } else if (timeLower.includes("dinner") || timeLower.includes("night")) {
    mealName = "Grilled Chicken & Roasted Veggies";
    calories = "450 kcal";
    reason = "Light on carbs for evening digestion. Good for " + goal + ". Matches your " + mood + " mood by being comforting.";
    tip = "Stop eating 2 hours before bed for better sleep.";
  } else {
    // Default / Lunch / Snack
    mealName = "Quinoa Salad Bowl";
    calories = "350 kcal";
    reason = "Balanced macros using available ingredients. Keeps you fueled without a crash.";
    tip = "Chew slowly to help digestion and fullness.";
  }

  // Ensure it fits the strict output rules exactly
  const formattedResponse = `🍽️ Meal: ${mealName}

🔥 Calories: ${calories}

🧠 Reason: ${reason}

⚡ Tip: ${tip}`;

  return {
    rawText: formattedResponse,
    parsed: {
      meal: mealName,
      calories: calories,
      reason: reason,
      tip: tip
    }
  };
};
