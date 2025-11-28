export const sendChatMessage = async (message, userContext = {}) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/ai/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, userContext }),
    });

    const data = await response.json();
    return data.reply || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠ Gemini AI is not responding right now.";
  }
};

