const keywords = {
  Food: ["restaurant", "meal", "cafe", "grocery"],
  Utilities: ["electricity", "water", "gas", "bill", "internet"],
  Entertainment: ["movie", "game", "netflix", "spotify"],
  Income: ["salary", "freelance", "bonus", "project"],
};

export function categorizeTransaction(description) {
  const desc = description.toLowerCase();
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => desc.includes(word))) {
      return category;
    }
  }
  return "Other";
}
