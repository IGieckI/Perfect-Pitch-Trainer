<template>
    <img id="saxophone" width="377" height="364" alt="Saxophone" src="../assets/saxophone.svg" @click="bounce" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Saxophone',
    methods: {
        bounce() {
            const saxophone = document.getElementById('saxophone');
            if (saxophone) {
                saxophone.style.animation = 'bounce 0.5s';
                setTimeout(() => {
                    saxophone.style.animation = '';
                }, 500);
            }
        }
    },
});

// This guy should bounce when clicked

</script>

<style lang="scss">

</style>
