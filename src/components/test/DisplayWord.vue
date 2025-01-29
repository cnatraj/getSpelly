<template>
  <v-card
    class="mx-2 mt-n4 mb-2 pa-2"
    color="tertiary-lighten"
    rounded="lg"
    elevation="1"
  >
    <div
      class="text-h3 text-center wordSpelling bubblegumSans my-2 bg-sheet"
      data-placeholder="start typing..."
    >
      {{ props.textToDisplay }}
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  textToDisplay: String,
});
</script>

<style scoped>
.wordSpelling {
  border-bottom: 2px solid #529917;
  /* color: #7a532c; */
  color: #529917;
  min-height: 60px;
}
.wordSpelling:empty:before {
  content: attr(data-placeholder);
  color: #bdbdbd;
}
</style>
