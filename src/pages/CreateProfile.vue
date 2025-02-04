<template>
  <v-img
    src="@/assets/images/spelly-dashboard-bg.jpg"
    height="250"
    cover
    position="center top"
  >
    <div class="mt-4">
      <Spelly image-url="spelly-hi" :width="135" :text="spellyText" />
    </div>
  </v-img>
  <v-card
    class="mx-2 mt-n4 pa-2"
    color="white"
    rounded="lg"
    elevation="0"
    min-height="400"
  >
    <v-carousel
      :show-arrows="false"
      :hide-delimiters="true"
      v-model="onboardingStep"
      height="400"
    >
      <v-carousel-item class="mx-2">
        <p class="mt-4">
          <v-text-field
            variant="outlined"
            bg-color="secondary-lighten"
            v-model="name"
            :elevation="0"
            rounded="lg"
            placeholder="Your name"
            autofocus
            hide-details
          >
          </v-text-field>

          <v-chip
            size="small"
            class="my-1 mr-1"
            variant="outlined"
            color="secondary"
            v-for="(name, i) in randomNames"
            @click="assignName(name)"
            >{{ name }}</v-chip
          >
        </p>
        <p class="text-darkText font-weight-medium mt-2">
          You can use your real name or a silly made-up name—it’s up to you! 🎭
        </p>

        <v-btn class="mt-4" :disabled="name.length == 0" @click="showTitleCard"
          >Next</v-btn
        >
      </v-carousel-item>
      <v-carousel-item class="mx-2">
        <div class="text-darkText">
          <p class="text-h6 text-tertiary mt-4">
            Welcome to your Spelling Adventure!
          </p>

          <p class="text-darkText mt-2 text-center">
            Congrats! You’ve earned your first title:
          </p>
          <v-img
            :src="firstTitle.image"
            width="125"
            cover
            class="mx-auto"
          ></v-img>
          <div class="text-h5 text-center">{{ firstTitle.title }}</div>

          <div class="mt-2 text-body-2">
            Play more games to unlock titles like
            <span class="text-tertiary font-weight-bold">Word Ninja</span> and
            <span class="text-tertiary font-weight-bold">Spelling Sorcerer</span
            >. Each title comes with a fun mystery gift!
          </div>
        </div>

        <v-btn class="my-4" @click="showRulesCard">Claim your title!</v-btn>
      </v-carousel-item>

      <v-carousel-item class="mx-2">
        <p class="text-h6 text-tertiary mt-4">How to play with Spelly</p>
        <div class="text-body-2">
          Hey there, future
          <span class="font-weight-bold">Spelling Champion!</span> Here's how
          you play with Spelly the Owl
        </div>
        <v-list bg-color="white">
          <v-list-item>
            <template v-slot:prepend>
              <div class="mr-2">👂</div>
            </template>
            Spelly will say a word, and you type it in!
            <v-btn
              :block="false"
              size="small"
              color="tertiary-lighten"
              @click="speak('house')"
              >🔊 Listen to Spelly</v-btn
            >
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <div class="mr-2">🤔</div>
            </template>

            Tap the
            <v-avatar color="primary" size="small">
              <v-icon
                @click="speak('house')"
                icon="mdi-volume-high"
                color="primary-darken"
              ></v-icon>
            </v-avatar>
            to hear the word again!
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend> <div class="mr-2">🏆</div></template>
            Every correct word earns 10 points.
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend> <div class="mr-2">⚡</div></template>

            Spell within 10 seconds for extra points!
          </v-list-item>
        </v-list>
        <v-btn class="my-4" @click="createProfile">Ready? Let’s go! 🚀</v-btn>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";
import { generateRandomName } from "@/constants/profileNames";
import Clog from "@/utils/logger";
import { getCurrentTitle } from "@/constants/titles";
import speak from "@/components/common/speech";

const profileStore = useProfileStore();
const router = useRouter();
const name = ref("");
const onboardingStep = ref(0);
const spellyText = ref("Hi! My name is Spelly. What is your name?");
const randomNames = ref([]);
const firstTitle = ref(null);

const showTitleCard = () => {
  onboardingStep.value++;
  spellyText.value = "Nice to meet you " + name.value + "! What a cool name!";
};

const showRulesCard = () => {
  onboardingStep.value++;
  spellyText.value = "Ready to start " + name.value + "?";
};

const createProfile = async () => {
  await profileStore.createProfile(name.value);
  router.push("/test");
};

const assignName = (randomName) => {
  name.value = randomName;
};
const createRandomNames = () => {
  for (let i = 0; i < 5; i++) {
    randomNames.value.push(generateRandomName());
  }
};

const getFirstTitle = () => {
  firstTitle.value = getCurrentTitle(0);
};
onMounted(() => {
  Clog.debug("OnMounted");
  createRandomNames();
  getFirstTitle();
});
</script>
