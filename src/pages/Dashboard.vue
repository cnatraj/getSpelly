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
      <ShowProfile />

      <AccountList />
    </div>
  </div>
</template>

<script setup>
import AccountBar from "@/components/common/AccountBar.vue";
import Spelly from "@/components/common/Spelly.vue";
import AccountList from "@/components/dashboard/AccountList.vue";
import ShowProfile from "@/components/dashboard/ShowProfile.vue";
import { useProfileStore } from "@/stores/profile";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();
const numProfiles = ref(0);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await profileStore.fetchProfiles();
  numProfiles.value = profileStore.profiles.length;

  // redirect to the create Profile page if no Profiles exist
  if (numProfiles.value === 0) {
    router.push("/CreateProfile");
  }
  loading.value = false;
});
</script>
