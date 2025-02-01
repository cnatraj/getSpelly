export const streakBadges = [
  {
    threshold: 1,
    icon: "mdi-creation",
    name: "First Spark",
  },
  {
    threshold: 3,
    icon: "mdi-fire",
    name: "Kindling Flame",
  },
  {
    threshold: 5,
    icon: "mdi-star-shooting",
    name: "Silver Rune",
  },
  {
    threshold: 7,
    icon: "mdi-shield-star",
    name: "Golden Crest",
  },
  {
    threshold: 10,
    icon: "mdi-crystal-ball",
    name: "Mystic Orb",
  },
  {
    threshold: 15,
    icon: "mdi-fireplace",
    name: "STar Torch",
  },
  {
    threshold: 20,
    icon: "mdi-diamond",
    name: "Astral Gem",
  },
  {
    threshold: 30,
    icon: "mdi-fire-circle",
    name: "Nova Fire",
  },
  {
    threshold: 60,
    icon: "mdi-book-open-page-variant",
    name: "Grand Spellbook",
  },
  {
    threshold: 90,
    icon: "mdi-star-shooting-outline",
    name: "Eternal Star",
  },
].sort((a, b) => a.threshold - b.threshold);
