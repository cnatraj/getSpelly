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
    path: "/createProfile",
    name: "CreateProfile",
    component: () => import("../pages/CreateProfile.vue"),
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // Check for active session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (requiresAuth && !session) {
    next("/auth");
  } else if (to.path === "/auth" && session) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
