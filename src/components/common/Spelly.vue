<template>
  <div
    v-if="props.text && props.text != ''"
    class="speech-bubble pa-2 elevation-2 rounded-lg text-center mx-auto bg-tertiary-lighten"
  >
    {{ props.text }}
  </div>
  <v-img
    :src="imageSource"
    class="mx-auto"
    :width="props.width ? props.width : 150"
  ></v-img>
</template>

<script setup>
import { computed, watch } from "vue";
import spellyHi from "@/assets/images/spelly-hi.png";
import spellyExcited from "@/assets/images/spelly-excited.png";
import spellyReading from "@/assets/images/spelly-reading.png";

const props = defineProps({
  text: String,
  imageUrl: String,
  width: Number,
});

const images = {
  "spelly-hi": spellyHi,
  "spelly-excited": spellyExcited,
  "spelly-reading": spellyReading,
};

const imageSource = computed(() => {
  return images[props.imageUrl] || images["spelly-hi"];
});
</script>

<style scoped>
.speech-bubble {
  position: relative;
  color: #fff;
  max-width: 250px;
}
</style>
