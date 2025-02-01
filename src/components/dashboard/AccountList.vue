<template>
  <v-list class="mx-2 my-4" bg-color="white" elevation="0">
    <v-list-subheader>ADVENTURE TOOLS</v-list-subheader>
    <v-list-item @click="logout">
      <template v-slot:prepend>
        <v-avatar color="secondary-lighten">
          <v-icon icon="mdi-logout" color="secondary-darken"></v-icon>
        </v-avatar>
      </template>
      <v-list-item-title> Logout </v-list-item-title>
      <v-divider class="mt-3"></v-divider>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { supabase } from "@/services/client";
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  supabase.auth.signOut();
};
</script>
