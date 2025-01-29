<template>
  <v-carousel
    :show-arrows="false"
    :hide-delimiters="true"
    v-model="onboardingStep"
  >
    <v-carousel-item class="mx-2">
      <p class="text-h6 text-tertiary mt-4 font-weight-medium">
        My name is Spelly. What is your name?
      </p>
      <p>Pick a fun name. It doesnt have to be your real name.</p>
      <p class="my-4">
        <v-text-field
          variant="solo"
          bg-color="white"
          v-model="name"
          prepend-inner-icon="mdi-account"
          placeholder="Your name"
          autofocus
        ></v-text-field>
      </p>
      <v-btn :disabled="name.length == 0" @click="nextStep">Next</v-btn>
    </v-carousel-item>
    <v-carousel-item class="mx-2">
      <p class="text-h6 text-tertiary mt-4">
        Nice to meet you <span class="font-weight-medium">{{ name }}</span
        >!
      </p>
      <p>Cool name by the way! You are all set. Lets go!</p>
      <v-btn class="my-4" @click="createProfile">Lets Get Started!</v-btn>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();
const name = ref("");
const onboardingStep = ref(0);

const nextStep = () => {
  onboardingStep.value++;
};

const createProfile = () => {
  profileStore.createProfile(name.value);
  router.push("/test");
};
</script>
