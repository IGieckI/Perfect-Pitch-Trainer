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
.fade-enter-active, .fade-leave-active {
transition: opacity 0.7s ease;
  }
  
.fade-enter-from, .fade-leave-to {
opacity: 0;
  }
</style>