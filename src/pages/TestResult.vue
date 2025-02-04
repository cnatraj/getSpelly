<template>
  <v-img src="@/assets/images/spelly-results-bg.jpg" height="300" cover>
    <AccountBar />
    <Spelly image-url="spelly-excited" :width="135" :text="feedback" />
    <!-- <AchievementsCarousel :carousel-cards="achievements" /> -->
  </v-img>
  <TestResultCards :test-result="test" />
  <TitleProgess />
  <div class="mx-2 my-4">
    <v-btn @click="startTest">NEXT TEST!</v-btn>
  </div>
  <WordList :completed-words="completedWords" />
</template>

<script setup>
import { getCompletedWordsForTest } from "@/services/completedWords";
import { getOneTestDetails } from "@/services/tests";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TestResultCards from "@/components/results/TestResultCards.vue";
import WordList from "@/components/results/WordList.vue";
import { convertMSToMMSS } from "@/components/helpers/utils";
import { useProfileStore } from "@/stores/profile";
import { usePointsStore } from "@/stores/points";
import AchievementsCarousel from "@/components/results/AchievementsCarousel.vue";
import { useSettingsStore } from "@/stores/settings";
import { useConfetti } from "../composables/useConfetti";
import { getTestResultFeedback } from "@/components/common/testResultFeedback";
import TitleProgess from "@/components/dashboard/TitleProgess.vue";

const testError = ref(false);
const route = useRoute();
const router = useRouter();
const completedWords = ref([]);
const test = ref(null);
const achievements = ref([]);
const feedback = ref("");

const profileStore = useProfileStore();
const pointsStore = usePointsStore();
const settingsStore = useSettingsStore();
const confetti = useConfetti();

const startTest = () => {
  router.push("/test");
};

onMounted(async () => {
  // if no test Id, then show an error
  if (!route.params.testId || route.params.testId == "") {
    testError.value = true;
  }

  await profileStore.fetchProfiles();
  await loadTest();
  await loadTestWords();

  await loadAchievementCards();

  feedback.value = getTestResultFeedback(
    test.value.correct_spellings,
    test.value.total_words,
    profileStore.activeProfile.name
  );

  confetti.fire();
});

const loadTest = async () => {
  try {
    const { data, error } = await getOneTestDetails(
      route.params.testId,
      profileStore.activeProfile.id
    );
    if (error) throw error;

    if (!data) {
      testError.value = true;
      throw {
        testId: route.params.testId,
        error: "Did not find row for testId",
      };
    }
    test.value = data;
  } catch (error) {
    console.log("Error getting test details: ", error);
  }
};

const loadTestWords = async () => {
  try {
    const { data, error } = await getCompletedWordsForTest(route.params.testId);
    if (error) throw error;

    if (data.length === 0) {
      testError.value = true;
    } else {
      completedWords.value = data;
    }
  } catch (error) {
    console.log("Error loading test words: ", error);
    testError.value = true;
  }
};

const loadAchievementCards = () => {
  // Total Time Card
  const totalTime_ms = calculateTotalTestTime();
  let totalTime = {
    emoji: settingsStore.emojis.time,
    value: convertMSToMMSS(totalTime_ms),
    title: "Total time",
  };
  achievements.value.push(totalTime);

  // Fastest time Card
  const fastestTimeInTest = getFastestWordTime(completedWords.value);

  if (
    !pointsStore.fastestTime ||
    fastestTimeInTest == pointsStore.fastestTime
  ) {
    let fastestTime = {
      emoji: settingsStore.emojis.fastestTime,
      value: convertMSToMMSS(fastestTimeInTest),
      title: "Fastest Time",
    };
    achievements.value.push(fastestTime);
  }
};

const calculateTotalTestTime = () => {
  if (!completedWords.value || completedWords.value.length === 0) return 0;

  return completedWords.value.reduce(
    (total, word) => total + (word.completion_time_ms || 0),
    0
  );
};

const getFastestWordTime = (words) => {
  if (!words || words.length === 0) return null;
  return words.reduce((fastest, word) => {
    if (!word.completion_time_ms) return fastest;
    return fastest === null || word.completion_time_ms < fastest
      ? word.completion_time_ms
      : fastest;
  }, null);
};
</script>
