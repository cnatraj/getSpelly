/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "./pinia";
import router from "@/router";
import VueGtag from "vue-gtag"; //Google Analytics

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(
      VueGtag,
      {
        config: {
          id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
        },
      },
      router
    );
}
