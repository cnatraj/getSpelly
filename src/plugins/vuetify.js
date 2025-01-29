/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
// import "vuetify/styles";
import "@/styles/settings.scss";

// Composables
import { createVuetify } from "vuetify";

const customTheme = {
  dark: false,
  colors: {
    surface: "#EDF8E1",
    primary: "#FFBF32",
    secondary: "#1Ec6f2",
    tertiary: "#529917",
    "primary-lighten": "#FFF7D3",
    "secondary-lighten": "#BAF4FF",
    "tertiary-lighten": "#E5F9CE",
    "primary-darken": "#462104",
    "secondary-darken": "#072F45",
    "tertiary-darken": "#162B08",
    error: "#F44336",
    info: "#8ECAE6",
    success: "#4CAF50",
    warning: "#FFC107",
    darkText: "#160E12",
    "on-background": "#160E12",
    "on-surface": "#160E12",
    "on-white": "#160E12",
    "on-primary-lighten": "#160E12",
    "on-secondary-lighten": "#160E12",
    "on-tertiary-lighten": "#160E12",
    "surface-bright": "#FFFFFF",
    "surface-light": "#EEEEEE",
    "surface-variant": "#424242",
    "on-surface-variant": "#EEEEEE",
    "primary-darken-1": "#5F9CE7",
    "secondary-darken-1": "#13f64c",
    "secondary-lighten-1": "#86d6ea",
    // background: "#F9F9F9",
    // surface: "#F7CA46",
    // primary: "#9AC1F0",
    // secondary: "#72FA93",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "theme-text-color": "#160E12",
    "font-family": "'Gabarito', sans-serif",
  },
};

// Create style element to override .bg-white
// .bg-white has text color set to #000 with !important
const style = document.createElement("style");
style.textContent = `
  .bg-white {
    color: rgb(var(--v-theme-on-background)) !important;
  }
`;
document.head.appendChild(style);

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: { customTheme },
  },
  defaults: {
    VBtn: {
      color: "primary",
      class: "text-primary-darken",
      rounded: true,
      block: true,
      size: "large",
      elevation: 0,
    },
    global: {
      font: {
        family: "Gabarito",
      },
    },
  },
});
