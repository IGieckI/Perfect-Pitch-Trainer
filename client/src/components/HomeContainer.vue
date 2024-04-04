<template>
    <div class="home-container text-dark d-flex flex-column">
        <h3 class="text-center fw-bolder fs-2"><slot name="title">Home Container Title</slot></h3>
        <div class="mt-3 text-left fs-3 ps-3 fw-bold">
            <slot name="content">Home Container Content.</slot>
        </div>
        <div class="text-center mt-4 mb-3">
            <button class="btn fw-bold" @click="handleClick">
                <slot name="action"></slot>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeContainer',
    data() {
        return {

        }
    },
    /**
     * Handles click on this container's button, emitting an event.
     */
    methods: {
        handleClick() {
            this.$emit('button-clicked');
        },
    }
})
</script>

<style scoped lang="scss">
$wrapper-background-color: #dddddd;
$wrapper-hover-background-color: #ffffff;
$wrapper-border-color: #000000;
$submit-button-text-color: #ffffff;
$submit-button-color: #570000;

.home-container {
    background-color: $wrapper-background-color;
    border: 2px solid $wrapper-border-color;
    border-radius: 20px;
    height: auto;
    font-size: 22px;
    transition: transform 0.3s ease-in-out;
    justify-content: space-between;
    &:hover {
        transform: translateY(-10px);
        background-color: $wrapper-hover-background-color;
        transition: 0.7s ease-in-out;
    }

    @media screen and (max-width: 1202px) {
        // On mobile it's impossible to hover, so we make containers white by default.
        background-color: $wrapper-hover-background-color;
    }
    .btn {
        background-color: $submit-button-color;
        color: $submit-button-text-color;
        font-size: 23px;
        width: 30%;

        @media screen and (max-width: 1202px) {
            width: 40%;
        }

        &:hover {
            background-color: lighten($submit-button-color, 10%);
        }
    }

}
</style>