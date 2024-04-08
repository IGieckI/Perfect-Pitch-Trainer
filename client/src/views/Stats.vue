<template>
    <div class="container mt-5 mb-5">
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
                <canvas ref="chart"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatsCard from '../components/StatsCard.vue';
import userIcon from '../assets/img/userIcon.png';
import axios from 'axios';
import { InfiniteGameStats, SetOfNotesGameStats } from '../interfaces';
import { Chart, registerables } from 'chart.js';

export default defineComponent({
    data() {
        return {
            userIcon,
            infiniteBestScore: 0,
            noteAccuracyPercentage: '',
            setOfNotesGames: [] as SetOfNotesGameStats[],
            infiniteGames: [] as InfiniteGameStats[],
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

        /**
         * Get JSON document containing all user's set of notes games.
         */
        async getSetOfNotesGames() {
            const response = await axios.get('/api/games/get-all-set-of-notes-games/0');
            if (response && response.status === 200) {
                console.log(response.data);
                this.setOfNotesGames = response.data;
            } else {
                console.error('Could not retrieve set of notes games. Chart won\'t be visualized.');
            }
        },

        /**
         * Get JSON document containing all user's infinite games.
         */
        async getInfiniteGames() {
            const response = await axios.get('/api/games/get-all-infinite-games/0');
            if (response && response.status === 200) {
                console.log(response.data);
                this.infiniteGames = response.data;
            } else {
                console.error('Could not retrieve infinite games. Chart won\'t be visualized');
            }
        },

        /**
         * Create chart and visualize data on it.
         */
        createChart() {
        const ctx = this.$refs.chart as HTMLCanvasElement;
        
        // Extract days and scores from the game data
        const setOfNotesDays = this.setOfNotesGames.map(game => {
            const date = new Date(game.date);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
        const setOfNotesScores = this.setOfNotesGames.map(game => game.n_correct);
        const infiniteDays = this.infiniteGames.map(game => {
            const date = new Date(game.date);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        });
        const infiniteScores = this.infiniteGames.map(game => game.score);

        // Create objects to store the sum of scores for each day and mode
        const setOfNotesScoresByDay: { [key: string]: number } = {};
        const infiniteScoresByDay: { [key: string]: number } = {};

        // Sum the scores for each day and mode
        setOfNotesDays.forEach((day, index) => {
            if (!setOfNotesScoresByDay[day]) {
                setOfNotesScoresByDay[day] = 0;
            }
            setOfNotesScoresByDay[day] += setOfNotesScores[index];
        });

        infiniteDays.forEach((day, index) => {
            if (!infiniteScoresByDay[day]) {
                infiniteScoresByDay[day] = 0;
            }
            infiniteScoresByDay[day] += infiniteScores[index];
        });

        // Extract the unique days
        const uniqueDays = [...new Set([...setOfNotesDays, ...infiniteDays])];

        // Create arrays for the summed scores for each mode
        const setOfNotesSummedScores = uniqueDays.map(day => setOfNotesScoresByDay[day] || 0);
        const infiniteSummedScores = uniqueDays.map(day => infiniteScoresByDay[day] || 0);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: uniqueDays,
                datasets: [
                    {
                        label: 'Set Of Notes Scores',
                        data: setOfNotesSummedScores,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    },
                    {
                        label: 'Infinite Scores',
                        data: infiniteSummedScores,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Score'
                        }
                    }
                }
            }
        });
        }
    },

    mounted() {
        this.getUserStats();
        this.getSetOfNotesGames();
        this.getInfiniteGames();
        Chart.register(...registerables)

        Promise.all([this.getSetOfNotesGames(), this.getInfiniteGames()])
            .then(() => {
                this.createChart();
            })
    },

    components: { StatsCard }
})
</script>

<style scoped lang="scss">
$wrapper-color: #ffffff;
$wrapper-shadow: 0px 4px 8px rgba(0, 0, 0, 1);
$wrapper-text-color: #000000;

.wrapper {
    width: 90%;
    margin: auto;
    border-radius: 40px;
    font-family: 'Roboto', sans-serif;
    background-color: $wrapper-color;
    border: 1px solid black;
    color: $wrapper-text-color;
    box-shadow: $wrapper-shadow;

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
                margin-bottom: 20px;
            }
        }

        .cards {
            flex-direction: column;
            gap: 25px;
        }
    }
}

</style>