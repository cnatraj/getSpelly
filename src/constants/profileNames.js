export function generateRandomName() {
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomPrefix} ${randomNoun}`;
}

const prefixes = [
  // ✨ Magic & Fantasy-Themed
  "Zappy",
  "Mystic",
  "Fizzing",
  "Whizzy",
  "Starry",
  "Wobbly",
  "Bubbly",
  "Twinkly",

  // 🚀 Speed & Adventure-Themed
  "Zooming",
  "Dashing",
  "Bouncing",
  "Snappy",
  "Racing",
  "Turbo",
  "Questy",

  // 😂 Silly & Playful
  "Goofy",
  "Jiggly",
  "Wiggly",
  "Tooty",
  "Noodly",
  "Squiggly",
  "Loopy",
  "Zany",

  // 🐾 Animal-Inspired
  "Fluffy",
  "Furry",
  "Stripey",
  "Hooty",
  "Pouncy",
  "Waggly",
  "Leapy",
  "Quirky",
];

const nouns = [
  // 🦉 Magical Creatures & Characters
  "Wizard",
  "Spark",
  "Genie",
  "Spell",
  "Goblin",
  "Pixie",
  "Phantom",
  "Sorcerer",

  // 🚀 Fast & Action-Packed
  "Comet",
  "Blaster",
  "Racer",
  "Tornado",
  "Lightning",
  "Sprinter",
  "Cyclone",
  "Rocket",

  // 🍭 Silly & Fun
  "Noodle",
  "Waffle",
  "Giggle",
  "Muffin",
  "Sizzle",
  "Pickle",
  "Doodle",
  "Tater",

  // 🐾 Animals & Cute Creatures
  "Bunny",
  "Fox",
  "Owl",
  "Turtle",
  "Parrot",
  "Zebra",
  "Chameleon",
  "Dolphin",
];
