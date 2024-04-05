<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <Transition name="fade" mode="in-out">
                    <SetupSetOfNotes @setup-complete="setFilters" v-if="!setupComplete" />
                </Transition>
                <TransitionGroup name="fade" mode="in-out" tag="div">
                <div class="game-wrapper d-flex flex-column justify-content-center text-center" key="gameWrapper" v-if="setupComplete">
                    <Saxophone class="mt-4" @play-note="playNote()" @check-note="checkNote(); " />
                    <h1 class="text-light">Turn: {{ currentExerciseNumber }}/{{ exerciseNumber }}</h1>
                    <TransitionGroup name="fade" mode="in-out" tag="div">
                        <h2 id="message" :class="messageClass" :key="message">{{ message }}</h2>
                    </TransitionGroup>
                    <TogglePiano ref="togglePiano" @note-played-by-player="notePlayed" class="mt-4" />
                </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';
import TogglePiano from '../components/TogglePiano.vue';
import Saxophone from '../components/Saxophone.vue';
import SetupSetOfNotes from '../components/SetupSetOfNotes.vue';
import CorrectSound from '../assets/audio/correct_sound_effect.wav';
import WrongSound from '../assets/audio/wrong_sound_effect.wav';
import { SetOfNotesGame } from '../interfaces';
import axios from 'axios';

