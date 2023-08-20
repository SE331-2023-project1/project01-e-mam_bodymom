<script setup lang="ts">

defineProps({
    resource: {
        type: String,
        required: true,
        default: 'page'
    }
})

</script>

<template>
    <div class="flex flex-col items-center justify-center my-5">
        <img src="../assets/404-error.png" class="notfound">
        <h1 class="text-3xl  font-bold font-fig">Oop!</h1>
        <h3 class="text-2xl  text-center font-bold font-fig">The {{ resource }} you're looking for is not here</h3>
        <RouterLink :to="{name: 'home-page'}" class="mt-3">
            <button class="text-white mt-2 bg-blue-500 hover:bg-blue-700 font-fig py-1 px-4 shadow-md rounded-lg">
                Back to home page</button>
            </RouterLink>
    </div>
    
</template>
