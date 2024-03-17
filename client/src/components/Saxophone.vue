<template>
    <img id="saxophone" width="377" height="364" alt="Saxophone" src="../assets/saxophone.svg" @click="bounce(); sendClick();" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Saxophone',
    data() {
        return {
            hasToPlay: true
        };
    },
    methods: {
        bounce() {
            const saxophone = document.getElementById('saxophone');
            if (saxophone) {
                saxophone.style.animation = 'bounce 0.5s';
                setTimeout(() => {
                    saxophone.style.animation = '';
                }, 500);
            }
        },

        sendClick() {
            // First click is to play the note, second click is to check if the note is correct
            if (this.hasToPlay) {
                this.$emit('play-note');
            } else {
                this.$emit('check-note');
            }

            this.hasToPlay = !this.hasToPlay;            
        }
    },
});

// This guy should bounce when clicked
// Bro this guy is NOT bouncing when clicked💀💀

</script>

<style scoped lang="scss">

</style>
