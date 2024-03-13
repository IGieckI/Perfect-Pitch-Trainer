<template>
    <div class="piano-container">
        <ul class="piano-keys-list">
            <li v-for="(note, index) in notes" :key="index" class="key" 
            :class="{ 'black-key': isBlackKey(note), 
            'white-key': !isBlackKey(note), 
            'selected-white-key': isSelected(note),
            'selected-black-key': isSelected(note) && isBlackKey(note) }" 
            @mousedown="playNote(note); 
            sendNoteEvent(note);"></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import * as Tone from 'tone';

export default defineComponent({
    name: 'TogglePiano',
    setup(_, { emit }) {
        const notes = [
        'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
        'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
        'C6'
    ];

    const selectedNotes = reactive([] as string[]);

    const synth = new Tone.Synth().toDestination();

    const playNote = (note: string) => {
        synth.triggerAttackRelease(note, '0.2s');
        const noteIndex = selectedNotes.indexOf(note);
        if (noteIndex !== -1) {
            selectedNotes.splice(noteIndex, 1);
        } else {
            selectedNotes.push(note);
        }
        console.log(selectedNotes);
    };

    const isBlackKey = (note: string) => note.includes('#');

    const sendNoteEvent = (note: string) => {
        emit('note-played-by-player', note);
    }

    const isSelected = (note: string) => {
        return selectedNotes.includes(note);
    }

    return { notes, playNote, isBlackKey, sendNoteEvent, isSelected };
    },
});
</script>

<style lang="scss">
$unselected-white-key-color: #ffffff;
$selected-white-key-color: #f0c0c0;
$unselected-black-key-color: #000000;
$selected-black-key-color: #7a3737;
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
            background-color: $unselected-white-key-color;
        }

        &.black-key {
            width: 2rem;
            height: 9rem;
            border-radius: 5px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            background-color: $unselected-black-key-color;
            z-index: 2;
            margin: 0 -18px 0 -18px;
        }

        &.selected-white-key {
            background-color: $selected-white-key-color;
        }

        &.selected-black-key {
            background-color: $selected-black-key-color;
        }
    }
}

// Temporary media queries

@media screen and (min-width: 821px) and (max-width: 1024px) {
    .piano-keys {
        width: 3rem;
        cursor: pointer;
        position: relative;
        height: 20rem;
        border-radius: 10px;
        border: 1px solid #000;
    }

    .black-key {
        width: 2rem;
        height: 13rem;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: #000;
        z-index: 2;
        margin: 0 -20px 0 -20px;
    }
}

@media screen and (min-width: 768px) and (max-width: 820px) {
    .piano-keys {
        width: 3rem;
        cursor: pointer;
        position: relative;
        height: 16rem;
        border-radius: 10px;
        border: 1px solid #000;
    }

    .black-key {
        width: 1.8rem;
        height: 10rem;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: #000;
        z-index: 2;
        margin: 0 -20px 0 -20px;
    }
}

@media screen and (max-width: 576px) {
    .piano-container {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: auto;
    }

    .piano-keys {
        width: 3rem;
        cursor: pointer;
        position: relative;
        height: 16rem;
        border-radius: 10px;
        border: 1px solid #000;
    }

    .black-key {
        width: 1.8rem;
        height: 10rem;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background-color: #000;
        z-index: 2;
        margin: 0 -20px 0 -20px;
    }
}

</style>
