<template>
    <div class="piano-container">
        <ul class="piano-keys-list">
            <li v-for="(note, index) in notes" :key="index" class="key" :class="{ 'black-key': isBlackKey(note), 'white-key': !isBlackKey(note)}" 
            @mousedown="playNote(note); sendNoteEvent(note);" @mouseup="stopNote" @touchstart.prevent="playNote(note); sendNoteEvent(note)"
            @touchend.prevent="stopNote()"></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';

export default defineComponent({
    name: 'PlayablePiano',
    setup(_, { emit }) {
        // Define the notes that can be played by our piano.
        // Sharp notes must be written with # symbol, doing otherwise will cause errors to the application.
        // Flat notes will cause errors as well.
        const notes = [
        'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
        'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
        'C6',
        ];

    const synth = new Tone.Synth().toDestination();

    /**
     * 
     * @param note of type string
     * This method is executed when a key is clicked.
     */
    const playNote = (note: string) => {
        synth.triggerAttack(note);
    };

    /**
     * Release the played note.
     */
    const stopNote = () => {
        synth.triggerRelease();
    };

    /**
     * This method determines if a piano key is black by checking if there is the # symbol.
     */
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

    return { notes, playNote, stopNote, isBlackKey, sendNoteEvent };
}
},);
</script>

<style scoped lang="scss">
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
    }
}

// Temporary media queries

/*
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
*/

/*
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
*/

@media screen and (max-width: 960px) {
    .piano-container {
        width: 90%;
        height: 60vh;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: auto;
    }

    /*
    .black-key {
        width: 1.8rem;
        height: 10rem;
        border-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        z-index: 2;
        margin: 0 -20px 0 -20px;
    }
    */
}

</style>