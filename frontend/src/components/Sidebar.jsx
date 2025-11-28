// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  List, 
  Target, 
  Bot, 
  Settings, 
  User, 
  Wallet, 
  PiggyBank, 
  FileText, 
  Landmark 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Transactions", path: "/transactions", icon: <List size={20} /> },
  { name: "Goals", path: "/goals", icon: <Target size={20} /> },
  { name: "Coach", path: "/coach", icon: <Bot size={20} /> },

  // ✅ Newly Added
  { name: "Budget Planner", path: "/budget", icon: <Wallet size={20} /> },
  { name: "Smart Savings", path: "/savings", icon: <PiggyBank size={20} /> },
  { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
  { name: "Bank Connect", path: "/bank-connect", icon: <Landmark size={20} /> },

  { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#F0F7EC] p-4 flex flex-col shadow-lg">
      <h1 className="text-2xl font-bold mb-8 text-[#3E7C59]">PaisaPath💸</h1>
      <h5 className="text-xs font-bold mb-5 text-[#505168] italic">
        Other apps track your money. Ours talks to you about it — like a real coach.
      </h5>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                isActive
                  ? "bg-[#A8D5BA] text-[#3E7C59] font-semibold"
                  : "text-[#556B5A] hover:bg-[#E6F8B2]"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto text-center text-xs text-[#556B5A]">
        © 2025 PaisaPath
      </div>
    </aside>
  );
}
