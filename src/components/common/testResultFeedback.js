const feedback = [
  (name) => "The journey of a thousand miles begins with a single step!", //0-9%
  (name) => `Great effort ${name}! Spelly knows you’ll nail it next time!`, //10-19%
  (name) => `Good job starting out ${name}!`,
  (name) => `You're improving ${name}! Lets aim higher next time!`,
  (name) => `Nice effort ${name}! You’re building your skills, step by step.`,
  (name) => `Good job ${name}! You’re past halfway—let’s keep going!`,
  (name) => "Spelly can see your hard work paying off—keep it up!",
  (name) => `Awesome job ${name}! You’re so close to mastering this!`,
  (name) => "Spelly is amazed! You’re really rocking it!",
  (name) => `Thats incredible ${name}! Just one step away from perfection!`,
  (name) => `Wow ${name}, 100%! Spelly is so proud of your fantastic work!`,
];

export function getTestResultFeedback(correctWords, totalWords, name = "") {
  const index = Math.floor((10 * correctWords) / totalWords);

  if (index < 0) return feedback[0](name);
  if (index >= 100) return feedback[10](name);

  return feedback[index](name);
}
