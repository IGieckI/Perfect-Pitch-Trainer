<template>
    <div class="container mt-5">
        <div class="wrapper d-flex flex-column align-self-center justify-content-center text-center">
            <div class="header d-flex justify-content-evenly align-items-center mt-4">
                <img :src="userIcon" id="userPfp">
                <h1>Fish, you're doing pretty bad
                    <br><h4>You better get training if you don't want to be replaced by AI.</h4>
                </h1>
            </div>
            <div class="cards d-flex justify-content-evenly align-items-center mt-5">
                <StatsCard :number="infiniteBestScore">
                    <template v-slot:default>Infinite Best Score</template>
                </StatsCard>
                <StatsCard :number="noteAccuracyPercentage">
                    <template v-slot:default>SON Note Accuracy</template>
                </StatsCard>
            </div>
            <hr class="mt-5">
            <h2 class="mt-1">Here's how you're doing overtime!</h2>
            <div class="chart-container">
                <canvas id="chart"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatsCard from '../components/StatsCard.vue';
import userIcon from '../assets/img/userIcon.png';
import axios from 'axios';

export default defineComponent({
    data() {
        return {
            userIcon,
            infiniteBestScore: 0,
            noteAccuracyPercentage: '',
        }
    },
    /**
     * Methods here are needed to retrieve data from the API.
     * Chart.js code is also needed to represent canvas, but I need some data to work on.
     */
    methods: {
        /**
         * Get user stats through a GET request.
         */
        async getUserStats() {
            const response = await axios.get('/api/stats/get-stats/0');
            if (response && response.status === 200) {
                this.infiniteBestScore = response.data.best_score_infinite;
                this.noteAccuracyPercentage = response.data.average_accuracy_set_of_notes;
                this.noteAccuracyPercentage += '%';
            } else {
                console.error('Could not retrieve data. Values will be initialized to 0.')
                this.noteAccuracyPercentage = '0%';
            }
        },
    },
    mounted() {
        this.getUserStats();
    },

    components: { StatsCard }
})
</script>

<style scoped lang="scss">
$container-color: #ffffff;
$wrapper-text-color: #000000;

.wrapper {
    width: 90%;
    margin: auto;
    border-radius: 40px;
    font-family: 'Roboto', sans-serif;
    background-color: $container-color;
    border: 1px solid black;
    color: $wrapper-text-color;

    #userPfp {
        width: 20%;
        height: auto;
        border-radius: 100%;
        border: solid black 4px;
    }

    @media (max-width: 1200px) {
        width: 100%;
        
        .header {
            flex-direction: column;

            #userPfp {
                width: 40%;
            }
        }

        .cards {
            flex-direction: column;
            gap: 25px;
        }
    }
}


</style>