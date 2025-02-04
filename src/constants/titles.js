import img_0 from "@/assets/images/levels/0-WordExplorer.png";
import img_1 from "@/assets/images/levels/1-FirstSpeller.png";
import img_2 from "@/assets/images/levels/2-WordRookie.png";
import img_3 from "@/assets/images/levels/3-WordNinja.png";
import img_4 from "@/assets/images/levels/4-QuickfireWordsmith.png";
import img_5 from "@/assets/images/levels/5-WordEnchanter.png";
import img_6 from "@/assets/images/levels/6-SpellingTactician.png";
import img_7 from "@/assets/images/levels/7-SpellingSorcerer.png";
import img_8 from "@/assets/images/levels/8-GrandWordMaster.png";
import img_9 from "@/assets/images/levels/9-LegendarySpeller.png";
import img_10 from "@/assets/images/levels/10-UltimateSpellbinder.png";
import img_11 from "@/assets/images/levels/11-CelestialWordCaster.png";
import img_12 from "@/assets/images/levels/12-InfinitySpeller.png";
import img_13 from "@/assets/images/levels/13-EternalChampion.png";

export const titles = [
  { threshold: 0, title: "Word Explorer", image: img_0 }, // Given when account is created
  { threshold: 1, title: "First Speller", image: img_1 },
  { threshold: 5, title: "Word Rookie", image: img_2 },
  { threshold: 10, title: "Word Ninja", image: img_3 },
  { threshold: 25, title: "Quickfire Wordsmith", image: img_4 },
  { threshold: 50, title: "Word Enchanter", image: img_5 },
  { threshold: 75, title: "Spelling Tactician", image: img_6 },
  { threshold: 100, title: "Spelling Sorcerer", image: img_7 },
  { threshold: 150, title: "Grand Wordmaster", image: img_8 },
  { threshold: 200, title: "Legendary Speller", image: img_9 },
  { threshold: 300, title: "Ultimate Spellbinder", image: img_10 },
  { threshold: 500, title: "Celestial Word Caster", image: img_11 },
  { threshold: 750, title: "Infinity Speller", image: img_12 },
  { threshold: 1000, title: "Eternal Spelling Champion", image: img_13 },
];

export const getNextTitle = (testsCompleted) => {
  return titles.find((title) => title.threshold >= testsCompleted) || null;
};

export const getCurrentTitle = (testsCompleted) => {
  const earnedTitles = titles.filter((t) => t.threshold < testsCompleted);

  return earnedTitles.length > 0
    ? earnedTitles[earnedTitles.length - 1]
    : titles[0];
};
