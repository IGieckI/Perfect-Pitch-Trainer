<template>
    <div class="piano">
        <div v-for="(note, index) in notes" :key="index" class="key" :class="{ 'black-key': isBlackKey(note), 'white-key': !isBlackKey(note) }" @mousedown="playNote(note)" @mouseup="stopNote"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';

export default defineComponent({
    name: 'PlayablePiano',
    setup() {
        const notes = [
        'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
        'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5'
    ];

    const synth = new Tone.Synth().toDestination();

    const playNote = (note: string) => {
        synth.triggerAttack(note);
    };

    const stopNote = () => {
        synth.triggerRelease();
    };

    const isBlackKey = (note: string) => note.includes('#');

    return { notes, playNote, stopNote, isBlackKey };
    },
});
</script>

<style lang="scss">
.piano {
    display: flex;
    justify-content: center;
    align-items: center;
}

.key {
    cursor: pointer;
    border: 1px solid black;
    height: 150px;
    width: 40px;
    margin: 1px;

    &.black-key {
    background-color: black;
    width: 30px;
    margin: 0;
    position: relative;
    left: -15px;
    z-index: 1;
    height: 100px;
    }

    &.white-key {
    background-color: white;
    }
}
</style>
