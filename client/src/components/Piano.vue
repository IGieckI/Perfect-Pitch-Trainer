<template>
    <div class="piano-container">
        <ul class="piano-keys-list">
            <li v-for="(note, index) in notes" :key="index" class="key" :class="{ 'black-key': isBlackKey(note), 'white-key': !isBlackKey(note) }" @mousedown="playNote(note)" @mouseup="stopNote"></li>
        </ul>
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
        'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
        'C6'
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
.piano-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .piano-keys-list {
        list-style: none;
        display: flex;
        justify-content: center;
    }

    .key {
        width: 4rem;
        cursor: pointer;
        position: relative;
        height: 15rem;
        border: 1px solid #000;

        &.white-key {
            background-color: white;
        }

        &.black-key {
            width: 2rem;
            height: 9rem;
            border-radius: 5px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background-color: #000;
            z-index: 2;
            margin: 0 -18px 0 -18px;
        }
    }
}

// MEDIA QUERIES ARE NEEDED HERE FOR RESPONSIVENESS

</style>
