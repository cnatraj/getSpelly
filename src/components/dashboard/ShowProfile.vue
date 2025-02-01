<template>
  <v-card class="mx-2 mt-n4 pa-2" color="white" rounded="lg" elevation="0">
    <v-card-title>
      Welcome back {{ profileStore.activeProfile.name }}!
    </v-card-title>
  </v-card>
  <div class="mx-2">
    <v-row class="my-2" no-gutters="">
      <v-col cols="4" v-for="(item, i) in items">
        <DashboardCard
          :emoji="item.emoji"
          :value="item.value"
          :title="item.title"
        />
      </v-col>
    </v-row>
    <DailyProgress />
    <v-btn @click="startTest">Start new game!</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import DashboardCard from "../dashboard/DashboardCard.vue";
import { usePointsStore } from "@/stores/points";
import { useProfileStore } from "@/stores/profile";
import DailyProgress from "./DailyProgress.vue";
import { useSettingsStore } from "@/stores/settings";

const router = useRouter();
const pointsStore = usePointsStore();
const profileStore = useProfileStore();
const settingsStore = useSettingsStore();

const items = [
  {
    emoji: settingsStore.emojis.gamesPlayed,
    value: pointsStore.totalGamesPlayed,
    title: "Spelling Quests",
  },
  {
    emoji: settingsStore.emojis.perfectGames,
    value: pointsStore.perfectGames,
    title: "Perfect Games",
  },
  {
    emoji: settingsStore.emojis.streak,
    value: pointsStore.highestDailyStreak,
    title: "Blazing Streak",
  },
];
const startTest = () => {
  router.push("/test");
};
</script>
