const utterance = new SpeechSynthesisUtterance();

// utterance.voice = voices[1]
utterance.pitch = 1.0;
utterance.rate = 0.7;
utterance.lang = "en-US";

// const speak = function (text) {
//   console.log("speak", text);
//   utterance.text = text;
//   window.speechSynthesis.speak(utterance);
// };

const speak = async (text) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_FUNCTIONS_URL}/text-to-speech`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate speech");
    }

    const { audioContent } = await response.json();
    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
    audio.play();
    // startTimer();
  } catch (error) {
    console.error("Error playing audio:", error);
    // Fallback to browser's speech synthesis
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    // startTimer();
  }
};

export default speak;
