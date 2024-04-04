<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3 justify-content-center">
                <SetupInfinite :lastScoreP="score" :bestScore="bestScore" @setup-complete="setFilters" v-if="!setupComplete" />
                <div class="game-wrapper d-flex flex-column justify-content-center text-center">
                    <Saxophone class="mt-4 justify-self-center" @play-note="playNote()" @check-note="checkNote()" v-if="setupComplete" />
                    <h1 v-if="setupComplete" class="text-light">Score: {{ score }}</h1>
                    <h2 v-if="setupComplete" class="text-light">{{ message }}</h2>
                    <TogglePiano ref="togglePiano" @note-played-by-player="notePlayed" class="mt-4" v-if="setupComplete" />
                </div>
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
import CorrectSound from '../assets/audio/correct_sound_effect.wav';
import WrongSound from '../assets/audio/wrong_sound_effect.wav';

export default defineComponent({
    data() {
        return {
            // Define an array with every possible note
            // Only define sharp notes, flat notes are not accepted and will cause errors.
            notes: [
                ['C1'], ['C#1'], ['D1'], ['D#1'], ['E1'], ['F1'], ['F#1'], ['G1'], ['G#1'], ['A1'], ['A#1'], ['B1'],
                ['C2'], ['C#2'], ['D2'], ['D#2'], ['E2'], ['F2'], ['F#2'], ['G2'], ['G#2'], ['A2'], ['A#2'], ['B2'],
                ['C3'], ['C#3'], ['D3'], ['D#3'], ['E3'], ['F3'], ['F#3'], ['G3'], ['G#3'], ['A3'], ['A#3'], ['B3'],
                ['C4'], ['C#4'], ['D4'], ['D#4'], ['E4'], ['F4'], ['F#4'], ['G4'], ['G#4'], ['A4'], ['A#4'], ['B4'],
                ['C5'], ['C#5'], ['D5'], ['D#5'], ['E5'], ['F5'], ['F#5'], ['G5'], ['G#5'], ['A5'], ['A#5'], ['B5'],
                ['C6'], ['C#6'], ['D6'], ['D#6'], ['E6'], ['F6'], ['F#6'], ['G6'], ['G#6'], ['A6'], ['A#6'], ['B6'],
                ['C7'], ['C#7'], ['D7'], ['D#7'], ['E7'], ['F7'], ['F#7'], ['G7'], ['G#7'], ['A7'], ['A#7'], ['B7'],
                ['C8'], ['C#8'], ['D8'], ['D#8'], ['E8'], ['F8'], ['F#8'], ['G8'], ['G#8'], ['A8'], ['A#8'], ['B8']
            ],
            setupComplete: false,
            score: 0,
            bestScore: 0,
            // Define an array to store the note to guess, multiple notes can be played at the same time in a chord
            toGuessNote: [] as string[],
            // Define an array to store the notes currently selected by the user
            selectedNote: [] as string[],
            message: "",
            positiveMessages: ["Good", "Good good", "Very nice", "Damn", "Keep going like this", "What a ear", "Wow, you impressed me"],
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
                sampler.triggerAttackRelease(this.toGuessNote, 3);
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
                let audio = new Audio(WrongSound);
                audio.play();
                this.setupComplete = false;
            }

            this.message += ", press the saxophone to play the next note!";

            // Reset the environment
            this.selectedNote = [];
            this.toGuessNote = [];
            // Resets the component's array when notes are checked
            (this.$refs.togglePiano as any).reset();
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
