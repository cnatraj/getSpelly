<template>
  <v-card class="mb-4" rounded="lg" color="white" elevation="1">
    <v-card-title>Weekly Progress</v-card-title>
    <v-card-text>
      <v-row justify="space-around" align="center">
        <v-col
          v-for="(day, index) in weeklyProgress"
          :key="index"
          cols="auto"
          class="text-center"
        >
          <div class="text-caption mb-1">{{ day.day }}</div>
          <v-icon
            :color="day.completed ? 'success' : 'grey'"
            :icon="day.completed ? 'mdi-check-circle' : 'mdi-circle-outline'"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { getTestsFromPastWeek } from "@/services/tests";
import { useProfileStore } from "@/stores/profile";
import { onMounted, ref } from "vue";

const profileStore = useProfileStore();
const weeklyProgress = ref([]); // Stores the weekly progress data
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Days of the week

onMounted(() => {
  fetchWeeklyProgress();
});

const fetchWeeklyProgress = async () => {
  if (!profileStore.activeProfile) return;

  // Calculate date range for the past week
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  try {
    // Fetch tests from the past week
    const { data, error } = await getTestsFromPastWeek(
      profileStore.activeProfile.id,
      today,
      sevenDaysAgo
    );

    console.log("dataa", data);
    if (error) throw error;

    // Get unique dates when tests were completed
    const completedDates = [
      ...new Set(
        data.map(
          (test) => new Date(test.completed_at).toISOString().split("T")[0]
        )
      ),
    ];

    // Map each day of the week to show completion status
    weeklyProgress.value = weekDays.map((day) => {
      const dayIndex = weekDays.indexOf(day);
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + dayIndex);
      const dateString = date.toISOString().split("T")[0];

      return {
        day,
        completed: completedDates.includes(dateString),
      };
    });
  } catch (error) {
    console.error("Error fetching weekly progress:", error);
  }
};
</script>
