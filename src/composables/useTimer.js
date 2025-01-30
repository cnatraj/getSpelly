import { ref } from "vue";

export function useTimer() {
  const startTime = ref(null);
  const completionTime = ref(null);
  const currentTime = ref(0);
  const timerInterval = ref(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const updateTimer = () => {
    if (startTime.value) {
      currentTime.value = Math.floor((Date.now() - startTime.value) / 1000);
    }
  };

  const start = () => {
    stop(); // Clear any existing timer
    startTime.value = Date.now();
    completionTime.value = null;
    currentTime.value = 0;
    timerInterval.value = setInterval(updateTimer, 1000);
  };

  const stop = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
      timerInterval.value = null;
    }
    if (startTime.value && !completionTime.value) {
      completionTime.value = Date.now() - startTime.value;
    }
  };

  return {
    currentTime,
    completionTime,
    formatTime,
    start,
    stop,
  };
}
