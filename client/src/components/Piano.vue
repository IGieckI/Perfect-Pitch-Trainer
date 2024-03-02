<template>
    <div class="piano">
        <div v-for="(note, index) in notes" :key="index" class="key" :class="{'black-key': isBlackKey(note), 'white-key': !isBlackKey(note)}"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Tone from 'tone';

export default defineComponent({
    data() {
        return {
            synth: new Tone.Synth().toDestination(),
            notes: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5']
        }
    },
    methods: {
        isBlackKey(note: string) {
            return note.includes('#');
        },
        playNote(note: string) {
            Tone.context.resume().then(() => {
                this.synth.triggerAttackRelease(note, '8n');
            });
        }
    }
});
</script>



<style scoped lang="scss">
    .piano {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .key {
        border: 1px solid #000;
        height: 150px;
        width: 40px;
        cursor: pointer;
        &:hover {
        background-color: #f0f0f0;
        }
    }

    .black-key {
        background-color: #000;
        position: absolute;
        margin: 0;
        color: #fff;
        width: 30px;
        position: relative;
        top: -25px;
        left: -15px;
        z-index: 1;
        height: 100px;
    }

    .white-key {
        background-color: #fff;
        margin: -1px;
    }
</style>
