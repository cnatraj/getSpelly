<template>
  <v-card class="mx-2 mt-n4 pa-2 pb-0" color="white" rounded="lg" elevation="0">
    <v-card-title class="px-2">
      <div class="d-flex align-center">
        <div>
          <v-img :src="currentTitle?.image" :width="60" :height="60"></v-img>
        </div>
        <div class="mx-2" style="width: 100%">
          <div class="text-title">
            Welcome back {{ profileStore.activeProfile.name }}!
          </div>
          <div
            class="text-subtitle-2 font-weight-medium text-darkText opacity-40"
          >
            {{ currentTitle?.title }}
          </div>
        </div>
      </div>
    </v-card-title>
  </v-card>
  <div class="mx-2">
    <DashboardCards />
    <DailyProgress />
    <BadgesCarousel />
    <v-btn @click="startTest">Start new game!</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import { usePointsStore } from "@/stores/points";
import { getCurrentTitle } from "@/constants/titles";

import DailyProgress from "./DailyProgress.vue";
import DashboardCards from "./DashboardCards.vue";
import BadgesCarousel from "./BadgesCarousel.vue";
import { computed } from "vue";

const router = useRouter();
const profileStore = useProfileStore();
const pointsStore = usePointsStore();

const startTest = () => {
  router.push("/test");
};

const currentTitle = computed(() => {
  console.log("pointsStore.totalGamesPlayed", pointsStore.totalGamesPlayed);
  return getCurrentTitle(pointsStore.totalGamesPlayed);
});
</script>
