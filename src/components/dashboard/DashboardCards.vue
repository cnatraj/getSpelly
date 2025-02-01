<template>
  <v-row class="my-2" no-gutters="">
    <v-col cols="3" v-for="(item, i) in items">
      <div class="text-center rounded-lg pa-2 elevation-0">
        <div class="font-weight-bold">
          <span class="mr-1">{{ item.emoji }}</span> {{ item.value }}
        </div>
        <div class="text-body-2 opacity-60 mt-n1">{{ item.title }}</div>
        <div class="opacity-100"></div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { getTotalCorrectWords } from "@/services/completedWords";
import { usePointsStore } from "@/stores/points";
import { useProfileStore } from "@/stores/profile";
import { useSettingsStore } from "@/stores/settings";
import { onMounted, ref } from "vue";

const pointsStore = usePointsStore();
const settingsStore = useSettingsStore();
const profileStore = useProfileStore();

const items = ref([
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
]);

onMounted(async () => {
  await fetchTotalCorrectWords();
});

const fetchTotalCorrectWords = async () => {
  console.log("---fetchTotalCorrectWords---");
  if (!profileStore.activeProfile.id) return;

  try {
    const { data, error } = await getTotalCorrectWords(
      profileStore.activeProfile.id
    );

    if (error) throw error;

    let item = {
      emoji: settingsStore.emojis.points,
      value: data.length,
      title: "Words Conquered",
    };

    console.log("before", items);
    items.value.push(item);
    console.log("after", items);

    console.log("length", data.length);
  } catch (error) {
    console.error("Error fetching total correct words:", error);
  }
};
</script>
