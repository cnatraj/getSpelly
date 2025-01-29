<template>
  <v-app>
    <v-main>
      <v-sheet max-width="400" class="mx-auto rounded-xl mt-2">
        <v-card rounded="xl" color min-height="600">
          <router-view />
        </v-card>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { supabase } from "./services/client";
import { useProfileStore } from "./stores/profile";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();
//
onMounted(() => {
  console.log("---APP ONMOUNTED---");

  supabase.auth.onAuthStateChange((event, session) => {
    profileStore.setUser(session?.user || null);

    if (event === "SIGNED_OUT") {
      profileStore.clearUser();
      router.push("/auth");
    }
  });
});
</script>
