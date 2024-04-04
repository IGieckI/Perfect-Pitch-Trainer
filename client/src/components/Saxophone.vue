<template>
    <img id="saxophone" width="300" height="300" alt="Saxophone" src="../assets/svg/Saxophone.svg" @click="sendClick();" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Saxophone',
    data() {
        return {
            hasToPlay: true,
        };
    },
    methods: {

        /**
         * This method emits the play-note event if hasToPlay is true.
         * Otherwise it emits check-note event if hasToPlay is false.
         * After emitting our event, hasToPlay is toggled, switching its state.
         */
        sendClick() {
            if (this.hasToPlay) {
                this.$emit('play-note');
            } else {
                this.$emit('check-note');
            }

            this.hasToPlay = !this.hasToPlay;            
        }
    },
});

</script>

<style scoped lang="scss">
#saxophone {
    width: 90%;
    margin: auto;
    cursor: pointer;
}

</style>
