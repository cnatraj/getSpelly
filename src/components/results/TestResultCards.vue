<template>
  <v-card class="mx-2 mt-n4" color="white" rounded="lg" elevation="1">
    <v-card-item>
      <v-row>
        <v-col cols="4" v-for="(stat, i) in stats" :key="i">
          <div class="d-flex align-center">
            <div>
              <span class="text-h5">{{ stat.emoji }}</span>
            </div>
            <div class="ml-2">
              <div class="font-weight-bold">{{ stat.value }}</div>
              <div class="text-body-2 opacity-60 mt-n1">{{ stat.title }}</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { usePointsStore } from "@/stores/points";

const props = defineProps({
  testResult: Object,
});

const settingsStore = useSettingsStore();
const pointsStore = usePointsStore();

const resultCards = ref([]);
const stats = ref([]);

watch(
  () => props.testResult,
  () => {
    calculateStats();
    scoreCard();
    accuracyCard();
  }
);

const calculateStats = () => {
  // calculate accuracy
  const accuracyPercent =
    Math.floor(
      (100 * props.testResult.correct_spellings) / props.testResult.total_words
    ) + "%";

  let accuracy = {
    emoji: settingsStore.emojis.accuracy,
    value: accuracyPercent,
    title: "Accuracy",
  };

  // calculate points
  let points = {
    emoji: settingsStore.emojis.points,
    value: props.testResult.test_score,
    title: "Score",
  };

  // calculate daily streak
  let streak = {
    emoji: settingsStore.emojis.streak,
    value: pointsStore.dailyStreak,
    title: "Streak",
  };
  // Push to stats array
  stats.value.push(accuracy, points, streak);
};

const scoreCard = () => {
  let card = {
    title: "Test Score",
    icon: settingsStore.icons.points,
    value: props.testResult.test_score,
  };
  resultCards.value.push(card);
};

const accuracyCard = () => {
  const accuracy =
    Math.floor(
      (100 * props.testResult.correct_spellings) / props.testResult.total_words
    ) + "%";
  let card = {
    title: "Accuracy",
    icon: settingsStore.icons.accuracy,
    value: accuracy,
  };
  resultCards.value.push(card);
};
</script>
