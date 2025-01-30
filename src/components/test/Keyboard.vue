<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { onMounted, ref, defineEmits, watch } from "vue";

const keyboard = ref(null);
const emits = defineEmits(["onChange"]);
const props = defineProps({
  keyboardInput: String,
});

onMounted(() => {
  keyboard.value = new Keyboard({
    onChange: onChange,
    theme: "hg-theme-default hg-layout-default spellyTheme",
    layoutName: "default",
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "z x c v b n m {backspace}",
      ],
    },
    buttonTheme: [
      {
        class: "hg-small",
        buttons: "{backspace}",
      },
    ],
  });
});

const onChange = (input) => {
  emits("onChange", input);
};

watch(
  () => props.keyboardInput,
  (newVal) => {
    keyboard.value.setInput(newVal);
  }
);
</script>
