<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="flex flex-col items-center justify-center text-black">
        <h1>Uh-oh!</h1>
        <h3>
            It looks like you're experiencing some network issues, please take a breath and
            <a href="#" @click="router.go(-1)">click here</a>
            to try again.
        </h3>
        <p>Sorry, we can't get the data from the server.</p>
        <p>Please try again later.</p>
    </div>
    
    
    <!-- <RouterLink :to="{name: 'event-list'}">Back to home page</RouterLink> -->
</template>