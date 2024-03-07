<template>
    <div class="container-fluid text-center">
        <div class="row">
            <Piano />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Piano from '../components/Piano.vue';

export default defineComponent({
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: { Piano }
})
</script>
