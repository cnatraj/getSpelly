const utterance = new SpeechSynthesisUtterance();

// utterance.voice = voices[1]
utterance.pitch = 1.0;
utterance.rate = 0.7;
utterance.lang = "en-US";

const speak = function (text) {
  console.log("speak", text);
  utterance.text = text;
  window.speechSynthesis.speak(utterance);
};
export default speak;
