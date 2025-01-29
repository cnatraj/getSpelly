import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const wordsPerTest = ref(3);
  const pointsPerCorrectWord = ref(10);
  const icons = {
    points: "mdi-trophy",
    accuracy: "mdi-bullseye-arrow",
  };

  return {
    wordsPerTest,
    pointsPerCorrectWord,
    icons,
  };
});
