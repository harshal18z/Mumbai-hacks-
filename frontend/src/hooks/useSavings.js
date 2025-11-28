import { useState } from "react";

export default function useSavings() {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => setGoals([...goals, goal]);

  return { goals, addGoal };
}
