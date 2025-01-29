import {
  getPointsForProfile,
  initializePointsForProfile,
} from "@/services/profilePoints";
import {
  createProfileForUserId,
  getProfilesByUserId,
} from "@/services/profiles";
import { defineStore } from "pinia";
import { ref } from "vue";
import { usePointsStore } from "./points";

export const useProfileStore = defineStore("profile", () => {
  const user = ref(null);
  const profiles = ref([]);
  const activeProfile = ref(null);
  const loading = ref(false);

  const setUser = (userData) => {
    user.value = userData;
  };

  const setActiveProfile = async (profileData) => {
    console.log("---setActiveProfile---");
    activeProfile.value = profileData;

    if (profileData) {
      const pointsStore = usePointsStore();
      await pointsStore.fetchPoints(profileData.id);
    }
  };

  const setProfiles = (profilesData) => {
    profiles.value = profilesData;
  };

  const fetchProfiles = async () => {
    console.log("---fetchProfiles---");
    try {
      loading.value = true;
      const { data, error } = await getProfilesByUserId(user.value.id);

      if (error) throw error;

      setProfiles(data);

      // set first profile as active, if none is selected
      if (!activeProfile.value && data.length > 0) {
        setActiveProfile(data[0]);
      }
    } catch (error) {
      console.log("error fetching profiles: ", error);
    } finally {
      loading.value = false;
    }
  };

  const createProfile = async (name) => {
    console.log("---createProfile---");
    try {
      loading.value = true;
      const { data, error } = await createProfileForUserId(user.value.id, name);

      if (error) throw error;
      // add new profile to ProfilesList and set as active
      profiles.value = [...profiles.value, data];
      setActiveProfile(data);
    } catch (error) {
      console.log("Error creating profile: ", error);
    } finally {
      loading.value = false;
    }
  };

  const clearUser = () => {
    console.log("---clearUser---");
    user.value = null;
    activeProfile.value = null;
    profiles.value = [];
    const pointsStore = usePointsStore();
    pointsStore.resetPoints();
  };

  return {
    user,
    profiles,
    activeProfile,
    loading,
    setUser,
    setActiveProfile,
    setProfiles,
    fetchProfiles,
    createProfile,
    clearUser,
  };
});
