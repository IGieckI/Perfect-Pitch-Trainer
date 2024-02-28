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
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Home</a>
                </li>
                <!--
                    <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                    </li>
                -->
                
            </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
$text-color: #39db6f;

.navbar {
    border-bottom: 1px solid rgba(0, 0, 0, 0.418);
    
    a {
        color: $text-color;
        font-weight: 500;
    }
}

</style>
