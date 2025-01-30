<template>
  <Carousel v-bind="carouselConfig" class="mx-4">
    <Slide v-for="(slide, i) in props.carouselCards" :key="i">
      <v-card
        width="100"
        height="120"
        class="mx-2 mt-n4"
        color="primary-darken"
        rounded="lg"
        elevation="1"
      >
        <div class="text-center">
          <p class="text-h4 mt-4">{{ slide.emoji }}</p>
          <p class="text-primary font-weight-bold">{{ slide.value }}</p>
          <p class="text-primary text-body-2 opacity-60">{{ slide.title }}</p>
        </div>
      </v-card>

      <!-- <template #default="{ isActive, isVisible }">
        <TestResultCard :card="slide" :is-active="isActive" />
      </template> -->
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  carouselCards: Array,
});

const carouselConfig = {
  height: 150,
  itemsToShow: 2,
  gap: 10,
  wrapAround: false,
};
</script>

<style scoped>
.cardTransition {
  transition: height 0.25s ease-in;
}
</style>
