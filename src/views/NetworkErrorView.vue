<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="flex flex-col font-fig items-center justify-center text-black my-8">
        <h1 class="text-3xl font-bold">Uh-oh!</h1>
        <h3 class="text-center mt-1 text-xl">
            It looks like you're experiencing some network issues, please take a breath <br> and
            <a href="#" @click="router.go(-1)" class="text-red-600 font-semibold">click here</a>
            to try again.
        </h3>
        <p class="text-center mt-1 text-lg">Sorry, we can't get the data from the server.</p>
        <p class="text-center mt-1 text-lg">Please try again later.</p>
    </div>
</template>