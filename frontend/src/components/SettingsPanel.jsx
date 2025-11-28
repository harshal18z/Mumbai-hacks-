import React from 'react'

export default function SettingsPanel({ lang, setLang, persona, setPersona, onDelete }) {
  return (
    <div className="p-4 rounded-xl bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Settings</div>
        <div className="text-xs text-gray-400">Privacy & Consent</div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between"><div>Language</div>
          <select value={lang} onChange={e => setLang(e.target.value)} className="px-2 py-1 rounded">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
        <div className="flex items-center justify-between"><div>Coach Persona</div>
          <select value={persona} onChange={e => setPersona(e.target.value)} className="px-2 py-1 rounded">
            <option value="supportive">🌿 Supportive</option>
            <option value="analyst">💼 Analyst</option>
            <option value="direct">⚡ Direct</option>
          </select>
        </div>
        <div className="pt-2">
          <button onClick={onDelete} className="px-3 py-2 rounded bg-red-100 text-red-600">Delete my data</button>
        </div>
      </div>
    </div>
  )
}
