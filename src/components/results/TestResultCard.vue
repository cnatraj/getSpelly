<template>
  <v-card
    :width="isActive ? '200' : '150'"
    :height="isActive ? '140' : '100'"
    rounded="lg"
    color="secondary-lighten"
    elevation="1"
    class="cardTransition carddBG"
  >
    <v-card-text>
      <div class="text-subtitle-1 text-high-emphasis">
        <v-icon
          :icon="props.card.icon"
          color="tertiary"
          :size="isActive ? 'large' : ''"
          class="mr-2"
        ></v-icon>
        <span class="text-tertiary font-weight-bold">{{
          props.card.title
        }}</span>
      </div>
      <div
        class="text-h3 text-center mt-2 text-secondary-darken"
        :class="isActive ? 'text-h3' : 'text-h6'"
      >
        {{ props.card.value }}
      </div>
    </v-card-text>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  card: Object,
  isActive: Boolean,
});
</script>

<style scoped>
.cardBG {
  background-image: linear-gradient(
    to right top,
    #1ec6f2,
    #59d2f4,
    #7eddf7,
    #9de9fa,
    #baf4ff
  );
}
</style>
