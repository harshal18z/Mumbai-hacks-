import React, { useState } from 'react';
import { sendChatMessage } from '../api/Coach';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!message) return;
    const reply = await sendChatMessage(message, { recentTransactions: [] });
    setChat([...chat, { user: message, bot: reply }]);
    setMessage('');
  };

  return (
    <div>
      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>Bot:</b> {c.bot}</p>
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask me anything about your finances..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
