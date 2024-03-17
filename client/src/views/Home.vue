<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="title mt-4">Welcome to Perfect Pitch Trainer! 🎹<br>Select one of the following options to start</h2>
            </div>
        </div>
        <div class="container-home mt-5">
            <HomeContainer class="container-home-item" @button-clicked="infiniteButtonClick">
                <template #title>Infinite</template>
                <template #content>Best score goes here</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="setOfNotesButtonClick">
                <template #title>Set Of Notes</template>
                <template #content>Correct Guess Percentage: 100%</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="sandboxButtonClick">
                <template #title>Sandbox</template>
                <template #content>Practice in Sandbox mode</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="statsButtonClick">
                <template #title>Stats</template>
                <template #content>See your statistics</template>
                <template #action>See</template>
            </HomeContainer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeContainer from '../components/HomeContainer.vue';

export default defineComponent({
    components: { HomeContainer },
    data() {

    },
    methods: {
        infiniteButtonClick() {
            this.$router.push('/infinite');
        },

        setOfNotesButtonClick() {
            this.$router.push('/set-of-notes');
        },

        sandboxButtonClick() {
            this.$router.push('/sandbox');
        },

        statsButtonClick() {
            this.$router.push('/stats');
        }
    }

})
</script>

<style scoped lang="scss">
$title-color: #ffffff;
$title-stroke-color: #000000;

.title {
    color: $title-color;
    font-size: 50px;

    @media (max-width: 906px) {
        font-size: 30px;
    }
}

.container-home {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    row-gap: 30px;

    .container-home-item {
        width: 60%;
    }

    @media (max-width: 906px) {
        .container-home-item {
            width: 80%;
        }
        grid-template-columns: 1fr;
    }
}

</style>
