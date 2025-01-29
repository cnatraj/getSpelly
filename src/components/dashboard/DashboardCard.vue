<template>
  <div class="d-flex border-thin rounded-lg pa-2 elevation-2">
    <div class="">
      <v-avatar color="secondary-lighten">
        <span class="text-h5">{{ props.emoji }}</span>
      </v-avatar>
    </div>
    <div class="ml-4">
      <div class="font-weight-bold">{{ props.value }}</div>
      <div class="text-body-2 opacity-60 mt-n1">{{ props.title }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  emoji: String,
  value: Number,
  title: String,
});
</script>
