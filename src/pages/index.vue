<template>
  <v-img src="@/assets/images/spelly-welcome-1-bg.jpg" height="375" cover>
    <div class="custom-shape-divider-bottom-1738121928">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </v-img>

  <div class="text-center">
    <p class="text-h5 text-tertiary mt-4">Meet Spelly the Owl!</p>
    <p class="ma-4">
      Hi! Im Spelly the owl. Im here to take you on a magical word journey.
    </p>

    <p class="pa-4">
      <v-btn to="/auth">Lets get started</v-btn>
    </p>
  </div>
</template>

<script setup>
import { supabase } from "@/services/client";
import { useProfileStore } from "@/stores/profile";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const user = ref(null);
const router = useRouter();
const profileStore = useProfileStore();

onMounted(() => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      await profileStore.fetchProfiles();
      const numProfiles = profileStore.profiles.length;
      if (numProfiles === 0) {
        router.push("/CreateProfile");
      } else {
        //user is logged in, send them to dashboard page
        router.push("/dashboard");
      }
    }
  });
});
</script>

<style scoped>
.spellySpeech-1 {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 250px;
}
.custom-shape-divider-bottom-1738121928 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1738121928 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 66px;
}

.custom-shape-divider-bottom-1738121928 .shape-fill {
  fill: #edf8e1;
}
</style>
