<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <SetupTest @setup-complete="setFilters" v-if="!setupComplete" />
                <Saxophone class="mt-4" @saxophone-clicked="playSound()" v-if="setupComplete" />
                <Piano class="mt-4" v-if="setupComplete" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';
import Piano from '../components/Piano.vue';
import Saxophone from '../components/Saxophone.vue';
import SetupTest from '../components/SetupTest.vue';

export default defineComponent({
    data() {
        return {
            notes: {
                "normal notes": [['C1'], ['D1'], ['E1'], ['F1'], ['G1'], ['A1'], ['B1'], ['C2'], ['D2'], ['E2'], ['F2'], ['G2'], ['A2'], ['B2'], ['C3'], ['D3'], ['E3'], ['F3'], ['G3'], ['A3'], ['B3'], ['C4'], ['D4'], ['E4'], ['F4'], ['G4'], ['A4'], ['B4'], ['C5'], ['D5'], ['E5'], ['F5'], ['G5'], ['A5'], ['B5'], ['C6'], ['D6'], ['E6'], ['F6'], ['G6'], ['A6'], ['B6'], ['C7'], ['D7'], ['E7'], ['F7'], ['G7'], ['A7'], ['B7'], ['C8']],
                "minor chords": [['C1', 'Eb', 'G'], ['C#', 'E', 'G#'], ['Db', 'Fb', 'Ab'], ['D', 'F', 'A'], ['D#', 'F#', 'A#'], ['Eb', 'Gb', 'Bb'], ['E', 'G', 'B'], ['F', 'Ab', 'C'], ['F#', 'A', 'C#'], ['Gb', 'A', 'Db'], ['G', 'Bb', 'D'], ['G#', 'B', 'D#'], ['Ab', 'Cb', 'Eb'], ['A', 'C', 'E'], ['A#', 'C#', 'E#'], ['Bb', 'Db', 'F'], ['B', 'D', 'F#']]
            } as { [key: string]: string[][] },
            setupComplete: false,
            totalNotes: [] as string[][],
            exerciseNumber: 0,
        };
    },
    methods: {
        playSound() {

            const random_note: string[] = this.totalNotes[Math.floor(Math.random() * this.totalNotes.length)];            

            const note_urls: { [key: string]: string } = {};

            for (let i = 0; i < random_note.length; i++) {
                let note_url: string = random_note[i];
                note_url = note_url.replace('#', 's');
                note_urls[random_note[i]] = note_url + '.mp3';
            }
            console.log(note_urls);

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
                sampler.triggerAttackRelease(random_note, 1);
            })
        },

        setFilters(selectedItems: string[], exerciseNumber: number) {
            this.setupComplete = true;            
            this.exerciseNumber = exerciseNumber;

            console.log("Tipo:" + typeof(selectedItems[0].toLowerCase()))

            for (let i = 0; i < selectedItems.length; i++) {
                let notes: string[][] = this.notes["normal notes"]
                for (let j = 0; j < notes.length; j++) {
                    this.totalNotes.push(this.notes[selectedItems[i].toLowerCase()][j]);
                }
            }
        }
    },
    mounted() {},
    components: { Piano, Saxophone, SetupTest }
})
</script>
