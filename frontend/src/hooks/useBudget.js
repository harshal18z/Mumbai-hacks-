import { useState } from "react";

export default function useBudget() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const addExpense = (item) => setExpenses([...expenses, item]);

  return { budget, setBudget, expenses, addExpense };
}
