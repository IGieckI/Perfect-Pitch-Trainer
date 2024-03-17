<template>
    <div class="wrapper text-dark">
        <h3 class="text-center fw-bold">Select the Chords you'd like to train on</h3>
        <form class="ms-4 mt-3" id="notesConfigurationForm">
            <div class="form-check" v-for="(item, index) in items" :key="index">
                <input type="checkbox" :id="item" class="form-check-input" v-model="selectedItems" :value="item">
                <label class="form-check-label" :for="item">{{ item }}</label>
            </div>
            <div class="mt-3">
                <label for="exerciseNumber" class="fw-semibold">Exercise number: </label>
                <input type="number" id="exerciseNumber" class="form-control fs-5" v-model="exerciseNumber">
            </div>
        </form>
        <div class="text-center mt-4 mb-3" form="notesConfigurationForm">
            <button type="submit" class="btn fs-5" @click.prevent="onSubmit">Confirm</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            // List of set of training notes
            items: ['Normal Notes', 'Minor Chords', 'Seventh Chords', 'Extended Chords', 'Major Chords', 'Augmented Chords', 'Diminished Chords', 'Chords Inversions'],
            selectedItems: [],
            exerciseNumber: 1
        }
    },
    methods: {
        /**
         * Check input data and then emits the setup-complete event
         */
        onSubmit() {
            if (this.selectedItems.length == 0) {
                alert('Please select at least one item');
                return;
            }

            if (this.exerciseNumber < 1) {
                alert('Please select a valid exercise number');
                return;
            }

            this.$emit('setup-complete', this.selectedItems, this.exerciseNumber);
        }
    }
})
</script>

<style scoped lang="scss">
$wrapper-background-color: #ffffff;
$wrapper-border-color: #000000;
$submit-button-color: #570000;

.wrapper {
    background-color: $wrapper-background-color;
    border: 1px solid $wrapper-border-color;
    border-radius: 10px;
    margin: auto;
    font-size: 22px;
    font-weight: 500;
    form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        .form-check-input {
            border: 2px solid black;
        }
    }

    .btn {
        background-color: $submit-button-color;
        color: white;

        &:hover {
            background-color: lighten($submit-button-color, 10%);
        }
    }
}
</style>
