<template>
    <div class="container-fluid">
        <div class="row mt-5">
            <div class="col">
                <SetupTest @setup-complete="setupComplete = true" v-if="!setupComplete" />
                <Piano class="mt-4" v-if="setupComplete" />
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
        return {
            setupComplete: false
        };
    },
    methods: {},
    mounted() {
    },
    components: { Piano, Saxophone, SetupTest }
})
</script>
