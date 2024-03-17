<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <SetupInfinite :lastScoreP="score" :bestScore="bestScore" @setup-complete="setFilters" v-if="!setupComplete" />
                <Saxophone class="mt-4" @play-note="playNote()" @check-note="checkNote()" v-if="setupComplete" />
                <h1 v-if="setupComplete" class="text-light">Score: {{ score }}</h1>
                <h2 v-if="setupComplete" class="text-light">{{ message }}</h2>
                <TogglePiano @note-played-by-player="notePlayed" class="mt-4" v-if="setupComplete" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';
import TogglePiano from '../components/TogglePiano.vue';
import Saxophone from '../components/Saxophone.vue';
import SetupInfinite from '../components/SetupInfinite.vue';
import CorrectSound from '../assets/correct_sound_effect.mp3';
import WrongSound from '../assets/wrong_sound_effect.mp3';


/**
 * There's a big issue with the game at the moment. If the user selects an exercise number bigger than one,
 * and gets the first note correctly, they can just start spamming on the saxophone to get through all the
 * next levels. Sometimes notes are not even played, and it seems like there is some issue at the core.
 * The game doesn't fail unless the user deselects the note. If the user does so, the game will bug.
 */
export default defineComponent({
    data() {
        return {
            // Define an array with every possible note
            notes: [['C1'], ['D1'], ['E1'], ['F1'], ['G1'], ['A1'], ['B1'], ['C2'], ['D2'], ['E2'], ['F2'], ['G2'], ['A2'], ['B2'], ['C3'], ['D3'], ['E3'], ['F3'], ['G3'], ['A3'], ['B3'], ['C4'], ['D4'], ['E4'], ['F4'], ['G4'], ['A4'], ['B4'], ['C5'], ['D5'], ['E5'], ['F5'], ['G5'], ['A5'], ['B5'], ['C6'], ['D6'], ['E6'], ['F6'], ['G6'], ['A6'], ['B6'], ['C7'], ['D7'], ['E7'], ['F7'], ['G7'], ['A7'], ['B7'], ['C8'], ['C1', 'Eb', 'G'], ['C#', 'E', 'G#'], ['Db', 'Fb', 'Ab'], ['D', 'F', 'A'], ['D#', 'F#', 'A#'], ['Eb', 'Gb', 'Bb'], ['E', 'G', 'B'], ['F', 'Ab', 'C'], ['F#', 'A', 'C#'], ['Gb', 'A', 'Db'], ['G', 'Bb', 'D'], ['G#', 'B', 'D#'], ['Ab', 'Cb', 'Eb'], ['A', 'C', 'E'], ['A#', 'C#', 'E#'], ['Bb', 'Db', 'F'], ['B', 'D', 'F#']],
            setupComplete: false,
            score: 0,
            bestScore: 0,
            // Define an array to store the note to guess, multiple notes can be played at the same time in a chord
            toGuessNote: [] as string[],
            // Define an array to store the notes currently selected by the user
            selectedNote: [] as string[],
            message: "",
            positiveMessages: ["Good", "Good good", "Very nice", "Damn", "Continue like this", "What an hear", "Whow, you impressed me"],
        };
    },
    methods: {
        /**
         * Setup the environment
         */
        setFilters() {
            this.setupComplete = true;
            this.message = "Press the saxophone to play the note!";
            this.score = 0;
        },
        
        /**
         * Choose a random note to play and play it
         */
        playNote() {
            this.message = "Select the key(s) you think were played and then press the saxophone!";
    
            this.toGuessNote = this.notes[Math.floor(Math.random() * this.notes.length)];
            console.log(this.toGuessNote);
            const sampler = new Tone.Sampler({
                urls: {
                    A1: "A1.mp3",
                    A2: "A2.mp3",
                    A3: "A3.mp3",
                    A4: "A4.mp3",
                    A5: "A5.mp3",
                    A6: "A6.mp3",
                    A7: "A7.mp3",
                },
                release: 0.3,
                baseUrl: 'https://tonejs.github.io/audio/salamander/',
            }).toDestination();

            Tone.loaded().then(() => {
                sampler.triggerAttackRelease(['C1', 'Eb', 'G'], 3);
            })
        },
        
        /**
         * Check if the note played by the user is correct
         */
        checkNote() {
            // Remove the octave number from the note
            this.selectedNote = this.selectedNote.map(item => item.replace(/\d/g, ''));
            this.toGuessNote = this.toGuessNote.map(item => item.replace(/\d/g, ''));

            if (this.selectedNote.length === this.toGuessNote.length && this.selectedNote.every((value, index) => value === this.toGuessNote[index])) {
                this.message = this.positiveMessages[Math.floor(Math.random() * this.positiveMessages.length)];
                let audio = new Audio(CorrectSound);
                audio.play();
                this.score++;
            } else {
                this.message = "Eww, pathetic!";
                let audio = new Audio(WrongSound);
                audio.play();
                this.setupComplete = false;
            }

            this.message += ", press the saxophone to play the next note!";

            // Reset the environment
            this.selectedNote = [];
            this.toGuessNote = [];
        },
        
        /**
         * Store the note played by the user, deselect it if it was already selected
         */
        notePlayed(note: string) {
            if (this.selectedNote.includes(note)) {
                this.selectedNote.splice(this.selectedNote.indexOf(note), 1);
            } else {
                this.selectedNote.push(note);
            }
        },
    },
    components: { TogglePiano, Saxophone, SetupInfinite }
})
</script>

<style scoped lang="scss">

</style>
