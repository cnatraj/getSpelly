import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const wordsPerTest = ref(3);
  const pointsPerCorrectWord = ref(10);
  const timeBonusThreshold = ref(10); // Time in seconds to get bonus
  const timeBonusPoints = ref(10); // Points awarded for quick completion

  const icons = {
    points: "mdi-trophy",
    accuracy: "mdi-bullseye-arrow",
  };

  const resetSettings = () => {
    wordsPerQuestion.value = 1;
    pointsPerWord.value = 10;
    timeBonusThreshold.value = 10;
    timeBonusPoints.value = 10;
  };

  return {
    wordsPerTest,
    pointsPerCorrectWord,
    icons,
    timeBonusThreshold,
    timeBonusPoints,
    resetSettings,
  };
});
