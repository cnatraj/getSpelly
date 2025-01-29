<template>
  <v-img src="@/assets/images/spelly-login-bg.jpg" height="600" cover>
    <Logo class="mt-4" />

    <Spelly
      image-url="spelly-hi"
      text="An adult’s help is needed to log in and start your journey."
    />

    <div class="text-center mx-2">
      <p class="text-h5 text-tertiary mt-4 font-weight-bold">
        Ready to Begin Your Adventure?
      </p>
      <p>
        Logging in allows you to save progress, track achievements, and continue
        the adventure across devices!
      </p>

      <v-btn class="my-4" @click="signInWithGoogle" :loading="loading"
        ><v-icon start>mdi-google</v-icon>Sign In with Google</v-btn
      >
    </div>
  </v-img>
</template>

<script setup>
import { supabase } from "@/services/client";
import { createUserAccount, getUserAccountByUserId } from "@/services/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Logo from "@/components/common/Logo.vue";
import Spelly from "@/components/common/Spelly.vue";

const loading = ref(false);
const router = useRouter();

const signInWithGoogle = async () => {
  loading.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: import.meta.env.VITE_APP_URL,
      },
    });

    if (error) throw error;
    if (data.session) {
      await handleAuthStateChange(data.session);
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    loading.value = false;
  }
};

const handleAuthStateChange = async (session) => {
  if (!session) return;

  try {
    const existingAccount = await getUserAccountByUserId(session.user.id);

    if (!existingAccount) {
      // create a new user account
      const insertError = createUserAccount(
        session.user.id,
        session.user.user_metadata.full_name
      );

      if (insertError) throw insertError;
    }

    // send user to test page
    router.push("/dashboard");
  } catch (error) {
    console.log("error Inserting user Account: ", error);
  }
};
</script>
