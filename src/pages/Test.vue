<template>
  <div>
    <v-img
      src="@/assets/images/spelly-test-bg.jpg"
      cover
      height="285"
      position="center top"
    >
      <AccountBar />
      <div class="text-center">
        <v-avatar
          color="primary"
          size="x-large"
          class="mx-auto elevation-4 border-opacity-50 border-md"
          @click="speak(currentWord)"
        >
          <v-icon
            icon="mdi-volume-high"
            color="primary-darken"
            size="x-large"
          ></v-icon>
        </v-avatar>
      </div>

      <Spelly image-url="spelly-reading" :width="125" />

      <v-chip
        color="white"
        style="position: absolute; bottom: 10%; right: 20px"
        size="small"
      >
        <v-icon
          icon="mdi-clock-outline"
          color="tertiary-lighten"
          start
        ></v-icon>
        <span class="text-tertiary-lighten">
          {{ formatTime(currentTime) }}</span
        >
      </v-chip>
    </v-img>
    <DisplayWord :textToDisplay="userInput"> </DisplayWord>
    <div></div>
    <div class="mx-2 my-4">
      <Keyboard
        @onChange="handleWordSpellingChange"
        :keyboardInput="userInput"
      />

      <v-btn
        @click="checkSpelling"
        :disabled="userInput.length == 0"
        class="my-2"
        >Check Spelling</v-btn
      >
    </div>
    <div
      v-if="displayResult"
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 100;
        height: 100%;
      "
    ></div>
  </div>
  <v-expand-transition>
    <ShowResult
      v-if="displayResult"
      :word-details="currentWordDetails"
      @next-word="nextWord"
    />
  </v-expand-transition>
</template>

<script setup>
import { getWordsForProfile } from "@/services/words";
import { onMounted } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";
import Keyboard from "@/components/test/Keyboard.vue";
import speak from "@/components/common/speech";
import {
  createTestForProfile,
  saveCompletedTestResult,
} from "@/services/tests";
import { markWordInTestAsComplete } from "@/services/completedWords";
import DisplayWord from "@/components/test/DisplayWord.vue";
import { useRouter } from "vue-router";
import Spelly from "@/components/common/Spelly.vue";
import AccountBar from "@/components/common/AccountBar.vue";
import ShowResult from "@/components/test/ShowResult.vue";
import { usePointsStore } from "@/stores/points";

const profileStore = useProfileStore();
const settingsStore = useSettingsStore();
const pointsStore = usePointsStore();

const router = useRouter();

const words = ref([]);
const userInput = ref("");
const currentIndex = ref(-1);
const currentWord = ref("");
const currentWordDetails = ref({
  word: "",
  isCorrect: false,
  userInput: "",
  timeBonus: 0,
});
const isCurrentWordCorrect = ref(false);
const spellingTestId = ref("");
const displayResult = ref(false);
const totalPoints = ref(0);
const correctSpellings = ref(0);
const wordStartTime = ref(null);
const wordCompletionTime = ref(null);
const currentTime = ref(0);
const timerInterval = ref(null);

onMounted(async () => {
  await loadWords();
  await createTest();
  nextWord();
});

const handleWordSpellingChange = (input) => {
  userInput.value = input;
};

const startTimer = () => {
  stopTimer();

  wordStartTime.value = Date.now();
  wordCompletionTime.value = null;
  currentTime.value = 0;
  timerInterval.value = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
  if (wordStartTime.value) {
    currentTime.value = Math.floor((Date.now() - wordStartTime.value) / 1000);
  }
};

const stopTimer = () => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  if (wordStartTime.value && !wordCompletionTime.value) {
    wordCompletionTime.value = Date.now() - wordStartTime.value;
  }
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const calculateTimeBonus = () => {
  if (!wordCompletionTime.value) return 0;
  const completionTimeSeconds = wordCompletionTime.value / 1000;
  return completionTimeSeconds <= settingsStore.timeBonusThreshold
    ? settingsStore.timeBonusPoints
    : 0;
};

const nextWord = async () => {
  userInput.value = "";
  // hide the results bar
  displayResult.value = false;

  console.log("currentIndex", currentIndex.value);
  // CHECK IF GAME OVER
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++;

    currentWord.value = words.value[currentIndex.value].word;

    speak(currentWord.value);
    // start the timer when the word is spoken
    startTimer();
  } else {
    // save results
    const isPerfectTest = correctSpellings.value == settingsStore.wordsPerTest;
    try {
      const { error } = await saveCompletedTestResult(
        spellingTestId.value,
        totalPoints.value,
        correctSpellings.value,
        isPerfectTest
      );
      if (error) throw error;

      // update profile with points
      await pointsStore.updateGameStats(
        profileStore.activeProfile.id,
        totalPoints.value,
        isPerfectTest
      );

      //route to results page
      router.push({
        name: "TestResult",
        params: { testId: spellingTestId.value },
      });
    } catch (error) {
      console.log("Error saving test details: ", error);
    }
  }
};

const checkSpelling = async () => {
  // stop the timer
  stopTimer();

  const currentWordObj = words.value[currentIndex.value];
  let points = 0;
  let timeBonus = 0;

  isCurrentWordCorrect.value =
    userInput.value.toLowerCase().trim() ===
    currentWord.value.toLowerCase().trim();

  if (isCurrentWordCorrect.value) {
    timeBonus = calculateTimeBonus();
    totalPoints.value += settingsStore.pointsPerCorrectWord + timeBonus;
    correctSpellings.value++;
  }

  // update currentWordDetails
  currentWordDetails.value = {
    word: currentWord.value,
    isCorrect: isCurrentWordCorrect.value,
    userInput: userInput.value,
    timeBonus,
  };
  displayResult.value = true;
  try {
    const { error } = await markWordInTestAsComplete(
      spellingTestId.value,
      currentWordObj.id,
      isCurrentWordCorrect.value,
      wordCompletionTime.value,
      timeBonus
    );
    if (error) throw error;
    // nextWord();
  } catch (error) {
    console.log("Error marking word as complete: ", error);
  }
};

const createTest = async () => {
  try {
    const { data, error } = await createTestForProfile(
      profileStore.activeProfile.id,
      words.value.length
    );
    if (error) throw error;

    spellingTestId.value = data.id;
  } catch (error) {
    console.log("There was an error creating the test: ", error);
  }
};

const loadWords = async () => {
  try {
    const { data, error } = await getWordsForProfile(
      profileStore.activeProfile.id
    );

    if (error) throw error;
    if (!data || data.length === 0) {
      // Handle case where user has completed all available words
      alert("Congratulations! You have completed all available words!");
      return;
    }

    words.value = data;
    console.log("words", words.value);
  } catch (error) {
    console.log("There was an error loading words: ", error);
  }
};
</script>
