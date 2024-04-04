<script setup lang="ts">

</script>

<template>
    <nav class="navbar navbar-expand-xl">
        <div class="container-fluid">
            <router-link class="navbar-brand ms-4" to="/">Perfect Pitch Trainer</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
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
$text-color: #ca9c26;
$text-hover-color: #ffbf00;
$brand-size-mobile: 24px;
$font-size: 26px;
$font-weight: 600;
$border-color: #00000044;

.navbar {
    text-align: center;
    border-bottom: 1px solid $border-color;

    .navbar-brand {
        font-size: $font-size;
        color: $text-color;
        font-weight: $font-weight;
        margin-right: 10%;
        transition: color 0.3s ease;
        &:hover {
            color: $text-hover-color;
        }

    // Adjust brand size on mobile devices
    @media screen and (max-width: 500px) {
    font-size: $brand-size-mobile;
        }
    }

  // Nav link styles with hover and active state customization
    .nav-link, .router-link-exact-active {
        font-size: $font-size;
        color: $text-color;
        font-weight: $font-weight;
        transition: color 0.3s ease;

        &:hover, &.router-link-exact-active {
        color: $text-hover-color;
        }
    }
}

</style>
