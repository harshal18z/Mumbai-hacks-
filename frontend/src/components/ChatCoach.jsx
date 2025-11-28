import React, { useRef, useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ChatCoach({ chat, setChat, pushChat, goals, acceptMoveToGoal, palette, lang }) {
  const [message, setMessage] = useState('')
  const recognitionRef = useRef(null)

  function handleSendLocal(msg) {
    if (!msg || !msg.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: msg }
    pushChat(userMsg)
    setTimeout(() => {
      // simple rule-based replies
      let reply = 'Nice — I hear you. Would you like a quick tip or a plan?'
      const t = msg.toLowerCase()
      if (t.includes('summary') || t.includes('spend')) {
        const spent = chat.filter(c => c.role !== 'ai' && c.amount < 0).reduce((s, c) => s + Math.abs(c.amount || 0), 0)
        reply = `This week you spent ₹${spent || 0}. Want a weekly saving suggestion?`
      } else if (t.includes('save') || t.includes('buffer')) {
        reply = `I suggest moving ₹150 to Emergency Buffer. Confirm?`
      } else if (t.includes('rent')) {
        reply = `Your rent is due soon — keep at least ₹1,000 as cushion.`
      }
      pushChat({ id: Date.now() + 1, role: 'ai', text: reply })
    }, 600)
  }

  function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Speech API not supported in this browser')
    const rec = new SpeechRecognition()
    rec.onresult = (e) => {
      setMessage(e.results[0][0].transcript)
    }
    rec.start()
    recognitionRef.current = rec
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-3 space-y-3" style={{ maxHeight: 360 }}>
        {chat.map(m => (
          <div key={m.id} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs p-3 rounded-2xl ${m.role === 'ai' ? 'bg-white' : 'bg-[#ecfdf7]'}`}>
              <div className="text-sm">{m.text}</div>

              {m.text.toLowerCase().includes('food') && (
                <div style={{ width: 160, height: 100 }} className="mt-2">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[{ name: 'Food', value: 320 }, { name: 'Other', value: 680 }]}
                        dataKey="value"
                        innerRadius={24}
                        outerRadius={40}
                      >
                        <Cell fill={palette.primary} />
                        <Cell fill={palette.gold} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {m.text.toLowerCase().includes('confirm') && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => acceptMoveToGoal(goals[0].id, 150)}
                    className="px-3 py-2 rounded bg-[#d1fae5]"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => pushChat({ id: Date.now(), role: 'ai', text: 'Okay — no problem.' })}
                    className="px-3 py-2 rounded bg-white border"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t bg-white">
        <div className="flex items-center gap-2">
          <button onClick={startVoice} className="px-2 py-2 rounded bg-[#f3f4f6]">🎤</button>
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 rounded"
            placeholder={lang === 'en' ? 'Say something...' : 'कहें...'}
          />
          <button
            onClick={() => { handleSendLocal(message); setMessage('') }}
            className="px-3 py-2 rounded bg-[#0f766e] text-white"
          >
            Send
          </button>
        </div>

        <div className="mt-2 flex gap-2">
          <button
            onClick={() => { handleSendLocal('Show weekly summary') }}
            className="px-2 py-1 rounded bg-[#eef2ff] text-sm"
          >
            Show weekly summary
          </button>
          <button
            onClick={() => { handleSendLocal('Save ₹200') }}
            className="px-2 py-1 rounded bg-[#fff7ed] text-sm"
          >
            Save ₹200
          </button>
          <button
            onClick={() => { handleSendLocal("What's my rent trend?") }}
            className="px-2 py-1 rounded bg-[#ecfdf7] text-sm"
          >
            What's my rent trend?
          </button>
        </div>
      </div>
    </div>
  )
}
