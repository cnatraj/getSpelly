<template>
  <div class="px-4 py-2 d-flex mt-2">
    <v-avatar color="white" @click="goToDashboard">
      <v-icon icon="mdi-account" color="tertiary"></v-icon>
    </v-avatar>

    <v-spacer></v-spacer>
    <v-chip color="white" variant="flat">
      <v-icon
        :icon="settingsStore.icons.points"
        color="tertiary"
        class="mr-2"
      ></v-icon>
      <span class="text-tertiary">{{ pointsStore.points }}</span>
    </v-chip>
  </div>
</template>

<script setup>
import { usePointsStore } from "@/stores/points";
import { useProfileStore } from "@/stores/profile";
import { useSettingsStore } from "@/stores/settings";
import { useRouter } from "vue-router";

const settingsStore = useSettingsStore();
const profileStore = useProfileStore();
const pointsStore = usePointsStore();
const router = useRouter();

const goToDashboard = () => {
  router.push("/dashboard");
};
</script>

<style scoped>
.whiteChipBg {
  background-color: white;
}
</style>
