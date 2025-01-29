<template>
  <v-card class="mx-2 mt-n4 pa-2" color="white" rounded="lg" elevation="1">
    <v-card-title>
      Welcome back {{ profileStore.activeProfile.name }}!
    </v-card-title>
  </v-card>
  <div class="mx-2">
    <v-row class="my-2">
      <v-col cols="6">
        <DashboardCard
          emoji="📝"
          :value="pointsStore.totalGamesPlayed"
          title="Games Played"
        />
      </v-col>
      <v-col cols="6">
        <DashboardCard
          emoji="🌟"
          :value="pointsStore.perfectGames"
          title="Perfect Games"
        />
      </v-col>
    </v-row>
    <v-btn @click="startTest">Start new game!</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import DashboardCard from "../dashboard/DashboardCard.vue";
import { usePointsStore } from "@/stores/points";
import { useProfileStore } from "@/stores/profile";

const router = useRouter();
const pointsStore = usePointsStore();
const profileStore = useProfileStore();
const startTest = () => {
  router.push("/test");
};
</script>
