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
    height="400"
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
          >
            <template v-slot:append>
              <span class="text-h4" @click="randomName">🦉</span>
            </template>
          </v-text-field>
        </p>
        <p class="text-darkText font-weight-medium">
          You can use your real name or a silly made-up name—it’s up to you! 🎭
        </p>
        <p class="text-darkText font-weight-medium mt-2">
          Want Spelly to pick one for you? Just tap the 🦉
        </p>

        <v-btn class="mt-4" :disabled="name.length == 0" @click="nextStep"
          >Next</v-btn
        >
      </v-carousel-item>
      <v-carousel-item class="mx-2">
        <p class="text-h6 text-tertiary mt-4">How to Play with Spelly</p>

        <v-list bg-color="white">
          <v-list-item>
            <strong>Listen up!</strong> Spelly says a word—<strong
              >you type it in!</strong
            >
          </v-list-item>
          <v-list-item>
            Tap the
            <v-avatar color="primary" size="small">
              <v-icon
                @click="speak(word.test_words.word)"
                icon="mdi-volume-high"
                color="primary-darken"
              ></v-icon>
            </v-avatar>
            to hear the word again!
          </v-list-item>
          <v-list-item>
            <strong>Spell it right?</strong> Boom! <strong>+10 points!</strong>
          </v-list-item>
          <v-list-item>
            Spell it
            <strong>within 10 seconds</strong> for +10 extra points!
          </v-list-item>
        </v-list>

        <v-btn class="my-4" @click="createProfile">Ready? Let’s go! 🚀</v-btn>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";
import { generateRandomName } from "@/constants/profileNames";

const profileStore = useProfileStore();
const router = useRouter();
const name = ref("");
const onboardingStep = ref(0);
const spellyText = ref("Hi! My name is Spelly. What is your name?");

const nextStep = () => {
  onboardingStep.value++;
  spellyText.value = "Nice to meet you " + name.value + "! What a cool name!";
};

const createProfile = async () => {
  await profileStore.createProfile(name.value);
  router.push("/test");
};

const randomName = () => {
  name.value = generateRandomName();
};
</script>
