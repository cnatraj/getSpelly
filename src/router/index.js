/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/services/client";
import { useProfileStore } from "@/stores/profile";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../pages/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../pages/Test.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/testResult/:testId",
    name: "TestResult",
    component: () => import("../pages/TestResult.vue"),
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (session) {
    const profileStore = useProfileStore();
    profileStore.setUser(session.user);

    // If no profiles are loaded, fetch them
    if (profileStore.user && profileStore.profiles.length === 0) {
      await profileStore.fetchProfiles();
    }

    // If no active profile is set but profiles exist, set the first one
    if (!profileStore.activeProfile && profileStore.profiles.length > 0) {
      await profileStore.setActiveProfile(profileStore.profiles[0]);
    }

    // If we still don't have an active profile, logout and redirect to home
    if (!profileStore.activeProfile) {
      // TODO: add logout
      next("/");
      return;
    }
  }

  if (requiresAuth && !session) {
    next("/auth");
  } else if (to.path === "/auth" && session) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
