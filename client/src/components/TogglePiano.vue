<template>
    <div class="toggle-piano-container">
        <ul class="toggle-piano-keys-list">
            <li v-for="(note, index) in notes" :key="index" class="key" :class="{
                'black-key': isBlackKey(note),
                'white-key': !isBlackKey(note),
                'selected-white-key': isSelected(note),
                'selected-black-key': isSelected(note) && isBlackKey(note)
            }" @mousedown="playNote(note);
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
        /**
         * Define the notes that can be played by our piano.
         * Sharp notes must be written with # symbol, doing otherwise will cause errors to the application.
         * Flat notes will cause errors as well.
         */
        const notes = [
            'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
            'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
            'C6'
        ];

        /**
        * `selectedNotes` is a reactive array of strings.
        *
        * Each string in the array represents a musical note that has been selected by the user.
        * This array is reactive, meaning that Vue.js will automatically track changes to it and update the DOM whenever it changes.
        * This is useful for keeping track of which notes the user has selected or played, and for updating the UI in response to these changes.
        */
        let selectedNotes = reactive([] as string[]);

        // Declare our Synth.
        const synth = new Tone.Synth().toDestination();

        /**
         * 
         * @param note - a string representing the musical note.
         * 
         * This method plays the desired key and inserts the note into selectedNotes.
         * If note is already in selectedNotes, it is deleted from the array.
         */
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

        /**
        * The `sendNoteEvent` function is an event emitter.
        *
        * @param note - A string representing the musical note.
        *
        * This function emits an event named 'note-played-by-player' with the provided note as its payload.
        * This event can be listened to in the parent component or any other component that has access to this component's events.
        * The purpose of this event is to notify other components when a note has been played by the player.
        */
        const sendNoteEvent = (note: string) => {
            emit('note-played-by-player', note);
        }

        /**
         * 
         * @param note - a string representing the musical note.
         * This method checks if the parameter note is contained in our selectedNotes array.
         */
        const isSelected = (note: string) => {
            return selectedNotes.includes(note);
        }

        /**
         * This method fully resets the selectedNotes array.
         */
        const reset = () => {
            selectedNotes.splice(0, selectedNotes.length);
        }

        return { selectedNotes, notes, playNote, isBlackKey, sendNoteEvent, isSelected, reset };
    },
});
</script>

<style scoped lang="scss">
$unselected-white-key-color: #ffffff;
$selected-white-key-color: #f0c0c0;
$unselected-black-key-color: #000000;
$selected-black-key-color: #7a3737;

.toggle-piano-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .toggle-piano-keys-list {
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

@media screen and (max-width: 960px) {
    .toggle-piano-container {
        width: 100%;
        height: 60vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow-x: scroll;
    }
}
</style>