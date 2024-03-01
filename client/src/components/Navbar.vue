<script setup lang="ts">

</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Perfect Pitch Trainer</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item me-5">
                        <a class="nav-link" aria-current="page" href="#">Infinite</a>
                    </li>
                    <li class="nav-item me-5">
                        <a class="nav-link" aria-current="page" href="#">Set Of Notes</a>
                    </li>
                    <li class="nav-item me-5">
                        <a class="nav-link" aria-current="page" href="#">Sandbox</a>
                    </li>
                    <li class="nav-item me-5">
                        <a class="nav-link" aria-current="page" href="#">Stats</a>
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
