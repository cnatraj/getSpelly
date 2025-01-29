<template>
  <v-img src="@/assets/images/spelly-results-bg.jpg" height="275" cover>
    <AccountBar />

    <Spelly
      image-url="spelly-hi.png"
      :width="135"
      :text="'Well done ' + profileStore.activeProfile.name + '!'"
    />
  </v-img>

  <Carousel v-bind="carouselConfig" class="mx-4 mt-n8">
    <Slide v-for="(slide, i) in resultCards" :key="i">
      <template #default="{ isActive, isVisible }">
        <TestResultCard :card="slide" :is-active="isActive" />
      </template>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { ref, watch } from "vue";
import TestResultCard from "./TestResultCard.vue";
import AccountBar from "../common/AccountBar.vue";
import { useProfileStore } from "@/stores/profile";
import { useSettingsStore } from "@/stores/settings";
import Spelly from "../common/Spelly.vue";

const props = defineProps({
  testResult: Object,
  titleIcon: String,
  title: String,
  value: String,
  subscript: String,
});

const carouselConfig = {
  height: 150,
  itemsToShow: 2,
  gap: 10,
  wrapAround: true,
};
const profileStore = useProfileStore();
const settingsStore = useSettingsStore();

const resultCards = ref([]);

watch(
  () => props.testResult,
  () => {
    scoreCard();
    accuracyCard();
  }
);

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

<style scoped>
.cardTransition {
  transition: height 0.25s ease-in;
}
</style>
