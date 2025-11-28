// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import DashboardLayout from "./layout/DashboardLayout";

// Existing Pages
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Coach from "./pages/Coach";
import Settings from "./pages/Settings";

// ✅ New Pages
import UserProfile from "./pages/UserProfile";
import BudgetPlanner from "./pages/BudgetPlanner";
import SmartSavings from "./pages/SmartSavings";
import Reports from "./pages/Reports";
import BankConnect from "./pages/BankConnect";

export default function App() {
  // Persisted state data
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [cashFlow, setCashFlow] = useLocalStorage("cashFlow", []);
  const [lang, setLang] = useLocalStorage("lang", "en");
  const [persona, setPersona] = useLocalStorage("persona", "coach");

  // ✅ Check if profile exists
  const userProfileExists = Boolean(localStorage.getItem("userProfile"));

  // Transactions helpers
  const addTransaction = (tx) => {
    const nextId = transactions.length
      ? Math.max(...transactions.map((t) => t.id)) + 1
      : 1;
    setTransactions([...transactions, { id: nextId, ...tx }]);
  };

  const removeTransaction = (id) =>
    setTransactions(transactions.filter((t) => t.id !== id));

  const updateTransaction = (updated) =>
    setTransactions(
      transactions.map((t) => (t.id === updated.id ? updated : t))
    );

  // Cashflow helpers
  const addCashPoint = (point) => setCashFlow([...cashFlow, point]);
  const clearCashFlow = () => setCashFlow([]);

  // Reset data (Settings Page)
  const handleDeleteData = () => {
    setTransactions([]);
    setCashFlow([]);
  };

  // ✅ Calculate total income and expenses dynamically
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ If profile is NOT set, go to UserProfile first */}
        {!userProfileExists && <Route path="*" element={<UserProfile />} />}

        {/* ✅ Main App Layout */}
        {userProfileExists && (
          <Route path="/" element={<DashboardLayout />}>
            {/* Dashboard */}
            <Route
              index
              element={
                <Dashboard
                  transactions={transactions}
                  addTransaction={addTransaction}
                  removeTransaction={removeTransaction}
                  updateTransaction={updateTransaction}
                  cashFlow={cashFlow}
                  addCashPoint={addCashPoint}
                  clearCashFlow={clearCashFlow}
                  lang={lang}
                />
              }
            />

            {/* Transactions */}
            <Route
              path="transactions"
              element={
                <Transactions
                  transactions={transactions}
                  addTransaction={addTransaction}
                  removeTransaction={removeTransaction}
                  updateTransaction={updateTransaction}
                />
              }
            />

            {/* Goals */}
            <Route path="goals" element={<Goals />} />

            {/* AI Coach */}
            <Route
              path="coach"
              element={
                <Coach
                  transactions={transactions}
                  cashFlow={cashFlow}
                  lang={lang}
                  persona={persona}
                />
              }
            />

            {/* Settings */}
            <Route
              path="settings"
              element={
                <Settings
                  lang={lang}
                  setLang={setLang}
                  persona={persona}
                  setPersona={setPersona}
                  onDelete={handleDeleteData}
                />
              }
            />

            {/* ✅ Extra Features */}
            <Route path="profile" element={<UserProfile />} />
            <Route path="budget" element={<BudgetPlanner />} />
            <Route
              path="savings"
              element={
                <SmartSavings
                  transactions={transactions}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                />
              }
            />
            <Route path="reports" element={<Reports />} />
            <Route path="bank-connect" element={<BankConnect />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
