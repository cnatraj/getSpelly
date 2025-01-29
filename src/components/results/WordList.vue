<template>
  <v-list density="compact" bg-color="white" class="ma-2 rounded-xl">
    <v-list-subheader class="text-tertiary font-weight-bold"
      >Words in Test</v-list-subheader
    >
    <v-list-item v-for="word in props.completedWords" :key="word.id">
      <template v-slot:default>
        <v-list-item-title class="text-body-2">
          {{ word.test_words?.word }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-chip
            size="small"
            color="tertiary"
            :prepend-icon="settingsStore.icons.points"
            >{{ word.total_points }} Points</v-chip
          >
        </v-list-item-subtitle>
      </template>
      <template v-slot:prepend>
        <v-icon :color="word.is_correct ? 'secondary-darken' : ''">
          {{ word.is_correct ? "mdi-check" : "" }}
        </v-icon>
      </template>
      <template v-slot:append>
        <v-avatar color="primary">
          <v-icon
            @click="speak(word.test_words.word)"
            icon="mdi-volume-high"
            color="primary-darken"
          ></v-icon>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup>
import speak from "@/components/common/speech";
import { useSettingsStore } from "@/stores/settings";
const props = defineProps({
  completedWords: Array,
});

const settingsStore = useSettingsStore();
</script>
