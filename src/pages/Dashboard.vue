<template>
  <div class="bg-white">
    <v-img
      src="@/assets/images/spelly-dashboard-bg.jpg"
      cover
      height="225"
      position="center top"
    >
      <AccountBar />
      <Spelly image-url="spelly-hi" :width="135" />
    </v-img>

    <v-skeleton-loader type="card" v-if="loading"></v-skeleton-loader>
    <div v-else>
      <CreateProfile v-if="numProfiles === 0" />
      <ShowProfile v-else />

      <AccountList />
    </div>
  </div>
</template>

<script setup>
import AccountBar from "@/components/common/AccountBar.vue";
import Spelly from "@/components/common/Spelly.vue";
import AccountList from "@/components/dashboard/AccountList.vue";
import CreateProfile from "@/components/profile/CreateProfile.vue";
import ShowProfile from "@/components/profile/ShowProfile.vue";
import { useProfileStore } from "@/stores/profile";
import { onMounted, ref } from "vue";

const profileStore = useProfileStore();
const numProfiles = ref(0);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await profileStore.fetchProfiles();
  numProfiles.value = profileStore.profiles.length;

  loading.value = false;
});
</script>
