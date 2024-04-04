<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h2 class="number"> {{ number }}<br>
                <h3 class="title"><slot></slot></h3>
            </h2>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        number: {
            type: [Number, String],
            required: true
        },
    }
});
</script>

<style scoped lang="scss">
$number-font-size: 60px;
$title-font-size: 25px;
$background-color: #ADD8E6;

.card {
    background-color: $background-color;
    .number {
        font-size: $number-font-size;
    }
    .title {
        font-size: $title-font-size;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}


</style>