<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <SetupTest />
            </div>
        </div>
        <div class="row mt-5 justify-content-center">
            <div class="col text-center">
                <Saxophone />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col">
                <Piano />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Piano from '../components/Piano.vue';
import Saxophone from '../components/Saxophone.vue';
import SetupTest from '../components/SetupTest.vue';

export default defineComponent({
    data() {
        return {};
    },
    methods: {},
    mounted() {
    },
    components: { Piano, Saxophone, SetupTest }
})
</script>
