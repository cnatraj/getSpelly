<template>
  <!-- Badges Section -->
  <v-card class="mb-4" color="secondary-darken" rounded="lg">
    <v-card-text>
      <div class="text-h6 mb-2">Badges</div>
      <v-carousel
        :model-value="initialSlide"
        hide-delimiter-background
        :show-arrows="false"
        height="140"
      >
        <v-carousel-item v-for="(slide, index) in badgeSlides" :key="index">
          <v-row justify="center" align="center" class="fill-height">
            <v-col
              v-for="badge in slide"
              :key="badge.id"
              cols="auto"
              class="text-center"
            >
              <v-icon
                :icon="badge.icon"
                size="x-large"
                :color="badge.isUnlocked ? 'warning' : 'grey'"
              ></v-icon>
              <div class="text-caption mt-1">{{ badge.name }}</div>
              <div class="text-caption text-grey">
                {{ badge.threshold }} days
              </div>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
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
