<template>
    <div>
        <button @click="playSound">Play Sound</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';

export default defineComponent({
    data() {
        return {
            
        }
    },

    methods: {
        playSound() {
            const sampler = new Tone.Sampler({
                urls: {
                    'C4': 'C4.mp3',
                    'D#4': 'Ds4.mp3',
                    'F#4': 'Fs4.mp3',
                    'A4': 'A4.mp3',
                },
                
                release: 0.3,
                baseUrl: 'https://tonejs.github.io/audio/salamander/',
            }).toDestination();

            Tone.loaded().then(() => {
                sampler.triggerAttackRelease(['Eb4', 'G4', 'Bb4'], 10);
            })
        }
    },

    mounted() {
        
    },
})

</script>