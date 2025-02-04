<template>
  <v-card color="white" class="v-card--reveal rounded-xl" elevation="4">
    <v-card-title class="text-h6 text-tertiary"> Word Check </v-card-title>
    <v-card-text>
      <v-list bg-color="white">
        <v-list-subheader class="text-h6">
          {{ resultText }}
          <p v-if="props.wordDetails.timeBonus != 0">
            <v-chip
              size="small"
              color="tertiary"
              prepend-icon="mdi-clock-outline"
            >
              Time bonus: +
              {{ props.wordDetails.timeBonus }} points</v-chip
            >
          </p>
        </v-list-subheader>

        <v-list-item>
          <div class="text-h4 text-tertiary font-weight-bold">
            {{ props.wordDetails.word }}
          </div>

          <template v-slot:append>
            <v-avatar color="primary">
              <v-icon
                @click="speak(props.wordDetails.word)"
                icon="mdi-volume-high"
                color="primary-darken"
              ></v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-text>
      <v-btn @click="$emit('nextWord')" color="secondary">
        <span v-if="props.currentIndex < props.totalWords - 1">Next Word</span>
        <span v-else>See your Final Score!</span>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getRandomFeedback } from "../common/feedback";
import twinkle from "@/assets/audio/twinkle.mp3";
import speak from "@/components/common/speech";

const props = defineProps({
  word: String,
  isCorrect: Boolean,
  wordDetails: Object,
  currentIndex: Number,
  totalWords: Number,
});
const resultText = ref("");

onMounted(() => {
  if (props.wordDetails.isCorrect) {
    resultText.value = getRandomFeedback();
    new Audio(twinkle).play();
  } else {
    resultText.value = "🤔 Hmm.. the correct spelling is";
  }
});
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 390px;
  height: 50%;
  z-index: 101;
}
</style>
