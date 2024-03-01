<script setup lang="ts">

</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Perfect Pitch Trainer</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item me-5">
                        <router-link class="nav-link" to="/infinite">Infinite</router-link>
                    </li>
                    <li class="nav-item me-5">
                        <router-link class="nav-link" to="/set-of-notes">Set Of Notes</router-link>
                    </li>
                    <li class="nav-item me-5">
                        <router-link class="nav-link" to="/sandbox">Sandbox</router-link>
                    </li>
                    <li class="nav-item me-5">
                        <router-link class="nav-link" to="/stats">Stats</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
$text-color: #FFFFFF;
$text-hover-color: #000000;
$font-size-px: 26px;

.navbar {

    text-align: center;

    .navbar-brand {
        margin-right: 10%;
    }

    a {
        font-size: $font-size-px;
        color: $text-color;
        font-weight: bold;
        &:hover {
            color: $text-hover-color;
        }
    }
}
</style>
