<template>
  <v-card class="mx-2 mt-n4 pa-2" color="white" rounded="lg" elevation="0">
    <v-card-title>
      Welcome back {{ profileStore.activeProfile.name }}!
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
import DailyProgress from "./DailyProgress.vue";
import DashboardCards from "./DashboardCards.vue";
import BadgesCarousel from "./BadgesCarousel.vue";

const router = useRouter();
const profileStore = useProfileStore();

const startTest = () => {
  router.push("/test");
};
</script>
