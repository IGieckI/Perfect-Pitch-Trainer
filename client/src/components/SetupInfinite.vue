<template>
    <div class="wrapper text-dark">
        <h3 class="text-center fw-bold">Setup Infinite</h3>
        <div class="mt-3">
            <h1>Best score: {{  }}</h1>
            <h2>Last score: {{  }}</h2>
        </div>
        <div class="text-center mt-4 mb-3">
        <button class="btn fs-5" id="setupInfiniteButton" @click.prevent="onSubmit">Start</button>
        </div>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    methods: {
      onSubmit() {          
          this.$emit('setup-complete');
      }
    }
  })
  </script>
  
  <style lang="scss">
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
  
    #setupTestSubmitButton {
      background-color: $submit-button-color;
      color: white;
  
      &:hover {
        background-color: lighten($submit-button-color, 10%);
      }
    }
  }
  </style>
  