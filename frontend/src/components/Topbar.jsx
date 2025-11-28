import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import useProfile from "../hooks/useProfile";

export default function Topbar() {
  const navigate = useNavigate();
  const { username, occupation } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const greetings = {
    Student: "Let’s build smart habits early 🎓",
    Employee: "Let’s optimize your salary better 💼",
    Business: "Track growth & cash flow smartly 📈",
    Other: "Good to see you managing your money 💚"
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/profile");
    window.location.reload();
  };

  return (
    <header className="bg-[#F0F7EC] shadow-sm p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#3E7C59]">
        {username ? `Welcome back, ${username} 👋` : "Welcome 👋"}
        <div className="text-sm text-[#556B5A]">{greetings[occupation]}</div>
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/transactions")}
          className="bg-[#A8D5BA] text-[#3E7C59] px-4 py-2 rounded-xl hover:bg-[#8FCFA0] transition"
        >
          + Add Transaction
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 bg-[#EAF5E1] px-3 py-2 rounded-xl hover:bg-[#DDF2CF] text-[#3E7C59]"
          >
            {username || "User"} <ChevronDown size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border border-[#A8D5BA] rounded-lg overflow-hidden">
              <button
                onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                className="block w-full text-left px-4 py-2 hover:bg-[#F0F7EC] text-[#3E7C59]"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-[#FBE3E3] text-[#A04F4F]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