export default defineComponent({
    data() {
        return {
            // Define a dictionary with the notes divided by category
            // Flat notes are not accepted, only write sharp notes.
            notes: {
                "normal notes": [
                    ['C1'], ['C#1'], ['D#1'], ['E1'], ['F#1'], ['G#1'], ['A#1'], ['C2'], ['C#2'], 
                    ['D#2'], ['F2'], ['F#2'], ['G#2'], ['A#2'], ['C3'], ['C#3'], ['D#3'], ['F3'], 
                    ['F#3'], ['G#3'], ['A#3'], ['C4'], ['C#4'], ['D#4'], ['F4'], ['F#4'], ['G#4'], 
                    ['A#4'], ['C5'], ['C#5'], ['D#5'], ['F5'], ['F#5'], ['G#5'], ['A#5'], ['C6'], 
                    ['C#6'], ['D#6'], ['F6'], ['F#6'], ['G#6'], ['A#6'], ['C7'], ['C#7'], ['D#7'], 
                    ['F7'], ['F#7'], ['G#7'], ['A#7'], ['C8']],
                "minor chords": [
                    ['C1', 'D#1', 'G1'], ['C#2', 'E2', 'G#2'], ['C#2', 'E1', 'G#1'], ['D2', 'F2', 'A2'], 
                    ['D#3', 'F#3', 'A#3'], ['D#3', 'F#3', 'A#3'], ['E3', 'G3', 'B3'], ['F3', 'G#3', 'C4'], 
                    ['F#4', 'A4', 'C#5'], ['F#4', 'A4', 'C#4'], ['G4', 'A#4', 'D5'], ['G#5', 'B5', 'D#6'], 
                    ['G#4', 'B3', 'D#4'], ['A4', 'C5', 'E5'], ['A#5', 'C#6', 'F6'], ['A#5', 'C#6', 'F6'], 
                    ['B5', 'D6', 'F#6']],
                "seventh chords": [
                    ['C1', 'E1', 'G1', 'A#1'], ['C#2', 'F2', 'G#2', 'B2'], ['C#2', 'F2', 'G#2', 'B1'], 
                    ['D2', 'F#2', 'A2', 'C3'], ['D#3', 'G3', 'A#3', 'C#4'], ['D#3', 'G3', 'A#3', 'C#4'], 
                    ['E3', 'G#3', 'B3', 'D4'], ['F3', 'A3', 'C4', 'D#4'], ['F#4', 'A#4', 'C#5', 'E5'], 
                    ['F#4', 'A#4', 'C#5', 'E5'], ['G4', 'B4', 'D5', 'F5'], ['G#5', 'C5', 'D#6', 'F#6'], 
                    ['G#5', 'C5', 'D#6', 'F#6'], ['A5', 'C#6', 'E6', 'G6'], ['A#6', 'D6', 'F7', 'G#7'], 
                    ['A#6', 'D6', 'F7', 'G#7'], ['B6', 'D#7', 'F#7', 'A7']],
                "extended chords": [
                    ['C1', 'E1', 'G1', 'A#1', 'D2'], ['C#2', 'F2', 'G#2', 'B2', 'D#3'], 
                    ['C#2', 'F2', 'G#2', 'B1', 'D#3'], ['D2', 'F#2', 'A2', 'C3', 'E3'], 
                    ['D#3', 'G3', 'A#3', 'C#4', 'F4'], ['D#3', 'G3', 'A#3', 'C#4', 'F4'], 
                    ['E3', 'G#3', 'B3', 'D4', 'F#4'], ['F3', 'A3', 'C4', 'D#4', 'G4'], 
                    ['F#4', 'A#4', 'C#5', 'E5', 'G#5'], ['F#4', 'A#4', 'C#5', 'E5', 'G#5'], 
                    ['G4', 'B4', 'D5', 'F5', 'A5'], ['G#5', 'C5', 'D#6', 'F#6', 'A#6'], 
                    ['G#5', 'C5', 'D#6', 'F#6', 'A#6'], ['A5', 'C#6', 'E6', 'G6', 'B6'], 
                    ['A#6', 'D6', 'F7', 'G#7', 'C7'], ['A#6', 'D6', 'F7', 'G#7', 'C7'], 
                    ['B6', 'D#7', 'F#7', 'A7', 'C#8']],
                "augmented chords": [
                    ['C1', 'E1', 'G#1'], ['C#2', 'F2', 'A2'], ['C#2', 'F2', 'A2'], ['D2', 'F#2', 'A#2'], 
                    ['D#3', 'G3', 'B3'], ['D#3', 'G3', 'B3'], ['E3', 'G#3', 'C4'], ['F3', 'A3', 'C#4'], 
                    ['F#4', 'A#4', 'D5'], ['F#4', 'A#4', 'D5'], ['G4', 'B4', 'D#5'], ['G#5', 'C5', 'E6'], 
                    ['G#5', 'C5', 'E6'], ['A5', 'C#6', 'F6'], ['A#6', 'D6', 'F#7'], ['A#6', 'D6', 'F#7'], 
                    ['B6', 'D#7', 'G7']],
                "diminished chords": [
                    ['C1', 'D#1', 'F#1'], ['C#2', 'E2', 'G2'], ['C#2', 'E2', 'G2'], ['D2', 'F2', 'G#2'], 
                    ['D#3', 'F#3', 'A3'], ['D#3', 'F#3', 'A3'], ['E3', 'G3', 'A#3'], ['F3', 'G#3', 'B3'], 
                    ['F#4', 'A4', 'C5'], ['F#4', 'A4', 'C5'], ['G4', 'A#4', 'C#5'], ['G#5', 'B5', 'D6'], 
                    ['G#5', 'B5', 'D6'], ['A5', 'C6', 'D#6'], ['A#6', 'C#7', 'E7'], ['A#6', 'C#7', 'E7'], 
                    ['B6', 'D7', 'F7']],
                "chords inversions": [
                    ['C1', 'G1', 'E2'], ['C#2', 'G#2', 'F3'], ['C#2', 'G#2', 'F3'], ['D2', 'A2', 'F#3'], 
                    ['D#3', 'A#3', 'G4'], ['D#3', 'A#3', 'G4'], ['E3', 'B3', 'G#4'], ['F3', 'C4', 'A4'], 
                    ['F#4', 'C#5', 'A#5'], ['F#4', 'C#5', 'A#5'], ['G4', 'D5', 'B5'], ['G#5', 'D#6', 'C6'], 
                    ['G#5', 'D#6', 'C6'], ['A5', 'E6', 'C#7'], ['A#6', 'F7', 'D7'], ['A#6', 'F7', 'D7'], 
                    ['B6', 'F#7', 'D#8']]
            } as { [key: string]: string[][] },

            setupComplete: false,

            // Define an array to store the notes to guess chosen in the setup
            totalNotes: [] as string[][],

            // Define informations like exercise numbers, current exercise, and correct exercise guess.
            currentExerciseNumber: 0,
            exerciseNumber: 1,
            correctExerciseNumber: 0,

            // Define the selected categories by the user
            selectedCategories: [] as string[],

            // Define an array to store the note to guess, multiple notes can be played at the same time in a chord
            toGuessNote: [] as string[],

            // Define an array to store the notes currently selected by the user
            selectedNote: [] as string[],

            // Define UI elements
            message: "",
            showTick: false,
            positiveMessages: [
                'Nice job!', 'Well done!', 'You\'re doing good!',
                'Keep it up!', 'Nicely done!'
            ],
            negativeMessages: [
                'Wrong guess!', 'Your guess was wrong!', 'Nice try, but it wasn\'t correct...',
                'Don\'t be discouraged now!', 'Mistakes are human!'
            ],
            // Defines the message type for animations and colors of text
            messageType: 'neutral', // 'positive', 'negative'
        };
    },
    computed: {
        messageClass() {
            if (this.messageType === 'positive') {
                return 'text-success';
            } else if (this.messageType === 'negative') {
                return 'text-danger';
            } else {
                return 'text-light';
            }
        }
    },
    methods: {
        /**
         * Setup the environment
         */
        setFilters(selectedItems: string[], exerciseNumber: number) {
            this.messageType = 'neutral';
            this.setupComplete = true;            
            this.exerciseNumber = exerciseNumber;
            this.message = "Press the saxophone to play the note!";
            this.totalNotes = [];
            this.currentExerciseNumber = 0;
            this.correctExerciseNumber = 0;
            this.selectedCategories = [...selectedItems];
            
            /**
             * This loop adds to totalNotes random notes that respect the filters set by the user.
             * totalNotes will then be used to play the notes to the user.
             */
            for (let i = 0; i < selectedItems.length; i++) {
                let notes: string[][] = this.notes[selectedItems[i].toLowerCase()];
                for (let j = 0; j < notes.length; j++) {
                    this.totalNotes.push(this.notes[selectedItems[i].toLowerCase()][j]);
                }
            }
        },

        /**
         * Choose a random note to play from totalNotes and play it
         */
        playNote() {
            if (this.currentExerciseNumber == this.exerciseNumber) {
                this.message = "Press the saxophone to go back to the setup menu!";
                return;
            }

            this.messageType = 'neutral';
            this.message = "Select the correct keys and then press the saxophone";
            this.toGuessNote = this.totalNotes[Math.floor(Math.random() * this.totalNotes.length)];
            console.log(`Notes to guess: ${this.toGuessNote}`);

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
         * Check if the note played by the user is correct.
         * Checks end of the game, if positive send game data to the server.
         */
        checkNote() {
            // Check the end of the game, show the setup menu in that case and send data to server.
            if (this.currentExerciseNumber == this.exerciseNumber) {
                const game: SetOfNotesGame = {
                    player_id: 0,
                    n_turns: this.exerciseNumber,
                    n_categories: this.selectedCategories.length,
                    n_correct: this.correctExerciseNumber
                }

                axios.post('/api/games/post-set-of-notes-game', game)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
                this.setupComplete = false;
                return;
            }

            // Remove the octave number from the note
            this.selectedNote = this.selectedNote.map(item => item.replace(/\d/g, ''));
            this.toGuessNote = this.toGuessNote.map(item => item.replace(/\d/g, ''));
            
            /**
             * If user guesses the notes, play a positive sound and display a positive message.
             * Else, display a negative message and play a negative sound.
             * Displaying current user score somewhere on the UI could be a good idea.
             */
            if (this.selectedNote.length === this.toGuessNote.length && this.selectedNote.every((value, index) => value === this.toGuessNote[index])) {
    
                this.message = this.positiveMessages[Math.floor(Math.random() * this.positiveMessages.length)];
                this.messageType = 'positive';
                let audio = new Audio(CorrectSound);
                this.correctExerciseNumber++;
                audio.play();
            } else {
                this.message = this.negativeMessages[Math.floor(Math.random() * this.negativeMessages.length)];
                let audio = new Audio(WrongSound);
                this.messageType = 'negative';
                audio.play();
            }

            this.message += " Press the saxophone to play the note!";

            this.currentExerciseNumber++;
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
    components: { TogglePiano, Saxophone, SetupSetOfNotes }
})
</script>

<style scoped lang="scss">
.fade-enter-active {
    transition: opacity 0.5s ease;
}

.fade-leave-active {
    transition: opacity 0s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

#message {
    font-size: 25px;
}
</style>
