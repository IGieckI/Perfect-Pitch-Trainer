<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <Piano class="mt-4" />
                <TogglePiano class="mt-5" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Piano from '../components/Piano.vue';
import TogglePiano from '../components/TogglePiano.vue';

export default defineComponent({
    components: { Piano, TogglePiano }
})
</script>
