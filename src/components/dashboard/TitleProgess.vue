<template>
  <v-card class="mx-2 mt-n4" color="white" rounded="lg" elevation="1">
    <v-card-item>
      <div class="d-flex align-center">
        <div>
          <v-img :src="currentTitleImage" :width="60" :height="60"></v-img>
        </div>
        <div class="mx-2" style="width: 100%">
          <div class="text-subtitle-2 font-weight-bold text-darkText">
            {{ currentTitle }}
            <v-spacer></v-spacer>
          </div>

          <div>
            <v-progress-linear
              :model-value="progress"
              color="tertiary"
              height="8"
              rounded
            >
            </v-progress-linear>
            <div
              class="text-caption text-medium-emphasis"
              v-if="testsRemainingTolevelup > 0"
            >
              ✨ Only {{ testsRemainingTolevelup }} more
              {{ testsRemainingTolevelup == 1 ? "game" : "games" }} to the next
              level!
            </div>
          </div>
        </div>
      </div>
    </v-card-item>
  </v-card>

  <!-- Title Update Modal -->
  <v-dialog
    v-model="showTitleChangeModal"
    max-width="400"
    class="forceLocation"
    persistent
  >
    <v-card class="rounded-lg ma-4" color="white" style="top: 20px">
      <v-card-title class="text-h5 text-tertiary text-center">
        Congratulations!
      </v-card-title>
      <v-card-subtitle class="text-secondary-darken text-center">
        New Level unlocked
      </v-card-subtitle>
      <v-card-item>
        <p class="text-body-1">
          <v-slide-group
            show-arrows
            center-active
            width="300"
            :model-value="lastAwardedTitleIndex"
          >
            <v-slide-group-item
              v-for="title in allTitles"
              :key="title.threshold"
            >
              <v-card
                class="ma-2 text-center"
                width="200"
                color="white"
                elevation="0"
                :class="{ 'opacity-75': !title.isUnlocked }"
              >
                <v-img
                  :src="title.image"
                  width="150"
                  cover
                  class="mx-auto"
                  :class="{ grayscale: !title.isUnlocked }"
                >
                  <template v-if="!title.isUnlocked" v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-icon
                        icon="mdi-lock"
                        size="64"
                        color="grey-darken-2"
                      ></v-icon>
                    </div>
                  </template>
                </v-img>
                <v-card-title class="text-center text-secondary">
                  {{ title.title }}
                </v-card-title>
                <v-card-item
                  class="text-center py-0 text-subtitle-1 text-secondary-darken"
                  v-if="title.isUnlocked"
                >
                  {{ title.threshold }} games completed—keep it up!
                </v-card-item>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </p>
        <v-btn
          class="my-2"
          color="secondary"
          @click="showTitleChangeModal = false"
          >Claim your title!</v-btn
        >
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { getCurrentTitle, getNextTitle, titles } from "@/constants/titles";
import { usePointsStore } from "@/stores/points";
import { useProfileStore } from "@/stores/profile";
import Clog from "@/utils/logger";
import { computed, onMounted, ref, watch } from "vue";

const pointsStore = usePointsStore();
const profileStore = useProfileStore();
const showTitleChangeModal = ref(false);
const testsRemainingTolevelup = ref(0);
const currentTitleImage = ref(null);

const progress = computed(() => {
  return calculateProgress(pointsStore.totalGamesPlayed);
});

const currentTitle = computed(() => {
  return profileStore.activeProfile?.title || "";
});

const nextTitle = computed(() => {
  Clog.debug("pointsStore.totalGamesPlayed", pointsStore.totalGamesPlayed);
  return getNextTitle(pointsStore.totalGamesPlayed);
});

const allTitles = computed(() => {
  return titles.map((title) => ({
    ...title,
    isUnlocked: pointsStore.totalGamesPlayed >= title.threshold,
  }));
});

const lastAwardedTitleIndex = computed(() => {
  // Reverse the array to find the last unlocked title
  const reversedIndex = [...allTitles.value]
    .reverse()
    .findIndex((title) => title.isUnlocked);

  // If no titles are unlocked, return -1
  if (reversedIndex === -1) return -1;

  // Convert the reversed index back to the original array index
  return allTitles.value.length - 1 - reversedIndex;
});

const calculateProgress = (games) => {
  Clog.debug("---calculateProgress---");
  if (!nextTitle.value) return 100;
  if (nextTitle.value.threshold == 0) return 0;

  const currentMilestone = titles.find((t) => t.title === currentTitle.value);
  const currentThreshold = currentMilestone ? currentMilestone.threshold : 0;

  Clog.debug("games", games);
  Clog.debug("currentThreshold", currentThreshold);
  Clog.debug("nextTitle.value.threshold", nextTitle.value.threshold);

  // calculate progress
  const progress =
    ((games - currentThreshold) /
      (nextTitle.value.threshold - currentThreshold)) *
    100;

  // tests remaining
  testsRemainingTolevelup.value = nextTitle.value.threshold - games;

  currentTitleImage.value = getCurrentTitle(games).image;
  Clog.debug("getCurrentTitle", getCurrentTitle(games));
  return Math.min(Math.max(progress, 0), 100);
};

const updateTitle = async () => {
  if (!profileStore.activeProfile) return;
  Clog.debug("nextTitle.value.title", nextTitle.value.title);
  try {
    const { error } = await profileStore.updateProfileTitle(
      nextTitle.value.title
    );
    if (error) throw error;
  } catch (error) {}
};

// watch(
//   () => pointsStore.totalGamesPlayed,
//   (newValue, oldValue) => {
//     console.log("newValue, oldValue", newValue, oldValue);

//     if (newValue === nextTitle.value.threshold) {
//       console.log("title changed");
//       showTitleChangeModal.value = true;
//       updateTitle();
//     } else {
//       console.log("no title change");
//     }
//   }
// );

onMounted(() => {
  if (
    pointsStore.totalGamesPlayed > 0 &&
    pointsStore.totalGamesPlayed === nextTitle.value.threshold
  ) {
    showTitleChangeModal.value = true;
    updateTitle();
  }
});
</script>

<style sccoped>
.forceLocation > .v-overlay__content {
  position: absolute;
  top: 0px;
}
.grayscale {
  filter: grayscale(100%);
}
</style>
