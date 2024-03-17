<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
                <h2 class="title mt-4">Welcome to Perfect Pitch Trainer! 🎹<br>Select one of the following options to start</h2>
            </div>
        </div>
        <div class="container-home mt-5">
            <HomeContainer class="container-home-item" @button-clicked="handleActionClicked">
                <template #title>Infinite</template>
                <template #content>Best score goes here</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="handleActionClicked">
                <template #title>Set Of Notes</template>
                <template #content>Correct Guess Percentage: 100%</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="handleActionClicked">
                <template #title>Sandbox</template>
                <template #content>Practice in Sandbox mode</template>
                <template #action>Start</template>
            </HomeContainer>
            <HomeContainer class="container-home-item" @button-clicked="handleActionClicked">
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
        handleActionClicked() {
            console.log(`Button clicked in component!`)
        }
    }

})
</script>

<style lang="scss">
$title-color: #ffffff;
$title-stroke-color: #000000;

.title {
    color: $title-color;
    font-size: 50px;
}

.container-home {
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    row-gap: 30px;
    .container-home-item {
        width: 50%;
    }

    @media (max-width: 906px) {
        .container-home-item {
            width: 70%;
        }
        grid-template-columns: 1fr;
    }
}

</style>
