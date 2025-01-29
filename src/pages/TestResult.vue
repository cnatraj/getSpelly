<template>
  <TestResultCards :test-result="test" />

  <div class="mx-2 my-4">
    <v-btn @click="startTest">NEXT TEST!</v-btn>
  </div>
  <WordList :completed-words="completedWords" />
</template>

<script setup>
import { getCompletedWordsForTest } from "@/services/completedWords";
import { getOneTestDetails } from "@/services/tests";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TestResultCards from "@/components/results/TestResultCards.vue";
import WordList from "@/components/results/WordList.vue";

const testError = ref(false);
const route = useRoute();
const router = useRouter();
const completedWords = ref([]);
const test = ref(null);

const startTest = () => {
  router.push("/test");
};

onMounted(async () => {
  // if no test Id, then show an error
  if (!route.params.testId || route.params.testId == "") {
    testError.value = true;
  }

  await loadTest();
  await loadTestWords();
  calculatePoints();
});

const calculatePoints = () => {
  let pointsForTest = 0;
  completedWords.value.forEach((completedWord) => {
    pointsForTest += completedWord.total_points;
  });
};

const loadTest = async () => {
  try {
    const { data, error } = await getOneTestDetails(route.params.testId);
    if (error) throw error;

    if (!data) {
      testError.value = true;
      throw {
        testId: route.params.testId,
        error: "Did not find row for testId",
      };
    }
    test.value = data;
  } catch (error) {
    console.log("Error getting test details: ", error);
  }
};

const loadTestWords = async () => {
  try {
    const { data, error } = await getCompletedWordsForTest(route.params.testId);
    if (error) throw error;

    if (data.length === 0) {
      testError.value = true;
    } else {
      completedWords.value = data;
    }
  } catch (error) {
    console.log("Error loading test words: ", error);
    testError.value = true;
  }
};
</script>
