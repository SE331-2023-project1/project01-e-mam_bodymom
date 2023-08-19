<script setup lang="ts">
import {ref} from 'vue'
import { useTeacherStore } from '@/stores/teacher'
import { storeToRefs } from 'pinia'
// import { useStudentStore } from '@/stores/student';

const store = useTeacherStore()
// const storeStudent = useStudentStore()
const teachers = storeToRefs(store).teachers
// const students = storeToRefs(storeStudent).students
const id = ref(teachers?.value?.id)

</script>

<template>
    <div v-if="teachers">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <!-- <RouterLink :to="{name: 'teacher-detail', params: { id }}">Details</RouterLink> -->
        </div>
        <RouterView :teacher="teachers" ></RouterView>
        
    </div>
</template>