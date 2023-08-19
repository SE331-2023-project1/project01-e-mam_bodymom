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
    <div class="student-class flex flex-col items-center justify-center text-black">
        <h1>Oop!</h1>
        <h3>The {{ resource }} you're looking for is not here</h3>
        <RouterLink :to="{name: 'home-page'}">Back to home page</RouterLink>
    </div>
    
</template>