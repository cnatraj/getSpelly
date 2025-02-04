<template>
  <!-- Badges Section -->

  <v-carousel
    :model-value="initialSlide"
    hide-delimiter-background
    :show-arrows="false"
    height="130"
    color="tertiary-darken"
  >
    <v-carousel-item v-for="(slide, index) in badgeSlides" :key="index">
      <v-row justify="center" class="fill-height">
        <v-col
          v-for="badge in slide"
          :key="badge.id"
          cols="auto"
          class="text-center highlighted"
        >
          <v-icon
            :icon="badge.icon"
            size="x-large"
            :color="badge.isUnlocked ? 'primary' : 'grey-lighten-1'"
          ></v-icon>
          <div class="text-caption mt-1">{{ badge.name }}</div>
          <div class="text-caption text-grey">{{ badge.threshold }} days</div>
        </v-col>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { useBadgesStore } from "@/stores/badges";
import { usePointsStore } from "@/stores/points";
import { onMounted, computed } from "vue";

const badgesStore = useBadgesStore();
const pointsStore = usePointsStore();

onMounted(() => {
  badgesStore.setMaxStreak(pointsStore.highestDailyStreak);
});

// Calculate initial carousel slide based on latest unlocked badge
const initialSlide = computed(() => {
  if (!badgesStore.currentBadge) return 0;
  const badgeIndex = badgesStore.badges.findIndex(
    (b) => b.id === badgesStore.currentBadge.id
  );
  return Math.floor(badgeIndex / 4);
});

// Group badges into sets of 4 for carousel
const badgeSlides = computed(() => {
  const slides = [];
  const badges = [...badgesStore.badges];
  while (badges.length) {
    slides.push(badges.splice(0, 4));
  }
  return slides;
});
</script>

<style scoped>
.v-carousel .v-window__container .v-window__controls {
  padding: 100px;
}
</style>
