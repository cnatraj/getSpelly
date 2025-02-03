export const titles = [
  { threshold: 0, title: "Word Explorer" }, // Given when account is created
  { threshold: 1, title: "First Speller" },
  { threshold: 5, title: "Word Rookie" },
  { threshold: 10, title: "Word Ninja" },
  { threshold: 25, title: "Quickfire Wordsmith" },
  { threshold: 50, title: "Word Enchanter" },
  { threshold: 75, title: "Spelling Tactician" },
  { threshold: 100, title: "Spelling Sorcerer" },
  { threshold: 150, title: "Grand Wordmaster" },
  { threshold: 200, title: "Legendary Speller" },
  { threshold: 300, title: "Ultimate Spellbinder" },
  { threshold: 500, title: "Celestial Word Caster" },
  { threshold: 750, title: "Infinity Speller" },
  { threshold: 1000, title: "Eternal Spelling Champion" },
];

export const getNextTitle = (testsCompleted) => {
  return titles.find((title) => title.threshold > testsCompleted) || null;
};

export const getCurrentTitle = (testsCompleted) => {
  const earnedTitles = titles.filter((t) => t.threshold <= testsCompleted);

  return earnedTitles.length > 0
    ? earnedTitles[earnedTitles.length - 1].title
    : titles[0];
};
