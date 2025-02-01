<template>
  <div class="text-center rounded-lg pa-2 elevation-0">
    <div class="font-weight-bold">
      <span class="mr-1">{{ props.emoji }}</span> {{ props.value }}
    </div>
    <div class="text-body-2 opacity-60 mt-n1">{{ props.title }}</div>
    <div class="opacity-100"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  emoji: String,
  value: Number,
  title: String,
});
</script>
