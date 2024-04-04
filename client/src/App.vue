<script lang="ts">
import Navbar from './components/Navbar.vue';
import { Transition, defineComponent } from 'vue';

export default defineComponent ({
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  },

  components: { Navbar }
})

</script>

<template>
  <Navbar />
  <Transition name="fade">
    <RouterView />
  </Transition>
</template>

<style scoped lang="scss">

</style>