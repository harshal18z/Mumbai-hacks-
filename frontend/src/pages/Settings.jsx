import React from "react";
import { Globe, Sprout, User, Bell, Trash2 } from "lucide-react";

export default function Settings({ lang, setLang, persona, setPersona, onDelete }) {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "#F0F7EC" }}>
      <h1 className="text-3xl font-bold text-[#14532D] mb-8">Settings</h1>

      <div className="bg-[#FBFFF3] border border-[#A8D5BA] rounded-2xl shadow p-6 max-w-4xl">

        <h2 className="text-xl font-semibold text-[#14532D] mb-6">
          Account & Preferences
        </h2>

        {/* Language */}
        <div className="flex items-center justify-between py-4 border-b border-[#D9E8CE]">
          <div className="flex items-center gap-3 text-[#14532D] font-medium">
            <Globe size={20} /> Language
          </div>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="p-2 px-3 border bg-white rounded-lg shadow-sm"
          >
            <option>English</option>
            <option>हिन्दी</option>
            <option>मराठी</option>
          </select>
        </div>

        {/* Persona */}
        <div className="flex items-center justify-between py-4 border-b border-[#D9E8CE]">
          <div className="flex items-center gap-3 text-[#14532D] font-medium">
            <Sprout size={20} /> Coach Persona
          </div>

          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="p-2 px-3 border bg-white rounded-lg shadow-sm"
          >
            <option value="supportive">Supportive 🍃</option>
            <option value="strict">Strict 🔥</option>
            <option value="funny">Playful 😄</option>
          </select>
        </div>

        {/* Clickable Options */}
        <div className="mt-6 space-y-3">

          <button className="flex items-center justify-between w-full p-4 bg-white border border-[#D9E8CE] rounded-lg hover:bg-[#F4FAEE] transition cursor-pointer">
            <div className="flex items-center gap-3 text-[#14532D] font-medium">
              <User size={20} /> Profile
            </div>
            <span className="text-[#14532D] opacity-70">›</span>
          </button>

          <button className="flex items-center justify-between w-full p-4 bg-white border border-[#D9E8CE] rounded-lg hover:bg-[#F4FAEE] transition cursor-pointer">
            <div className="flex items-center gap-3 text-[#14532D] font-medium">
              <Bell size={20} /> Notifications
            </div>
            <span className="text-[#14532D] opacity-70">›</span>
          </button>
        </div>

      </div>
    </div>
  );
}

