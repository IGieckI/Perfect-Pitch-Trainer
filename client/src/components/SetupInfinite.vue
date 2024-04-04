<template>
    <div class="wrapper text-dark d-flex flex-column">
        <h3 class="text-center fw-bolder fs-2">Infinite Mode</h3>
        <div class="mt-3 text-left fs-3 ps-3">
            <p>Best score: <span class="fw-bold">{{ bestScore }}</span></p>
            <p>Last score: <span class="fw-bold">{{ lastScore }}</span></p>
        </div>
        <div class="text-center mt-4 mb-3">
            <button class="btn" @click.prevent="onSubmit">Start</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        // Last game score
        lastScoreP: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            bestScore: 0,
            lastScore: 0
        }    
    },
    mounted() {
        console.log("Last score: " + this.lastScoreP);
        if (this.lastScoreP) {
            this.lastScore = this.lastScoreP;
            this.bestScore = this.lastScore > this.bestScore ? this.lastScore : this.bestScore;
        }
    },
    methods: {
        /**
         * Emits the setup-complete event
        */
        onSubmit() {
            this.$emit('setup-complete');
        },

        /**
         * This method retrieves the best score by the database through an API call.
         */
        getBestScore() {

        }
    }
})
</script>

<style scoped lang="scss">
$wrapper-background-color: #ffffff;
$wrapper-border-color: #000000;
$submit-button-text-color: #ffffff;
$submit-button-color: #570000;

.wrapper {
    background-color: $wrapper-background-color;
    border: 2px solid $wrapper-border-color;
    border-radius: 10px;
    margin: auto;
    width: 60%;
    font-size: 22px;

    @media (max-width: 890px) {
        width: 65%;
    }
    

    .btn {
        background-color: $submit-button-color;
        color: $submit-button-text-color;
        font-size: 20px;
        font-weight: bold;

        &:hover {
            background-color: lighten($submit-button-color, 10%);
        }
    }

}
</style>