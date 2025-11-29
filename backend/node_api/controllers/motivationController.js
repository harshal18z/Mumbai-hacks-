const fetch = require("node-fetch");

exports.getMotivationQuote = async (req, res) => {
  const { occupation } = req.body;
  const prompt = `Give a short motivational financial quote for a ${occupation}.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const quote = data?.choices?.[0]?.message?.content?.trim() || "Stay consistent, and your wallet will thank you!";
    res.json({ quote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ quote: "Keep saving, small steps lead to big results." });
  }
};
