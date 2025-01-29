<template>
  <div
    v-if="props.text && props.text != ''"
    class="speech-bubble pa-2 delevation-2 rounded-lg font-weight-medium text-center mx-auto bg-tertiary-lighten"
  >
    {{ props.text }}
  </div>
  <v-img
    :src="`src/assets/images/${props.imageUrl}`"
    class="mx-auto"
    :width="props.width ? props.width : 150"
  ></v-img>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps({
  text: String,
  imageUrl: String,
  width: Number,
});
</script>

<style scoped>
.speech-bubble {
  position: relative;
  color: #fff;
  max-width: 200px;
}

.speech-bubble:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 17px solid transparent;
  border-top-color: #baf4ff;
  border-bottom: 0;
  border-left: 0;
  margin-left: -8.5px;
  margin-bottom: -17px;
}
</style>
