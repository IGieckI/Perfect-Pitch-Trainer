<template>
  <div>
    <button @click="playSound">Play Sound</button>
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  methods: {
    playSound() {
      const sampler = new Tone.Sampler({
        urls: {
          "C4": "C4.mp3",
          "D#4": "Ds4.mp3",
          "F#4": "Fs4.mp3",
          "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
      }).toDestination();

      Tone.loaded().then(() => {
        sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 10);
      })
    }
  }
}
</script>
