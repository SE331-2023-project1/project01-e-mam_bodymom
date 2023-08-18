<script setup lang="ts">
import {ref} from 'vue'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher';
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()
const teacherStore = useTeacherStore()

const students = storeToRefs(studentStore).students
const teachers = storeToRefs(teacherStore).teachers

const id = ref(students?.value?.id)


// console.log(students.value)
// console.log(students.value?.surname)
</script>

<template>
    <div v-if="students">
        <div class="text-lg text-center text-black font-sans hover:font-serif flex flex-col p-4">
            <!-- <RouterLink :to="{name: 'student-detail', params: { id }}">Details</RouterLink> -->
        </div>
        <RouterView :student="students" :teacher="teachers"></RouterView>

    </div>
</template>