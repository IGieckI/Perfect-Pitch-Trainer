<template>
  <div class="container mt-5">
    <div class="card">
      <h5 class="card-header text-center title-text">SETUP TEST</h5>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <ul class="list-unstyled">
              <li class="mb-2"><input type="checkbox" id="normal-notes" name="normal-notes" value="normal-notes" class="round-checkbox"><label for="normal-notes">Normal Notes</label></li>
              <li class="mb-2"><input type="checkbox" id="minor-chords" name="minor-chords" value="minor-chords" class="round-checkbox"><label for="minor-chords">Minor Chords</label></li>
              <li class="mb-2"><input type="checkbox" id="seventh-chords" name="seventh-chords" value="seventh-chords" class="round-checkbox"><label for="seventh-chords">Seventh Chords</label></li>
              <li class="mb-2"><input type="checkbox" id="extended-chords" name="extended-chords" value="extended-chords" class="round-checkbox"><label for="extended-chords">Extended Chords</label></li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-unstyled">
              <li class="mb-2"><input type="checkbox" id="major-chords" name="major-chords" value="major-chords" class="round-checkbox"><label for="major-chords">Major Chords</label></li>
              <li class="mb-2"><input type="checkbox" id="augmented-chords" name="augmented-chords" value="augmented-chords" class="round-checkbox"><label for="augmented-chords">Augmented Chords</label></li>
              <li class="mb-2"><input type="checkbox" id="diminished-chords" name="diminished-chords" value="diminished-chords" class="round-checkbox"><label for="diminished-chords">Diminished Chords</label></li>
              <li class="mb-2"><input type="checkbox" id="chords-inversions" name="chords-inversions" value="chords-inversions" class="round-checkbox"><label for="chords-inversions">Chords Inversions</label></li>
            </ul>
          </div>
          <div class="row mt-3">
            <div class="col-md-6 offset-md-3 mt-3">
              <div class="form-group d-flex align-items-center">
                <label for="exercises-number" class="mr-3">Exercises number:</label>
                <input type="text" id="exercises-number" class="form-control narrower-input" placeholder="Enter number of exercises">
              </div>
            </div>
          </div>
          <div class="col-md-6 offset-md-3 mt-3">
            <button type="button" class="button btn btn-primary btn-block ">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SetupTest',
});
</script>

<style lang="scss">
  .round-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid black;
    outline: none;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    margin-right: 8px;
  }
  
  .round-checkbox:checked::after {
    content: '';
    width: 8px;
    height: 8px;
    background: black;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .narrower-input {
    width: 230px; /* Adjust width as needed */
  }

  .button {
    background-color: #570000
  }

  a {
    font-weight: bold;
  }
</style>