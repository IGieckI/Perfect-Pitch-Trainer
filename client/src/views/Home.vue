<template>
    <div class="container-fluid">
        <div class="row">
            <TogglePiano />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TogglePiano from '../components/TogglePiano.vue';

export default defineComponent({
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: { TogglePiano }
})
</script>
