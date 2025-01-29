const feedback = [
  "🤗 Nicely Done! 🤗",
  "🚀 Nailed it! 🚀",
  "👍 Well done! 👍",
  "✅ Bravo! ✅",
  "🖐️ High-five! 🖐️",
  "🤩 Great JOB! 🤩",
  "🔥 Thats Awesome! 🔥",
  "👏 Amazing job! 👏",
  "👌 Super-duper! 👌",
  "💯 That was PERFECT! 💯",
];

export function getRandomFeedback() {
  const randomIndex = Math.floor(Math.random() * feedback.length);
  const randomValue = feedback[randomIndex];

  return randomValue;
}
