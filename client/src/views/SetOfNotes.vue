<template>
    <div class="setup" >
        <SetupTest />
    </div>
    <div class="container-fluid text-center">
        <div class="row">
            <Saxophone />
        </div>
        <div class="row">
            <Piano />
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
