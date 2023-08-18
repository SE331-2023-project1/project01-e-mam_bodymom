<script setup lang="ts">
import {ref} from 'vue'
import { useTeacherStore } from '@/stores/teacher'
import { storeToRefs } from 'pinia'

const store = useTeacherStore()
const teacher = storeToRefs(store).teacher
const id = ref(teacher?.value?.id)

</script>

<template>
    <div v-if="teacher">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <RouterLink :to="{name: 'teacher-detail', params: { id }}">Details</RouterLink>
        </div>
        <RouterView :teacher="teacher"></RouterView>
    </div>
</template>